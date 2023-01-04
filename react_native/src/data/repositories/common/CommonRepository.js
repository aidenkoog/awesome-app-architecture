import { useRef } from "react"
import { AppState } from "react-native"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../utils/logger/Logger"
import Constants from "../../../utils/Constants"
import { getUserProfileData, storeUserProfileData } from "../../../utils/storage/StorageUtil"

const LOG_TAG = Constants.LOG.COMMON_REPO_LOG
const APP_EVENT_TYPE = Constants.ROOT.APP_EVENT_TYPE
const SAVE_PROFILE_SUCCESS = Constants.COMMON.SAVE_PROFILE_SUCCESS
const SAVE_PROFILE_FAILURE = Constants.COMMON.SAVE_PROFILE_FAILURE

/**
 * user profile information.
 */
let userProfilePromise = ""

/**
 * implement functions used within the app.
 * @returns {Any}
 */
const CommonRepository = () => {

    /**
     * appState (useRef) is not changed even though rendering is executed again.
     */
    const appState = useRef(AppState.currentState)

    /**
     * detect current app state change.
     * @param {string} nextAppState 
     */
    onHandleAppStateChange = (nextAppState) => {
        logDebug(LOG_TAG, "<<< appState nextAppState current: " + appState.current + ", next: " + nextAppState)
        if (appState.current.match(/inactive|background/) && nextAppState === Constants.ROOT.APP_ACTIVE) {
            logDebugWithLine(LOG_TAG, '>>> app has come to the FOREGROUND')
        }
        if (appState.current.match(/inactive|active/) && nextAppState === Constants.ROOT.APP_BACKGROUND) {
            logDebugWithLine(LOG_TAG, '>>> app has come to the BACKGROUND')
        }
        appState.current = nextAppState
    }

    /**
     * add an event handler that can detect whether the app is in the background or foreground.
     */
    addAppStateHandler = () => {
        AppState.addEventListener(APP_EVENT_TYPE, this.onHandleAppStateChange)
    }

    /**
     * remove an event handler that can detect whether the app is in the background or foreground.
     */
    removeAppStateHandler = () => {
        AppState.removeEventListener(APP_EVENT_TYPE, this.onHandleAppStateChange)
    }

    /**
     * get user profile.
     * @param {callback} onResult
     */
    getUserProfile = (onResult) => {
        executeGetUserProfilePromise(userProfileInfo => onResult(userProfileInfo))
    }

    /**
     * execute get user profile promise.
     * @param {callback} onResult
     */
    const executeGetUserProfilePromise = async (onResult) => {
        await getUserProfilePromise().then(() => {
            logDebug(LOG_TAG, "<<< succeeded to get user profile")
            userProfilePromise.then((userProfile) => {
                onResult(userProfile)

            }).catch((e) => outputErrorLog(LOG_TAG, e + " occurred by userProfilePromise !!!"))

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by getUserProfilePromise !!!")
            onResult(null)
        })
    }

    /**
     * this is used when you want to perform batch parallel processing of all multiple asynchronous processing.
     * get all user profiles.
     * @returns {Promise}
     */
    const getUserProfilePromise = () => {
        return Promise.all([
            userProfilePromise = getUserProfileData()
        ])
    }

    /**
     * save user profile.
     * @param {UserProfile} userProfileInfo
     * @param {callback} onResult
     */
    saveUserProfile = (userProfileInfo, onResult) => {
        executeSaveUserProfilePromise(userProfileInfo, (succeeded) => {
            onResult(succeeded)
        })
    }

    /**
     * this is used when you want to perform batch parallel processing of all multiple asynchronous processing.
     * save all user profiles.
     * @param {UserProfile} userProfileInfo 
     * @returns {Promise}
     */
    const saveUserProfilePromise = (userProfileInfo) => {
        // this code will be updated again soon. 
        // cause I am inexperienced in using java script objects, 
        // so there is a possibility that unnecessary codes may have arisen.
        let reArtifactedData = {
            ...{ imageUrl: userProfileInfo.imageUrl },
            ...{ name: userProfileInfo.name },
            ...{ gender: userProfileInfo.gender },
            ...{ birthday: userProfileInfo.birthday },
            ...{ birthdayTimestamp: userProfileInfo.birthdayTimestamp },
            ...{ height: userProfileInfo.height },
            ...{ weight: userProfileInfo.weight }
        }

        // this is for batch parallel processing.
        return Promise.all([
            storeUserProfileData(reArtifactedData)
        ])
    }

    /**
     * execute save user profile promise.
     * @param {UserProfile} userProfileInfo
     * @param {callback} onResult
     */
    const executeSaveUserProfilePromise = async (userProfileInfo, onResult) => {
        await saveUserProfilePromise(userProfileInfo).then(() => {
            logDebug(LOG_TAG, "<<< succeeded to save user profile (" + userProfileInfo + ")")
            onResult(SAVE_PROFILE_SUCCESS)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by saveUserProfilePromise !!!")
            onResult(SAVE_PROFILE_FAILURE)
        })
    }

    return {
        addAppStateHandler,
        removeAppStateHandler,
        saveUserProfile,
        getUserProfile
    }
}

export default CommonRepository