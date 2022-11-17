import { stringToBytes } from "convert-string"
import { CRYPTO_HS_AAD, CRYPTO_HS_AL } from "../../../../utils/ble/BleEncryptionConstants"
import { arrayCopy } from "../../../../utils/common/CommonUtil"
import Constants from "../../../../utils/Constants"
import { logDebug, outputErrorLog } from "../../../../utils/logger/Logger"
import { convertDecimalToHexString, convertIntToOneByte } from "../../../../utils/ble/BleUtil"
import {
    utils,
    AES,
    HMAC,
    SHA,
    PBKDF2,
    RSA
} from "@egendata/react-native-simple-crypto"

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
            hMacInput.push(item)
        }

        return hMacInputBytes
    }

    getHashMacBytes = (encryptedBytes, keyBytes, ivBytes) => {

        let inputBytes = this.getHashMacInput(encryptedBytes, ivBytes)

        HMAC.hmac256(inputBytes, keyBytes).then((result) => {
            let digestBytes = result
            let hashMacBytes = []

            arrayCopy(digestBytes, 0, hashMacBytes, 0, 16
            )

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by hmac256")
        })



        let digestArray = new Array(digest.length / 2)

        for (let i = 0; i < digestArray.length; i++) {
            const item = digest.substr(i + i, 2)
            digestArray[i] = item
        }
        hashMac = new Uint8Array(16)
        arrayCopy(digestArray, 0, hashMac, 0, 16)

        return hashMac
    }

    return {
        getHashMac
    }

}

export default HashMac