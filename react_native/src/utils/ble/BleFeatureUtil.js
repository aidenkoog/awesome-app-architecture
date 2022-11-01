import { convertDecimalToHexString } from "./BleUtil"
import { logDebug } from "../logger/Logger"
import Constants from "../Constants"

const LOG_TAG = Constants.LOG.BLE_FEATURE_UTIL_LOG_TAG
let sequenceId = 1

/**
 * get version information, which is one of the header contents.
 * default: 1
 * @returns {string}
 */
export const getVersionAsHexString = () => {
    const value = convertDecimalToHexString(1)
    logDebug(LOG_TAG, ">>> version hex: " + value)
    return value
}

/**
 * get sequenceId.
 * Ref. increase value whenever command is executed.
 * @returns {string}
 */
export const getSequenceId = () => {
    const value = convertDecimalToHexString(sequenceId++)
    logDebug(LOG_TAG, ">>> sequenceId hex: " + value)
    return value
}

/**
 * get status.
 * @returns {string}
 */
export const getStatus = () => {
    const value = convertDecimalToHexString(1)
    logDebug(LOG_TAG, ">>> status hex: " + value)
    return value
}

/**
 * get device name information, which is one of the header contents.
 * @param {string} deviceName
 * @returns {string}
 */
export const getDeviceNameAsHexString = (deviceName) => {
    let deviceNameAsHexString = ""

    for (const item of deviceName) {
        var itemAsInt = parseInt(item, 10) + 48
        deviceNameAsHexString += (convertDecimalToHexString(itemAsInt) + "")
    }
    logDebug(LOG_TAG, ">>> deviceName hex: " + deviceNameAsHexString)
    return deviceNameAsHexString
}

/**
 * get user id. (uuid)
 * @returns {string}
 */
export const getUserId = () => {

}
