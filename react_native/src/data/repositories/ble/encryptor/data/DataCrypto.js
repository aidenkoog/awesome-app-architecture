import { CUSTOM_IV, CUSTOM_SECRET_KEY } from "../../../../../utils/ble/BleEncryptionConstants"
import { arrayCopy } from "../../../../../utils/common/CommonUtil"
import Constants from "../../../../../utils/Constants"
import { logDebug } from "../../../../../utils/logger/Logger"
import { stringToBytes } from "convert-string"
import { convertBleCustomToHexData, wordArrayToByteArray } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.BT_CRYPTO

/**
 * load crypto module.
 */
const CryptoJS = require("crypto-js")

const DataCrypto = () => {

    /*------------------------------------------------------------------------------------------------------------------
     * 
     * Encryption.
     * 
     *-----------------------------------------------------------------------------------------------------------------*/

    /**
     * encrypt ble custom data and return it.
     * @param {Any} data
     * @returns {Any}
     */
    getEncryptedDataMessage = (data) => {

        // padding.
        const paddedData = getPaddedData(data)
        const paddedWordArray = CryptoJS.enc.Hex.parse(paddedData)

        logDebug(LOG_TAG, ">>> encryption, paddedWordArray: " + paddedWordArray)
        logDebug(LOG_TAG, ">>> encryption, json stringify: " + JSON.stringify(paddedData))

        // crypto encryptor.
        const cipheredData =
            CryptoJS.AES.encrypt(paddedWordArray, CUSTOM_SECRET_KEY, {
                iv: CUSTOM_IV,
                padding: CryptoJS.pad.NoPadding,
                mode: CryptoJS.mode.CBC
            })

        logDebug(LOG_TAG, "<<< encryption, result: " + cipheredData.toString())
        logDebug(LOG_TAG, "<<< encryption, result: " + wordArrayToByteArray(cipheredData))
        logDebug(LOG_TAG, "<<< encryption, result: " + convertBleCustomToHexData(wordArrayToByteArray(cipheredData)))
        logDebug(LOG_TAG, "<<< encryption, result: " + cipheredData.toString(16))

        // convert hex string to byte array.
        return stringToBytes("\x00" + "\xFF" + "\x04" + cipheredData.toString(16))
    }

    /**
     * convert original data to word array type's because of crypto js function's parameter type.
     * @param {Any} data
     * @returns {Any}
     */
    getWordArrayData = (data) => {
        const wordArrayData = CryptoJS.enc.Hex.parse(data)

        logDebug(LOG_TAG, ">>> encryption, custom data encoded by word array: " + wordArrayData)
        return wordArrayData
    }

    /**
     * apply padding algorithm to data and return it.
     * @param {Any} data
     * @returns {Any}
     */
    getPaddedData = (data) => {
        const dataLength = data.length
        const dataLengthDividedByTwo = dataLength / 2
        const padding = 16 - (dataLengthDividedByTwo % 16)
        const bufferLength = ((dataLengthDividedByTwo + 16) / 16) * 16

        logDebug(LOG_TAG, ">>> padding, "
            + "dataLength: " + dataLength
            + ", data length divided by 2: " + dataLengthDividedByTwo
            + ", padding: " + padding
            + ", bufferLength: " + bufferLength)

        let destination = new Array(bufferLength)
        let source = new Array(dataLengthDividedByTwo)

        for (let i = 0; i < source.length; i++) {
            const item = data.substr(i + i, 2)

            logDebug(LOG_TAG, ">>> depadding, item: " + item)
            source[i] = item
        }

        arrayCopy(source, 0, destination, 0, dataLengthDividedByTwo)

        for (let i = dataLengthDividedByTwo; i < destination.length; i++) {
            destination[i] = padding
        }

        let paddingResult = ""
        for (let i = 0; i < destination.length; i++) {
            paddingResult += destination[i]
        }

        logDebug(LOG_TAG, ">>> padding, result: " + paddingResult)
        logDebug(LOG_TAG, ">>> padding, destination buffer: " + destination)

        return paddingResult
    }

    /*------------------------------------------------------------------------------------------------------------------
     * 
     * Decryption.
     * 
     *-----------------------------------------------------------------------------------------------------------------*/

    /**
     * decrypt ble custom data and return it.
     * @param {Any} data
     * @returns {Any}
     */
    getDecryptedDataMessage = (data) => {

        // crypto decryptor.
        let decryptedData = CryptoJS.AES.decrypt(data, CUSTOM_SECRET_KEY, {
            iv: CUSTOM_IV,
            padding: CryptoJS.pad.NoPadding,
            mode: CryptoJS.mode.CBC
        })

        logDebug(LOG_TAG, "<<< decryption, decryption result: " + decryptedData.toString())

        const depaddedData = getDepaddedData(decryptedData)
        return depaddedData
    }

    /**
     * apply de-padding algorithm to data and return it.
     * @param {Any} data 
     * @returns {Any}
     */
    const getDepaddedData = (data) => {

        let dataAsString = data.toString()

        const dataLength = dataAsString.length
        const dataLengthDividedByTwo = dataLength / 2
        const padding = dataAsString.substr(dataLength - 2, 2)
        const paddingAsInt = parseInt(padding, 16)
        const bufferLength = dataLengthDividedByTwo - paddingAsInt

        logDebug(LOG_TAG, ">>> depadding, "
            + "data length: " + dataLength
            + ", data length divided by 2: " + dataLengthDividedByTwo
            + ", padding: " + padding
            + ", paddingAsInt: " + paddingAsInt
            + ", bufferLength: " + bufferLength)

        let destination = new Array(bufferLength)
        let source = new Array(dataLengthDividedByTwo)

        for (let i = 0; i < source.length; i++) {
            const item = dataAsString.substr(i + i, 2)

            logDebug(LOG_TAG, ">>> depadding, item: " + item)
            source[i] = item
        }

        arrayCopy(source, 0, destination, 0, dataLengthDividedByTwo - paddingAsInt)

        let depaddingResult = ""
        for (let i = 0; i < destination.length; i++) {
            depaddingResult += destination[i]
        }

        logDebug(LOG_TAG, ">>> depadding, result: " + depaddingResult)
        logDebug(LOG_TAG, ">>> depadding, destination buffer: " + destination)

        return depaddingResult
    }

    return {
        getEncryptedDataMessage,
        getDecryptedDataMessage
    }
}

export default DataCrypto