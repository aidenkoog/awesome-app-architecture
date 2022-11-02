import { logDebug } from "../logger/Logger"
import Constants from "../Constants"
import { CUSTOM_IV, CUSTOM_SECRET_KEY } from "./BleEncryptionConstants"
import { bytesToString } from "convert-string"
import { arrayCopy } from "../common/CommonUtil"

const LOG_TAG = Constants.LOG.BLE_ENCRYPTION_UTIL_LOG_TAG

var CryptoJS = require("crypto-js")

/**
 * encrypt data with secret key, iv, ECB and NoPadding mode.
 * @param {bytes} data
 * @returns {bytes}
 */
export const getEncryptedData = (data) => {
    logDebug(LOG_TAG, ">>> custom secret key: " + CUSTOM_SECRET_KEY)

    const cipheredData = CryptoJS.AES.encrypt(getPaddedData(data), CUSTOM_SECRET_KEY, {
        iv: CUSTOM_IV,
        padding: CryptoJS.pad.NoPadding,
        mode: CryptoJS.mode.CBC
    })

    logDebug(LOG_TAG, ">>> encryptedData (ciphertext): " + cipheredData.ciphertext.toString())
    return cipheredData
}

/**
 * decrypt data with secret key, iv, ECB and NoPadding mode.
 * @param {bytes} data 
 * @returns {bytes}
 */
export const getDecryptedData = (data) => {
    logDebug(LOG_TAG, ">>> custom secret key: " + CUSTOM_SECRET_KEY)

    var decryptedData = CryptoJS.AES.decrypt(data, CUSTOM_SECRET_KEY, {
        iv: CUSTOM_IV,
        padding: CryptoJS.pad.NoPadding,
        mode: CryptoJS.mode.CBC
    })
    logDebug(LOG_TAG, ">>> decrypted data: " + decryptedData.toString())

    const depaddedData = getDepaddedData(decryptedData)
    logDebug(LOG_TAG, ">>> depadded data : " + depaddedData)

    return depaddedData
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