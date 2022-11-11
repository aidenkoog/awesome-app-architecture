import { stringToBytes } from "convert-string"
import { CRYPTO_HS_AAD, CRYPTO_HS_AL } from "../../../../utils/ble/BleEncryptionConstants"
import { arrayCopy } from "../../../../utils/common/CommonUtil"
import Constants from "../../../../utils/Constants"
import { logDebug } from "../../../../utils/logger/Logger"
import { byteToHex, convertDecimalToHexString } from "../../../../utils/ble/BleUtil"

const CryptoJS = require("crypto-js")
const LOG_TAG = Constants.LOG.BT_HASH_MAC

const HashMac = () => {

    getHashMacInput = (encrypt, iv) => {
        let hMacInput = null
        let listByte = []

        logDebug(LOG_TAG, "--------------------------------------------------------------------------------------------")
        logDebug(LOG_TAG, "header")
        const headerBytes = stringToBytes(convertDecimalToHexString(CRYPTO_HS_AAD))
        logDebug(LOG_TAG, "header bytes: " + headerBytes)
        for (let item of headerBytes) {
            listByte.push(item)
        }


        logDebug(LOG_TAG, "--------------------------------------------------------------------------------------------")
        logDebug(LOG_TAG, "iv")
        let ivString = ""
        for (let i = 0; i < iv.length; i++) {
            ivString += iv[i]
        }
        for (let item of ivString) {
            listByte.push(item)
        }


        logDebug(LOG_TAG, "--------------------------------------------------------------------------------------------")
        logDebug(LOG_TAG, "encrypt")
        let encryptString = ""
        for (let i = 0; i < encrypt.length; i++) {
            encryptString += encrypt[i]
        }
        logDebug(LOG_TAG, ">>> encrypt string: " + encryptString)
        for (let item of encrypt) {
            listByte.push(item)
        }


        logDebug(LOG_TAG, "--------------------------------------------------------------------------------------------")
        logDebug(LOG_TAG, "CRYPTO_HS_AL")
        for (let item of CRYPTO_HS_AL) {
            listByte.push(item)
        }


        logDebug(LOG_TAG, "--------------------------------------------------------------------------------------------")
        logDebug(LOG_TAG, "hMacInput")
        let i = 0
        hMacInput = new Uint8Array(listByte.length)
        for (let item of listByte) {
            hMacInput[i++] = item
        }
        return hMacInput
    }

    getHashMac = (encrypt, key, iv) => {
        let hashMac = null
        let input = this.getHashMacInput(encrypt, iv)
        logDebug(LOG_TAG, "###1, input: " + input)

        // const inputAsHex = byteToHex(input)
        const inputAsHex = Buffer.from(input).toString('hex')
        logDebug(LOG_TAG, ">>> inputAsHex: " + inputAsHex)

        let digest = null
        var hash = CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(inputAsHex), CryptoJS.enc.Utf8.parse(key))
        logDebug(LOG_TAG, "hash result: " + hash)

        digest = CryptoJS.enc.Hex.stringify(hash)
        logDebug(LOG_TAG, ">>> digest: " + digest)

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