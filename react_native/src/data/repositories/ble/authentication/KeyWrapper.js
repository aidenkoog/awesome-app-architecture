import { CUSTOM_SECRET_KEY, IV_BYTES, KEY_BYTES } from "../../../../utils/ble/BleEncryptionConstants"
import { arrayCopy } from "../../../../utils/common/CommonUtil"
import Constants from "../../../../utils/Constants"
import { logDebug } from "../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_KEY_CRYPTO

/**
 * load crypto module.
 */
const CryptoJS = require("crypto-js")
var aesjs = require('aes-js');

const KeyWrapper = () => {

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

    getWrappingKeyBytes = (keyBytes) => {

        let dialogueKey = new Array(40)
        let inData = new Array(16)
        let outDataArray = new Array(16)
        logDebug(LOG_TAG, ">>> dialogueKey: " + dialogueKey + ", inData: " + inData + ", outDataArray: " + outDataArray)

        var aesEcb = new aesjs.ModeOfOperation.ecb(KEY_BYTES)

        arrayCopy(keyBytes, 0, dialogueKey, 0, 32)
        arrayCopy(IV_BYTES, 0, outDataArray, 0, 8)
        logDebug(LOG_TAG, ">>> dialogueKey: " + dialogueKey + ", outDataArray: " + outDataArray)


        for (let j = 0; j < 6; j++) {

            for (let i = 0; i < (keyBytes.length / 8); i++) {

                arrayCopy(outDataArray, 0, inData, 0, 8)
                arrayCopy(dialogueKey, i * 8, inData, 8, 8)


                var encryptedBytes = aesEcb.encrypt(inData)
                logDebug(LOG_TAG, ">>> encryptedKey Bytes: " + encryptedBytes)

                outDataArray = encryptedBytes
                logDebug(LOG_TAG, ">>> copied encryptedKey Bytes: " + outDataArray)


                arrayCopy(outDataArray, 8, dialogueKey, i * 8, 8)
                outDataArray[7] ^= ((keyBytes.length / 8) * j) + i + 1
            }
        }

        arrayCopy(dialogueKey, 0, dialogueKey, 8, 32)
        arrayCopy(outDataArray, 0, dialogueKey, 0, 8)
        logDebug(LOG_TAG, ">>> dialogueKey: " + dialogueKey)


        return dialogueKey
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
        getWrappingKeyBytes,
        doUnwrappingKey
    }
}

export default KeyWrapper