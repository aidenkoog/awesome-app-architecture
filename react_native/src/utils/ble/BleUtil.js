import { BATTERY_CHARACTERISTIC_UUID, FLOW_CONTROL_CHARACTERISTIC_UUID, TX_CHARACTERISTIC_UUID } from "./BleConfig"
import { stringToBytes } from "convert-string"

/**
 * convert byte array to binary string.
 * @param {bytes} value 
 * @returns 
 */
export const convertByteArrayToBinaryString = (value) => {
    let result = ""
    for (let i = 0; i < 8; i++) {
        result += ((0x80 >>> i) & value) == 0 ? '0' : '1'
    }
    return result
}

/**
 * convert string to byte array.
 * @param {string} value 
 * @returns 
 */
export const convertStringToByteArray = (value) => {
    return stringToBytes(value)
}

/**
 * convert string to byte array with length.
 * @param {string} value 
 * @param {number} count 
 * @returns 
 */
export const convertStringToByteArrayWithCount = (value, length) => {
    const result = new ArrayBuffer(length)
    for (let i = 0; i < value.length(); i++) {
        result[i] = stringToBytes(value.charAt(i))
    }
    return result
}

/**
 * convert byte array data to string's.
 * @param {bytes} value 
 * @returns 
 */
export const convertByteArrayToString = (value) => {
    return String.fromCharCode.apply(null, value)
}

/**
 * convert long number to byte array.
 * @param {number} value 
 * @returns 
 */
export const convertLongToByteArray = (value) => {
    let result = [(value >> 24), (value >> 16), (value >> 8), value]
    return result
}

/**
 * convert int number to byte array.
 * @param {number} value 
 * @returns 
 */
export const convertIntToByteArray = (value) => {
    let result = [value >> 8, value]
    return result
}

/**
 * convert byte array data to numeric's.
 * @param {bytes} value 
 * @returns {number}
 */
export const convertByteArrayToNumeric = (value) => {
    let result = 0
    for (let i = 0; i < value.length; i++) {
        result = (value << 8) | (value[i] & 0xFF)
    }
    return result
}

/**
 * get version information, which is one of the header contents.
 * default: 1
 * @returns {string}
 */
export const getVersionAsHexString = () => {
    return convertDecimalToHexString(1)
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
    return deviceNameAsHexString
}

/**
 * get device message id information, which is one of the header contents.
 * this method has some problems. under construction.
 */
export const getMessageIdAsHexString = () => {
    return "\x12" + "\x34" + "\x56" + "\x78"
}

/**
 * convert hex string to decimal.
 * @param {string} hex 
 * @returns {number}
 */
export const convertHexStringToDecimal = (hex) => {
    return parseInt(hex, 10)
}

/**
 * convert hex string to byte array.
 * @param {string} hex 
 * @returns {Uint8Array}
 */
export const convertHexStringToByteArray = (hex) => {
    return Uint8Array.from(hex.match(/.{1,2}/g).map((byte) => { parseInt(byte, 16) }))
}

/**
 * Returns the notification feature name according to the uuid passed as an argument.
 * @param {string} uuid 
 * @returns {string}
 */
export const getFeatureNameAsUuid = (uuid) => {
    switch (uuid) {
        case TX_CHARACTERISTIC_UUID:
            return "TX notification"
        case FLOW_CONTROL_CHARACTERISTIC_UUID:
            return "Flow Control notification"
        case BATTERY_CHARACTERISTIC_UUID:
            return "Battery notification"
        default:
            return "Unknown notification"
    }
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