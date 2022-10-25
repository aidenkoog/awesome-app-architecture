import Constants from "./Constants"
import { logDebug } from "./Logger"

const LOG_TAG = Constants.LOG.BLE_UTIL_LOG_TAG

/**
 * convert bytes typed custom data to different type's.
 * @param {bytes} customData 
 * @returns {Any}
 */
export const getBleCustomData = (customData) => {
    logDebug(LOG_TAG, "customData: " + customData)
    // combine header, payload
    // encoding them
    // return
    return customData
}

/**
 * convert characteristic data to hex's.
 * @param {Any} customData 
 * @returns {string}
 */
export const convertBleCustomToHexData = (customData) => {
    let hexStringData = "";
    for (const item of customData) {
        hexStringData += convertDecimalToHexString(item) + " ";
    }

    // print hex string with no space character.
    // currently, it's not used.
    let replacedHexStringData = replaceAll(hexStringData, " ", "");

    return hexStringData;
}

/**
 * convert decimal data to hex's.
 * @param {number} decimalData 
 * @returns 
 */
export const convertDecimalToHexString = (decimalData) => {
    if (decimalData < 0) {
        decimalData = 0xffffffff + decimalData + 1;
    }
    return decimalData.toString(16).toUpperCase();
}

/**
 * replace all strings.
 * @param {string} rawString 
 * @param {string} search 
 * @param {string} replace 
 * @returns 
 */
export const replaceAll = (rawString, search, replace) => {
    return rawString.split(search).join(replace);
}