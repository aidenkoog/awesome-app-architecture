import Constants from "../../../utils/Constants"
import { logDebug, outputErrorLog } from "../../../utils/logger/Logger"
import { Linking, Platform } from "react-native"
import DeviceInfo from "react-native-device-info"

const LOG_TAG = Constants.LOG.PLATFORM_REPO_LOG

/**
 * the dividers used by Android and iOS are different.
 */
const SMS_DIVIDER = Platform.OS === 'android' ? '?' : '&'

/**
 * implemented apis related to platform.
 * @returns {Any}
 */
const PlatformRepository = () => {

    /**
     * send direct sms without user's interaction.
     * @param {string} receiverPhoneNumber
     * @param {string} message
     */
    sendDirectSms = (receiverPhoneNumber, message = "") => {
        logDebug(LOG_TAG, ">>> receiver's phone number: " + receiverPhoneNumber + ", message: " + message)
    }

    /**
     * send sms with user interaction.
     * @param {string} receiverPhoneNumber
     * @param {string} message
     */
    sendSms = (receiverPhoneNumber, message = "") => {
        logDebug(LOG_TAG, ">>> receiver's phone number: " + receiverPhoneNumber + ", message: " + message)
        Linking.openURL('sms:' + receiverPhoneNumber + SMS_DIVIDER + 'body=' + message).then(() => {
            logDebug("<<< succeeded to send sms")

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occured by open url of sendSms")
        })
    }

    /**
     * send direct call without user's interaction.
     * @param {string} receiverPhoneNumber
     */
    sendDirectCall = (receiverPhoneNumber) => {
        logDebug(LOG_TAG, ">>> receiver's phone number: " + receiverPhoneNumber)
    }

    /**
     * send call with user interaction.
     * @param {string} receiverPhoneNumber
     */
    sendCall = (receiverPhoneNumber) => {
        logDebug(LOG_TAG, ">>> receiver's phone number: " + receiverPhoneNumber)
        Linking.openURL('tel:' + receiverPhoneNumber).then(() => {
            logDebug(LOG_TAG, "<<< succeeded to send call")

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occured by open url of scanCall")
        })
    }

    /**
     * get my phone number.
     * @returns {string}
     */
    getMyPhoneNumber = () => {
        return new Promise((fulfill, reject) => {
            DeviceInfo.getPhoneNumber().then((phoneNumber) => {
                fulfill(phoneNumber)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * get the application instance ID.
     * @returns {Promise}
     */
    getInstanceId = () => {
        return new Promise((fulfill, reject) => {
            DeviceInfo.getInstanceId().then((instanceId) => {
                fulfill(instanceId)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * get the ANDROID_ID.
     * @returns {Promise}
     */
    getAndroidId = () => {
        return new Promise((fulfill, reject) => {
            DeviceInfo.getAndroidId().then((androidId) => {
                fulfill(androidId)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * get the device unique ID. 
     * On Android it is currently identical to getAndroidId() in this module. 
     * On iOS it uses the DeviceUID uid identifier. 
     * @returns {Promise}
     */
    getUniqueId = () => {
        return new Promise((fulfill, reject) => {
            DeviceInfo.getUniqueId().then((uniqueId) => {
                fulfill(uniqueId)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        sendDirectCall,
        sendCall,
        sendDirectSms,
        sendSms,
        getMyPhoneNumber,
        getInstanceId,
        getAndroidId,
        getUniqueId
    }
}

/**
 * export platform repository object.
 */
export default PlatformRepository