import { logDebug } from "../logger/Logger"
import Constants from "../Constants"
import { CUSTOM_IV, CUSTOM_SECRET_KEY } from "./BleEncryptionConstants"
import { bytesToString } from "convert-string"
import { arrayCopy } from "../common/CommonUtil"
import { byteArrayToString, bytesToHex, hexStringToArrayBuffer, wordArrayToByteArray } from "./BleUtil"

const LOG_TAG = Constants.LOG.BLE_ENCRYPTION_UTIL_LOG_TAG

/**
 * dummy data and secret key.
 */
const DUMMY_TEST_DATA = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]
const DUMMY_TEST_KEY = [0x01, 0x23, 0x45, 0x67, 0x89, 0x01, 0x22, 0x23, 0x34, 0x45, 0x56, 0x67, 0x78, 0x89, 0x90, 0x02]

/**
 * conversion to WordArrays.
 */
const TEST_DATA = CryptoJS.enc.Hex.parse(bytesToHex(DUMMY_TEST_DATA))
const TEST_KEY = CryptoJS.enc.Hex.parse(bytesToHex(DUMMY_TEST_KEY))

/**
 * load crypto module.
 */
const CryptoJS = require("crypto-js")

/**
 * encrypt data with secret key, iv, ECB and NoPadding mode.
 * @param {bytes} data
 * @returns {bytes}
 */
export const getEncryptedData = () => {
    logDebug(LOG_TAG, ">>> custom secret key: " + TEST_KEY)
    logDebug(LOG_TAG, ">>> custom data: " + TEST_DATA)

    const cipheredData = CryptoJS.AES.encrypt(TEST_DATA, TEST_KEY, {
        iv: CUSTOM_IV,
        padding: CryptoJS.pad.NoPadding,
        mode: CryptoJS.mode.CBC
    })

    logDebug(LOG_TAG, "<<< encryptedData: " + cipheredData.toString())
    logDebug(LOG_TAG, "<<< encryptedData (ciphertext): " + cipheredData.ciphertext.toString())
    return cipheredData
}

/**
 * decrypt data with secret key, iv, ECB and NoPadding mode.
 * @param {bytes} data 
 * @returns {bytes}
 */
export const getDecryptedData = (data) => {
    logDebug(LOG_TAG, ">>> custom secret key: " + TEST_KEY)

    var decryptedData = CryptoJS.AES.decrypt(data, TEST_KEY, {
        iv: CUSTOM_IV,
        padding: CryptoJS.pad.NoPadding,
        mode: CryptoJS.mode.CBC
    })
    logDebug(LOG_TAG, "<<< decrypted data: " + decryptedData.toString())
    return decryptedData
}

/**
 * apply encryption padding and return padded data.
 * @param {bytes} data 
 * @returns {bytes}
 */
const getPaddedData = (data) => {
    const dataLength = data.length
    const padding = 16 - (dataLength % 16)

    const bufferLength = ((dataLength + 16) / 16) * 16

    const buffer = new ArrayBuffer(bufferLength)
    const bufferView = new Uint8Array(buffer)

    bufferView = arrayCopy(data, 0, bufferView, 0, dataLength)
    for (let i = dataLength; i < bufferView.length; i++) {
        bufferView[i] = padding
    }

    logDebug(LOG_TAG, ">>> paddedData: " + bytesToString(bufferView))
    return bufferView
}

/**
 * apply encryption depadding and return depadded data.
 * @param {bytes} data 
 * @returns {bytes}
 */
const getDepaddedData = (data) => {
    const dataLength = data.length
    const padding = data[dataLength - 1]

    const bufferLength = dataLength - padding

    const buffer = new ArrayBuffer(bufferLength)
    const bufferView = new Uint8Array(buffer)

    bufferView = arrayCopy(data, 0, bufferView, 0, dataLength - padding)

    logDebug(LOG_TAG, ">>> depaddedData: " + bytesToString(bufferView))
    return bufferView
}