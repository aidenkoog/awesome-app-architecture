import Constants from "../../../utils/Constants"
import { logDebug, outputErrorLog } from "../../../utils/Logger"
import { Linking, Platform } from "react-native"

/**
 * declare log tag.
 */
const LOG_TAG = Constants.LOG.PLATFORM_REPO_LOG

/**
 * sms dividor.
 * the dividers used by Android and iOS are different.
 */
const SMS_DIVIDER = Platform.OS === 'android' ? '?' : '&'

/**
 * implemented apis related to platform.
 */
const PlatformRepository = () => {

    /**
     * send direct sms without user's interaction.
     * @param {string} receiverPhoneNumber
     * @param {string} message
     */
    sendDirectSms = (receiverPhoneNumber, message = "") => {
        logDebug(LOG_TAG, "receiver's phone number: " + receiverPhoneNumber + ", message: " + message)
    }

    /**
     * send sms.
     * @param {string} receiverPhoneNumber
     * @param {string} message
     */
    sendSms = (receiverPhoneNumber, message = "") => {
        logDebug(LOG_TAG, "receiver's phone number: " + receiverPhoneNumber + ", message: " + message)
        Linking.openURL('sms:' + receiverPhoneNumber + SMS_DIVIDER + 'body=' + message).then(() => {

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occured by open url of sendSms")
        })
    }

    /**
     * send direct call without user's interaction.
     * @param {string} receiverPhoneNumber
     */
    sendDirectCall = (receiverPhoneNumber) => {
        logDebug(LOG_TAG, "receiver's phone number: " + receiverPhoneNumber)
    }

    /**
     * send call.
     * @param {string} receiverPhoneNumber
     */
    sendCall = (receiverPhoneNumber) => {
        logDebug(LOG_TAG, "receiver's phone number: " + receiverPhoneNumber)
        Linking.openURL('tel:' + receiverPhoneNumber).then(() => {

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occured by open url of scanCall")
        })
    }

    getMyPhoneNumber = () => {
        const myPhoneNumber = ""
        logDebug(LOG_TAG, "my phone number: " + myPhoneNumber)
        return ""
    }

    return {
        sendDirectCall,
        sendCall,
        sendDirectSms,
        sendSms,
        getMyPhoneNumber
    }
}

/**
 * export platform repository object.
 */
export default PlatformRepository