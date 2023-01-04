import { BATTERY_CHARACTERISTIC_UUID, FLOW_CONTROL_CHARACTERISTIC_UUID, TX_CHARACTERISTIC_UUID } from "./BleConfig"
import { stringToBytes } from "convert-string"

const CryptoJS = require("crypto-js")

/**
 * Under construction.
 */

export const stringToUtf8ByteArray = (str) => {
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        } else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        } else if (
            ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
            ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        } else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};

export function toUtf8Bytes(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
        else {
            i++;
            charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >> 18),
                0x80 | ((charcode >> 12) & 0x3f),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}
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

export function toHex(value) {
    let hex = value.toString(16);
    if ((hex.length % 2) > 0) {
        hex = "0" + hex;
    }
    return hex;
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

export const byteToHex = (byte) => {
    const key = '0123456789abcdef'
    let bytes = new Uint8Array(byte)
    let newHex = ''
    let currentChar = 0
    for (let i = 0; i < bytes.length; i++) { // Go over each 8-bit byte
        currentChar = (bytes[i] >> 4)      // First 4-bits for first hex char
        newHex += key[currentChar]         // Add first hex char to string
        currentChar = (bytes[i] & 15)      // Erase first 4-bits, get last 4-bits for second hex char
        newHex += key[currentChar]         // Add second hex char to string
    }
    return newHex
}

export function byteArrayToHexString(byteArray) {
    var hexString = '';
    var nextHexByte;
    for (var i = 0; i < byteArray.byteLength; i++) {
        nextHexByte = byteArray[i].toString(16);    // Integer to base 16
        if (nextHexByte.length < 2) {
            nextHexByte = "0" + nextHexByte;        // Otherwise 10 becomes just a instead of 0a
        }//  w w w.java  2 s  . c  om
        hexString += nextHexByte;
    }
    return hexString;
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
export const convertIntToBytes = (value) => {
    let result = [value >> 8, value]
    let array = new Int8Array(2)
    array[0] = result[0]
    array[1] = result[1]
    return array
}

export const convertIntToOneByte = (value) => {
    let array = new Int8Array(1)
    array[0] = value
    return array
}

export function hexToBytes2(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

export function bytesToHex2(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
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


export const hexToByte = (hex) => {
    const key = '0123456789abcdef'
    let newBytes = []
    let currentChar = 0
    let currentByte = 0
    for (let i = 0; i < hex.length; i++) {   // Go over two 4-bit hex chars to convert into one 8-bit byte
        currentChar = key.indexOf(hex[i])
        if (i % 2 === 0) { // First hex char
            currentByte = (currentChar << 4) // Get 4-bits from first hex char
        }
        if (i % 2 === 1) { // Second hex char
            currentByte += (currentChar)     // Concat 4-bits from second hex char
            newBytes.push(currentByte)       // Add byte
        }
    }
    return new Uint8Array(newBytes)
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

export function numberToBytes(number) {
    // you can use constant number of bytes by using 8 or 4
    const len = Math.ceil(Math.log2(number) / 8);
    const byteArray = new Uint8Array(len);

    for (let index = 0; index < byteArray.length; index++) {
        const byte = number & 0xff;
        byteArray[index] = byte;
        number = (number - byte) / 256;
    }

    return byteArray;
}