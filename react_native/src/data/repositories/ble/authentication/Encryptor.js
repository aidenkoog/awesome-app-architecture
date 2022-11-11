import { CUSTOM_IV, CUSTOM_SECRET_KEY } from "../../../../../utils/ble/BleEncryptionConstants"
import { arrayCopy } from "../../../../../utils/common/CommonUtil"
import Constants from "../../../../../utils/Constants"
import { logDebug } from "../../../../../utils/logger/Logger"
import { stringToBytes } from "convert-string"

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
    getEncryptedDataMessage = (data, key = CUSTOM_SECRET_KEY, iv = CUSTOM_IV) => {

        const dummy = "033130303030303030303030303033331f1cf0cc0000000000000000000001010000000000000000000000000000636c50ea302e302e322e3337002e0100010502000200010300016405001e33372e3430393135362c3132372e3039343733392c31332e393033303030"
        const hexParsedData = CryptoJS.enc.Hex.parse(dummy)

        logDebug(LOG_TAG, ">>> original data: " + data)
        logDebug(LOG_TAG, ">>> hex encoded data: " + hexParsedData)
        logDebug(LOG_TAG, ">>> key: " + key)
        logDebug(LOG_TAG, ">>> iv: " + iv)

        // padding.
        const paddedData = CryptoJS.enc.Hex.parse(getPaddedData(dummy))
        logDebug(LOG_TAG, ">>> padded data: " + paddedData)

        // crypto encryptor.
        const cipheredData =
            CryptoJS.AES.encrypt(paddedData, key, {
                iv: iv,
                padding: CryptoJS.pad.NoPadding,
                mode: CryptoJS.mode.CBC
            })

        // example cipher data: 68dfc1cf80 febbb14417 c2947490b3 e4178a4dce 08cd2a7a8e dfb60e0133 93d1
        // accurate cipher data's prefix: 5100...
        logDebug(LOG_TAG, "<<< encryption, result: " + cipheredData)
        logDebug(LOG_TAG, "<<< encryption, result cipher: " + cipheredData.ciphertext)
        logDebug(LOG_TAG, "<<< encryption, result ciphertext: " + cipheredData.ciphertext.toString())
        logDebug(LOG_TAG, "<<< encryption, result's length: " + cipheredData.ciphertext.toString().length)

        // convert hex string to byte array.
        // let cipheredBytes = stringToBytes("\x00" + "\x64" + "\x04" + cipheredData)
        // return cipheredBytes

        let cipheredArrayData = new Array(cipheredData.ciphertext.toString().length / 2)

        for (let i = 0; i < cipheredArrayData.length; i++) {
            const item = cipheredData.ciphertext.toString().substr(i + i, 2)
            cipheredArrayData[i] = item
        }
        logDebug(LOG_TAG, "<<< encryption, ciphered array data: " + cipheredArrayData)

        return cipheredArrayData
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
        const paddingAsInt = parseInt(padding, 16)
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
            source[i] = item
        }

        arrayCopy(source, 0, destination, 0, dataLengthDividedByTwo)

        for (let i = dataLengthDividedByTwo; i < destination.length; i++) {
            if (paddingAsInt < 10) {
                destination[i] = "0" + padding
            } else {
                destination[i] = padding
            }
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