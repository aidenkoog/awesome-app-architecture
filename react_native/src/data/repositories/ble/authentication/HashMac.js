import { CRYPTO_HS_AAD, CRYPTO_HS_AL } from "../../../../utils/ble/BleEncryptionConstants"
import { arrayCopy } from "../../../../utils/common/CommonUtil"
import Constants from "../../../../utils/Constants"
import { logDebug } from "../../../../utils/logger/Logger"
import { convertIntToOneByte, toUtf8Bytes } from "../../../../utils/ble/BleUtil"

const CryptoJS = require("crypto-js")
const LOG_TAG = Constants.LOG.BT_HASH_MAC

const HashMac = () => {

    getHashMacInput = (encryptedBytes, ivBytes) => {

        let hMacInputBytes = []
        let listBytes = []

        let cryptoHsAadByte = convertIntToOneByte(CRYPTO_HS_AAD)
        logDebug(LOG_TAG, ">>> cryptoHsAadByte: " + cryptoHsAadByte)
        listBytes.push(cryptoHsAadByte)

        for (const item of ivBytes) {
            logDebug(LOG_TAG, ">>> ivItem: " + item)
            listBytes.push(item)
        }

        for (const item of encryptedBytes) {
            logDebug(LOG_TAG, ">>> encryptedItem: " + item)
            listBytes.push(item)
        }

        for (const item of CRYPTO_HS_AL) {
            logDebug(LOG_TAG, ">>> cryptoHsAlItem: " + item)
            listBytes.push(item)
        }

        for (const item of listBytes) {
            logDebug(LOG_TAG, ">>> listBytesItem: " + item)
            hMacInputBytes.push(item)
        }

        return hMacInputBytes
    }

    getHashMacBytes = (encryptedBytes, keyBytes, ivBytes) => {

        let inputBytes = this.getHashMacInput(encryptedBytes, ivBytes)

        let inputWordArray = CryptoJS.lib.WordArray.create(new Uint8Array(inputBytes))
        let keyWordArray = CryptoJS.lib.WordArray.create(new Uint8Array(keyBytes))
        logDebug(LOG_TAG, ">>> inputWordArray: " + inputWordArray + ", keyWordArray: " + keyWordArray)

        var digest = CryptoJS.HmacSHA256(inputWordArray, keyWordArray)
        logDebug(LOG_TAG, ">>> digest: " + digest)
        logDebug(LOG_TAG, ">>> digestBytes: " + toUtf8Bytes(digest))

        var digestBytes = toUtf8Bytes(digest.toString())
        let hashMacBytes = []
        arrayCopy(digestBytes, 0, hashMacBytes, 0, 16)

        return hashMacBytes
    }

    return {
        getHashMacBytes
    }

}

export default HashMac