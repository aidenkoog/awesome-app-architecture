import { useLayoutEffect, useState } from "react"
import Constants from "../../../utils/Constants"
import { logDebug, outputErrorLog } from "../../../utils/logger/Logger"
import { getIsDeviceRegistered } from "../../../utils/storage/StorageUtil"
import HomeComponent from "./HomeComponent"
import { bleConnectionCompleteStateAtom, bleConnectionStateAtom } from '../../../data'
import { useRecoilValue } from 'recoil'
import GetBatteryLevelUseCase from "../../../domain/usecases/bluetooth/basic/GetBatteryLevelUseCase"
import RequestDeviceInfoUseCase from "../../../domain/usecases/bluetooth/feature/device/SyncDeviceInfoUseCase"
import { formatRefreshTime } from "../../../utils/time/TimeUtil"
import GetProfileInfoUseCase from "../../../domain/usecases/common/GetProfileInfoUseCase"
import RequestAuthUseCase from "../../../domain/usecases/bluetooth/feature/authentication/RequestAuthUseCase"
import SendBleCustomDataUseCase from "../../../domain/usecases/bluetooth/basic/detail/SendBleCustomDataUseCase"
import { stringToBytes } from "convert-string"

const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * item's id information that exists in home card.
 */
const ITEM_ID_STEP = 2
const ITEM_ID_HEART_RATE = 3
const ITEM_ID_SLEEP = 4

/**
 * home main screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
function HomeContainer({ navigation }) {

    /**
     * useState code for ui interaction.
     */
    const [isDeviceRegistered, setIsDeviceRegistered] = useState(true)
    const [bleDeviceBatteryLevel, setBleDeviceBatteryLevel] = useState("--")
    const [refreshedTime, setRefreshedTime] = useState("--")
    const [userName, setUserName] = useState("-")
    const [userImageUrl, setUserImageUrl] = useState("-")
    const [userGender, setUserGender] = useState("-")
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [homeCardItems, addHomeCardItem] = useState([{ id: 999, name: "HOME CARD" }])

    /**
     * usecase function for getting to the battery level of ble device.
     */
    const { executeGetBatteryLevelUseCase } = GetBatteryLevelUseCase()

    /**
     * usecase function for getting the stored profile data.
     */
    const { executeGetProfileInfoUseCase } = GetProfileInfoUseCase()

    /**
     * usecase funtions for requesting device information.
     */
    const { executeSyncDeviceInfoUseCase } = RequestDeviceInfoUseCase()

    /**
     * usecase function for authenticating device, user after completing the ble connection.
     */
    const { executeRequestAuthUseCase } = RequestAuthUseCase()

    /**
     * usecase function for sending ble custom log to device.
     */
    const { executeSendBleCustomDataUseCase } = SendBleCustomDataUseCase()

    /**
     * state management variables to change UI according to Bluetooth operation state change
     */
    const bleConnectionState = useRecoilValue(bleConnectionStateAtom)
    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)

    /**
     * callback that is called when item in home card is pressed.
     */
    onPressCardItem = (item) => {
        switch (item.id) {
            case ITEM_ID_STEP:
                executeSyncDeviceInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e))
                break

            case ITEM_ID_HEART_RATE:
                executeSyncDeviceInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e))
                break

            case ITEM_ID_SLEEP:
                executeSyncDeviceInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e))
                break
        }
    }

    /**
     * callback that is called when user presses the refresh icon or text view.
     */
    onPressRefreshArea = () => {
        executeSyncDeviceInfoUseCase().then(() => {
            setRefreshedTime(formatRefreshTime())

            executeGetBatteryLevelUseCase().then((batteryLevel) => {
                setBleDeviceBatteryLevel(batteryLevel)
            })

        }).catch((e) => outputErrorLog(LOG_TAG, e))
    }

    /**
     * get user profile information and update them for rendering ui.
     */
    loadUserProfile = () => {
        executeGetProfileInfoUseCase(userProfileInfo => {
            const userProfile = JSON.parse(userProfileInfo)
            const userImageUrl = userProfile.imageUrl

            logDebug(LOG_TAG, "<<< userProfile imageUrl: " + userImageUrl)
            logDebug(LOG_TAG, "<<< userProfile name: " + userProfile.name)
            logDebug(LOG_TAG, "<<< userProfile gender: " + userProfile.gender)
            logDebug(LOG_TAG, "<<< userProfile birthday: " + userProfile.birthday)
            logDebug(LOG_TAG, "<<< userProfile height: " + userProfile.height)
            logDebug(LOG_TAG, "<<< userProfile weight: " + userProfile.weight)

            setUserName(userProfile.name)
            setUserImageUrl(userImageUrl == null || userImageUrl == "" ? "-" : userImageUrl)
            setUserGender(userProfile.gender)
        })
    }

    /**
     * get value that represents if device is already registered and update it for rendering ui.
     */
    loadDeviceRegistrationData = () => {
        getIsDeviceRegistered().then((registered) => {
            logDebug(LOG_TAG, "<<< device is registered ? " + registered)
            setIsDeviceRegistered(registered)

        }).catch((e) => { outputErrorLog(LOG_TAG, e) })
    }

    /**
     * get ble battery level, update it, and update refresh time information for rendering ui.
     */
    loadBleBatteryLevel = () => {
        return new Promise((fulfill, reject) => {
            executeGetBatteryLevelUseCase().then(batteryLevel => {
                setBleDeviceBatteryLevel(batteryLevel)
                setRefreshedTime(formatRefreshTime())
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by executeGetBatteryLevelUseCase !!!")
                reject(e)
            })
        })
    }

    /**
     * add new device.
     */
    onAddDevice = () => {
        // pushToNextScreen(navigation, NEXT_SCREEN_QR_SCAN, NAVIGATION_NO_DELAY_TIME, NAVIGATION_PURPOSE)

        executeRequestAuthUseCase().catch((e) => {
            outputErrorLog(LOG_TAG, "<<< " + e + ", failed to authenticate device, user")
        })
        // let logMessage = stringToBytes("\x00" + "\x09" + "\x00" + "DEBUGGING")
        // executeSendBleCustomDataUseCase(logMessage)
    }

    /**
     * handle the swipe refreshing event.
     */
    onSwipeRefresh = () => {
        setIsRefreshing(true)
        loadBleBatteryLevel().then(() => {
            setIsRefreshing(false)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by loadBleBatteryLevel !!!")
            setIsRefreshing(false)
        })
    }

    /**
     * executed logic before ui rendering and painting.
     */
    useLayoutEffect(() => {
        logDebug(LOG_TAG, "<<< bleConnectionState: " + bleConnectionState
            + ", bleConnectionCompleteState: " + bleConnectionCompleteState)

        loadDeviceRegistrationData()
        loadBleBatteryLevel()
        loadUserProfile()
        addHomeCardItem([{ id: 999, name: "HOME CARD" }])

    }, [])

    return (
        <HomeComponent
            userName={userName}
            userImageUrl={userImageUrl}
            userGender={userGender}
            isRefreshing={isRefreshing}
            onSwipeRefresh={onSwipeRefresh}
            homeCardItems={homeCardItems}
            onAddDevice={onAddDevice}
            isDeviceRegistered={isDeviceRegistered}
            bleConnectionCompleteState={bleConnectionCompleteState}
            bleDeviceBatteryLevel={bleDeviceBatteryLevel}
            refreshedTime={refreshedTime}
            onPressCardItem={onPressCardItem.bind(this)}
            onPressRefreshArea={onPressRefreshArea}
        />
    )
}

export default HomeContainer
