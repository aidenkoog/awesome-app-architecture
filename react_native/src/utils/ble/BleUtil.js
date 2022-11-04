import { BATTERY_CHARACTERISTIC_UUID, FLOW_CONTROL_CHARACTERISTIC_UUID, TX_CHARACTERISTIC_UUID } from "./BleConfig"
import { stringToBytes } from "convert-string"

const CryptoJS = require("crypto-js")

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
 * convert byte array to hex string.
 * @param {bytes} byteArray 
 * @returns {string}
 */
export const toHexString = (byteArray) => {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
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
 * HEX string to Byte Array.
 *----------------------------------------------------------------------------------*/
/**
 * convert hex string to array buffer.
 * @param {string} hexString 
 * @returns {ArrayBuffer}
 */
export const hexStringToArrayBuffer = (hexString) => {
    // remove the leading 0x
    hexString = hexString.replace(/^0x/, '')

    // ensure even number of characters
    if (hexString.length % 2 != 0) {
        console.log('WARNING: expecting an even number of characters in the hexString')
    }

    // check for some non-hex characters
    var bad = hexString.match(/[G-Z\s]/i)
    if (bad) {
        console.log('WARNING: found non-hex characters', bad)
    }

    // split the string into pairs of octets
    var pairs = hexString.match(/[\dA-F]{2}/gi)

    // convert the octets to integers
    var integers = pairs.map(function (s) {
        return parseInt(s, 16)
    })

    var array = new Uint8Array(integers)
    console.log(array)

    return array.buffer
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
    return hexStringData
}

/*----------------------------------------------------------------------------------
 * Byte Array to Word Array.
 *----------------------------------------------------------------------------------*/
/**
 * convert byte to word array.
 * @param {bytes} data 
 * @returns {Any}
 */
export const byteArrayToWordArray = (data) => {
    var result = [], i
    for (i = 0; i < data.length; i++) {
        result[(i / 4) | 0] |= data[i] << (24 - 8 * i)
    }
    return CryptoJS.lib.WordArray.create(result, data.length)
}

/*----------------------------------------------------------------------------------
 * Byte Array to string.
 *----------------------------------------------------------------------------------*/
/**
 * convert byte array to string.
 * @param {bytes} byteArray 
 * @returns {string}
 */
export function byteArrayToString(byteArray) {
    var str = "", i;
    for (i = 0; i < byteArray.length; ++i) {
        str += escape(String.fromCharCode(byteArray[i]));
    }
    return str;
}

/*----------------------------------------------------------------------------------
 * Word to Byte Array.
 *----------------------------------------------------------------------------------*/
/**
 * convert word to byte array.
 * @param {string} word 
 * @param {number} length 
 * @returns {bytes}
 */
export const convertWordToByteArray = (word, length) => {
    var result = [], i,
        xFF = 0xFF
    if (length > 0)
        result.push(word >>> 24)
    if (length > 1)
        result.push((word >>> 16) & xFF)
    if (length > 2)
        result.push((word >>> 8) & xFF)
    if (length > 3)
        result.push(word & xFF)
    return result
}

/*----------------------------------------------------------------------------------
 * Word Array to Byte Array.
 *----------------------------------------------------------------------------------*/
/**
 * convert word array to byte's.
 * @param {Any} wordArray 
 * @param {number} length 
 * @returns {bytes}
 */
export const wordArrayToByteArray = (wordArray, length) => {
    if (wordArray.hasOwnProperty("sigBytes") && wordArray.hasOwnProperty("words")) {
        length = wordArray.sigBytes
        wordArray = wordArray.words
    }
    var result = [],
        bytes,
        i = 0
    while (length > 0) {
        bytes = wordToByteArray(wordArray[i], Math.min(4, length))
        length -= bytes.length
        result.push(bytes)
        i++
    }
    return [].concat.apply([], result)
}

/**
 * convert word array to byte's.
 * @param {Any} wordArray 
 * @returns {bytes}
 */
export function wordToByteArray(wordArray) {
    var byteArray = [], word, i, j;
    for (i = 0; i < wordArray.length; ++i) {
        word = wordArray[i];
        for (j = 3; j >= 0; --j) {
            byteArray.push((word >> 8 * j) & 0xFF);
        }
    }
    return byteArray;
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