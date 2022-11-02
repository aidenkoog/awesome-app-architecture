import { BATTERY_CHARACTERISTIC_UUID, FLOW_CONTROL_CHARACTERISTIC_UUID, TX_CHARACTERISTIC_UUID } from "./BleConfig"
import { stringToBytes } from "convert-string"
import { replaceAll } from "../common/CommonUtil"

/*----------------------------------------------------------------------------------
 * Byte Array to Binary String.
 *----------------------------------------------------------------------------------*/
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

/*----------------------------------------------------------------------------------
 * String to Byte Array.
 *----------------------------------------------------------------------------------*/
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

/*----------------------------------------------------------------------------------
 * Byte Array to String.
 *----------------------------------------------------------------------------------*/
/**
 * convert byte array to string.
 * @param {bytes} value 
 * @returns 
 */
export const convertByteArrayToString = (value) => {
    return String.fromCharCode.apply(null, value)
}

/**----------------------------------------------------------------------------------
 * Decimal to Byte Array.
 *----------------------------------------------------------------------------------*/
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
 * convert byte array to hex string.
 * @param {bytes} bytes 
 * @returns {string}
 */
export const bytesToHex = (bytes) => {
    let hex = []
    for (let i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i]
        hex.push((current >>> 4).toString(16))
        hex.push((current & 0xF).toString(16))
    }
    return hex.join("")
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

/**----------------------------------------------------------------------------------
 * HEX to Decimal.
 *----------------------------------------------------------------------------------*/
/**
 * convert hex string to decimal.
 * @param {string} hex 
 * @returns {number}
 */
export const convertHexStringToDecimal = (hex) => {
    return parseInt(hex, 10)
}


/*----------------------------------------------------------------------------------
 * HEX to Byte Array.
 *----------------------------------------------------------------------------------*/
/**
 * convert hex string to byte array.
 * @param {string} hex 
 * @returns {Uint8Array}
 */
export const convertHexStringToByteArray = (hex) => {
    return Uint8Array.from(hex.match(/.{1,2}/g).map((byte) => { parseInt(byte, 16) }))
}

/**
 * convert hex string to byte array.
 * @param {string} hex 
 * @returns {bytes}
 */
export const hexToBytes = (hex) => {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

/*----------------------------------------------------------------------------------
 * Decimal to HEX.
 *----------------------------------------------------------------------------------*/
/**
 * convert characteristic data to hex's.
 * @param {Any} customData 
 * @returns {string}
 */
export const convertBleCustomToHexData = (customData) => {
    let hexStringData = ""
    for (const item of customData) {
        hexStringData += convertDecimalToHexString(item) + " "
    }

    // print hex string with no space character.
    // currently, it's not used.
    let replacedHexStringData = replaceAll(hexStringData, " ", "")

    return hexStringData
}

/*----------------------------------------------------------------------------------
 * Common Utility.
 *----------------------------------------------------------------------------------*/
/**
 * convert decimal data to hex's.
 * @param {number} decimalData 
 * @returns 
 */
export const convertDecimalToHexString = (decimalData) => {
    if (decimalData < 0) {
        decimalData = 0xffffffff + decimalData + 1
    }
    return decimalData.toString(16).toUpperCase()
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