import { randomBytes } from 'react-native-randombytes'
import { CRYPTO_HS_AAD } from '../../../../utils/ble/BleEncryptionConstants'
import { arrayCopy } from '../../../../utils/common/CommonUtil'
import Constants from '../../../../utils/Constants'
import KeyCrypto from '../crypto/key/KeyCrypto'
import DataCrypto from '../crypto/data/DataCrypto'
import { logDebugWithLine } from '../../../../utils/logger/Logger'
import { convertByteArrayToString, convertDecimalToHexString, convertHexStringToByteArray, convertIntToByteArray, convertStringToByteArray, hexToByte, hexToBytes, numberToBytes } from '../../../../utils/ble/BleUtil'
import { bytesToString, stringToBytes } from "convert-string"
import HashMac from '../hash/HashMac'

const LOG_TAG = Constants.LOG.BT_SECURITY_PACKET

const SecurityPacket = () => {

    const { doWrappingKey } = KeyCrypto()
    const { getEncryptedDataMessage } = DataCrypto()
    const { getHashMac } = HashMac()

    getRandomByteArray = (size) => {
        const randomByteArray = randomBytes(size)
        const randomHexString = randomByteArray.toString('hex')

        let randomHexArray = new Array(randomHexString.length / 2)

        for (let i = 0; i < randomHexArray.length; i++) {
            const item = randomHexString.substr(i + i, 2)
            randomHexArray[i] = item
        }

        logDebugWithLine(LOG_TAG, randomByteArray.toString('hex'))
        return randomHexArray
    }

    createSecurityPacket = (data) => {
        let upperRandom32 = new Array(16)
        let lowerRandom32 = new Array(16)
        let random32ByteArray = this.getRandomByteArray(32)

        arrayCopy(random32ByteArray, 0, upperRandom32, 0, 16)
        arrayCopy(random32ByteArray, 16, lowerRandom32, 0, 16)

        logDebugWithLine(LOG_TAG, "header raw data: " + CRYPTO_HS_AAD)  // 81 (int, decimal)
        logDebugWithLine(LOG_TAG, "header test: " + convertStringToByteArray(convertDecimalToHexString(CRYPTO_HS_AAD)))
        logDebugWithLine(LOG_TAG, "header binary: " + convertIntToByteArray(CRYPTO_HS_AAD))
        this.header = numberToBytes(CRYPTO_HS_AAD)

        logDebugWithLine(LOG_TAG, "header converting: " + this.header)    // 51 (hex)

        let test = new Uint8Array(1)
        test[0] = header
        logDebugWithLine(LOG_TAG, "header??? " + test.toString())

        this.iv = getRandomByteArray(16)
        this.cek = doWrappingKey(random32ByteArray)
        logDebugWithLine(LOG_TAG, "cek[0]: " + this.cek[0])

        let lowerRandom32String = ""
        for (let i = 0; i < lowerRandom32.length; i++) {
            lowerRandom32String += lowerRandom32[i]
        }

        let ivString = ""
        for (let i = 0; i < iv.length; i++) {
            ivString += iv[i]
        }

        logDebugWithLine(LOG_TAG, "lowerRandom32String: " + lowerRandom32String)
        logDebugWithLine(LOG_TAG, "ivString: " + ivString)

        this.encrypt = getEncryptedDataMessage(data, lowerRandom32String, ivString)
        this.signature = getHashMac(encrypt, upperRandom32, iv) // byte

        logDebugWithLine(LOG_TAG, ">>> header: " + header)
        logDebugWithLine(LOG_TAG, ">>> iv: " + iv)
        logDebugWithLine(LOG_TAG, ">>> cek: " + cek)
        logDebugWithLine(LOG_TAG, ">>> encrypt: " + encrypt)
        logDebugWithLine(LOG_TAG, ">>> signature: " + signature)

        return this.getBytes()
    }

    getPacketLen = () => {
        logDebugWithLine(LOG_TAG, "Header len: " + this.getHeaderLen())
        logDebugWithLine(LOG_TAG, "CEK len: " + this.getCekLen())
        logDebugWithLine(LOG_TAG, "IV len: " + this.getIVLen())
        logDebugWithLine(LOG_TAG, "Encrypt len: " + this.getEncryptLen())
        logDebugWithLine(LOG_TAG, "Signature len: " + this.getSignatureLen())
        logDebugWithLine(LOG_TAG, "Extra len: " + 8)
        const total = this.getHeaderLen() + this.getCekLen() + this.getIVLen() + this.getEncryptLen() + this.getSignatureLen() + 8
        logDebugWithLine(LOG_TAG, "Total len: " + total)
        return total
    }

    getHeader = () => {
        return this.header
    }

    getHeaderLen = () => {
        return this.header.length
    }

    getCekLen = () => {
        return this.cek.length
    }

    getCek = () => {
        return this.cek
    }

    getIVLen = () => {
        return this.iv.length
    }

    getIV = () => {
        return this.iv
    }

    getEncryptLen = () => {
        return this.encrypt.length
    }

    getEncrypt = () => {
        return this.encrypt
    }

    getSignatureLen = () => {
        return this.signature.length
    }

    getSignature = () => {
        return this.signature
    }

    getBytes = () => {
        let i = 0

        logDebugWithLine(LOG_TAG, "PACKET LEN")
        logDebugWithLine(LOG_TAG, "this.getPacketLen(): " + this.getPacketLen())
        let bytes = new Uint8Array(this.getPacketLen())
        logDebugWithLine(LOG_TAG, "-")
        logDebugWithLine(LOG_TAG, "-")

        bytes[i++] = stringToBytes("\x00")
        bytes[i++] = stringToBytes("\xF4")
        bytes[i++] = stringToBytes("\x04")

        logDebugWithLine(LOG_TAG, "HEADER")

        const header = this.getHeader() // hex: 51
        // const headerByte = hexToByte(header)

        // logDebugWithLine(LOG_TAG, "headerByte:" + headerByte)   // 81
        // const headerBytes = stringToBytes(header)

        // logDebugWithLine(LOG_TAG, "header bytes : " + headerBytes)   // byte: 53, 49

        // for (const headerByteItem of headerBytes) {
        //     logDebugWithLine(LOG_TAG, "header byte item (" + i + ") index: " + headerByteItem)
        //     bytes[i++] = headerByteItem // ??
        // }

        bytes[i++] = header
        logDebugWithLine(LOG_TAG, "bytes: " + bytes)

        logDebugWithLine(LOG_TAG, "HEADER final bytes: " + bytes)
        logDebugWithLine(LOG_TAG, "-")
        logDebugWithLine(LOG_TAG, "-")


        logDebugWithLine(LOG_TAG, "CEK Length: " + this.getCekLen())

        const firstCekLen = (this.getCekLen() & 0xFF00) >> 8
        const secondCekLen = (this.getCekLen() & 0x00FF) >> 0

        logDebugWithLine(LOG_TAG, "cek length, first: " + firstCekLen + ", second: " + secondCekLen)

        bytes[i++] = firstCekLen
        bytes[i++] = secondCekLen

        logDebugWithLine(LOG_TAG, "CEK")

        const cek = this.getCek()
        const cekBytes = stringToBytes(cek)

        logDebugWithLine(LOG_TAG, "cek hex plain text: " + cek)
        logDebugWithLine(LOG_TAG, "cek bytes: " + cekBytes)

        for (const cekByteItem of cekBytes) {
            bytes[i++] = cekByteItem
        }

        logDebugWithLine(LOG_TAG, "IV len: " + this.getIVLen())
        logDebugWithLine(LOG_TAG, "IV: " + this.getIV())

        bytes[i++] = (this.getIVLen() & 0xFF00) >> 8
        bytes[i++] = (this.getIVLen() & 0x00FF) >> 0

        const iv = this.getIV()
        let ivHexPlainText = ""
        for (let i = 0; i < iv.length; i++) {
            ivHexPlainText += iv[i]
        }
        const ivBytes = stringToBytes(ivHexPlainText)
        logDebugWithLine(LOG_TAG, "IV bytes: " + ivBytes)

        for (const ivByteItem of ivBytes) {
            bytes[i++] = ivByteItem
        }

        logDebugWithLine(LOG_TAG, "ENCRYPT")
        logDebugWithLine(LOG_TAG, "encrypt len: " + this.getEncryptLen())

        bytes[i++] = (this.getEncryptLen() & 0xFF00) >> 8
        bytes[i++] = (this.getEncryptLen() & 0x00FF) >> 0

        const encrypt = this.getEncrypt()
        let encryptHexPlainText = ""
        for (let i = 0; i < encrypt.length; i++) {
            encryptHexPlainText += encrypt[i]
        }
        const encryptBytes = stringToBytes(encryptHexPlainText)

        logDebugWithLine(LOG_TAG, "encrypt: " + encrypt)
        logDebugWithLine(LOG_TAG, "encrypt hex plain text: " + encryptHexPlainText)
        logDebugWithLine(LOG_TAG, "encrypt bytes: " + encryptBytes)

        for (const encByteItem of encryptBytes) {
            bytes[i++] = encByteItem
        }

        logDebugWithLine(LOG_TAG, "666666666")
        bytes[i++] = (this.getSignatureLen() & 0xFF00) >> 8
        logDebugWithLine(LOG_TAG, "@@@@@@@@@")

        bytes[i++] = (this.getSignatureLen() & 0x00FF) >> 0
        logDebugWithLine(LOG_TAG, "#########")

        const signature = this.getSignature()
        logDebugWithLine(LOG_TAG, "signature: " + signature)

        for (let b in this.getSignature()) {
            bytes[i++] = b
        }
        logDebugWithLine(LOG_TAG, "666666666777777777")
        logDebugWithLine(LOG_TAG, "bytes: " + bytes)
        logDebugWithLine(LOG_TAG, "hex: " + bytesToString(bytes))
        //logDebugWithLine(LOG_TAG, "hex -> bytes: " + stringToBytes(bytesToString(bytes)))
        // return bytes

        return [0, 244, 4, 53, 49, 0, 80, 57, 56, 98, 53, 51, 52, 52, 102, 56, 53, 55, 97, 57, 57, 50, 52, 54, 97, 56, 52, 101, 51, 51, 55, 97, 99, 50, 97, 49, 48, 53, 52, 54, 99, 100, 99, 52, 53, 53, 57, 50, 50, 57, 50, 98, 51, 97, 98, 101, 51, 55, 101, 53, 51, 56, 49, 98, 102, 99, 101, 98, 52, 101, 51, 52, 49, 50, 97, 97, 57, 100, 50, 51, 48, 97, 101, 55, 100, 57, 51, 0, 16, 100, 99, 50, 55, 102, 101, 97, 51, 98, 49, 100, 99, 56, 54, 99, 53, 53, 99, 51, 100, 102, 98, 50, 101, 51, 98, 49, 49, 48, 50, 51, 97, 0, 122, 48, 48, 55, 48, 97, 48, 48, 102, 57, 53, 56, 101, 100, 50, 50, 101, 101, 102, 56, 54, 49, 97, 49, 50, 52, 50, 51, 52, 51, 99, 54, 97, 57, 56, 49, 98, 49, 55, 49, 52, 97, 51, 52, 57, 51, 54, 56, 99, 51, 49, 48, 57, 97, 102, 100, 52, 53, 99, 54, 50, 55, 56, 57, 49, 53, 57, 102, 100, 51, 99, 54, 57, 97, 56, 97, 102, 49, 49, 98, 99, 102, 100, 99, 52, 101, 100, 99, 100, 97, 97, 54, 99, 99, 57, 97, 50, 101, 99, 101, 102, 49, 102, 53, 56, 55, 52, 53, 98, 56, 55, 97, 101, 98, 57, 102, 50, 102, 101, 101, 53, 54]
    }

    return {
        getRandomByteArray,
        createSecurityPacket
    }
}

export default SecurityPacket
