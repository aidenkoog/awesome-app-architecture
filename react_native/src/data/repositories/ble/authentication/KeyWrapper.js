import { IV_HEXS, IV_HEX_ARRAY } from "../../../../../utils/ble/BleEncryptionConstants"
import { arrayCopy } from "../../../../../utils/common/CommonUtil"
import { CUSTOM_SECRET_KEY } from "../../../../../utils/ble/BleEncryptionConstants"
import { logDebug } from "../../../../../utils/logger/Logger"
import Constants from "../../../../../utils/Constants"
import { bytesToString } from "convert-string"

const LOG_TAG = Constants.LOG.BT_KEY_CRYPTO

/**
 * load crypto module.
 */
const CryptoJS = require("crypto-js")

const KeyCrypto = () => {

    padding = () => {
        return data
    }

    depadding = () => {
        return data
    }

    getEncryptedKeyMessage = (data) => {
        return data
    }

    getDecryptedKeyMessage = (data) => {
        return data
    }

    cloneArray = () => {

    }

    doWrappingKey = (random32HexArray) => {
        logDebug(LOG_TAG, "#0, random32HexArray: " + random32HexArray + ", length: " + random32HexArray.length)
        let dialogueKey = new Array(40)
        let inData = new Array(16)
        let outDataArray = new Array(16)

        arrayCopy(random32HexArray, 0, dialogueKey, 0, 32)
        arrayCopy(IV_HEX_ARRAY, 0, outDataArray, 0, 8)

        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < (random32HexArray.length / 8); i++) {
                arrayCopy(outDataArray, 0, inData, 0, 8)
                arrayCopy(dialogueKey, i * 8, inData, 8, 8)

                logDebug(LOG_TAG, "inData: " + inData)
                let ciphertext = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(inData.toString()), CUSTOM_SECRET_KEY, {
                    padding: CryptoJS.pad.NoPadding,
                    mode: CryptoJS.mode.ECB
                }).ciphertext.toString()
                logDebug(LOG_TAG, "ciphertext: " + ciphertext)

                for (let k = 0; k < outDataArray.length; k++) {
                    const item = ciphertext.substr(k + k, 2)
                    outDataArray[k] = item
                }

                arrayCopy(outDataArray, 8, dialogueKey, i * 8, 8)
                outDataArray[7] ^= ((random32HexArray.length / 8) * j) + i + 1
            }
        }

        arrayCopy(dialogueKey, 0, dialogueKey, 8, 32)
        arrayCopy(outDataArray, 0, dialogueKey, 0, 8)

        logDebug(LOG_TAG, "#5 dialogueKey: " + dialogueKey)
        logDebug(LOG_TAG, "#5 dialogueKey string: " + dialogueKey.toString())

        let dialogKeyResult = ""
        for (let i = 0; i < dialogueKey.length; i++) {
            dialogKeyResult += dialogueKey[i]
        }
        return dialogKeyResult
    }

    doUnwrappingKey = (dialogKey) => {
        let key = new Array(32)
        let inData = new Array(16)
        let outData = new Array(16)

        arrayCopy(dialogKey, 8, key, 0, 32)
        arrayCopy(dialogKey, 0, outData, 0, 8)

        for (let j = 5; j >= 0; j--) {
            for (let i = (key.length / 8) - 1; i >= 0; i--) {
                outData[7] ^= ((key.length / 8) * j) + i + 1

                arrayCopy(outData, 0, inData, 0, 8)
                arrayCopy(key, i * 8, inData, 8, 8)

                // crypto decryptor.
                outData = CryptoJS.AES.decrypt(data, CUSTOM_SECRET_KEY, {
                    padding: CryptoJS.pad.NoPadding,
                    mode: CryptoJS.mode.ECB
                })

                arrayCopy(outData, 8, key, i * 8, 8)
            }
        }
        return key
    }

    return {
        getEncryptedKeyMessage,
        getDecryptedKeyMessage,
        doWrappingKey,
        doUnwrappingKey
    }
}

export default KeyCrypto