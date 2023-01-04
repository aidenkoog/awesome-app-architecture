import { convertIntToOneByte } from '../../../../utils/ble/BleUtil'
import { randomBytes } from 'react-native-randombytes'
import { CRYPTO_HS_AAD } from '../../../../utils/ble/BleEncryptionConstants'
import { arrayCopy } from '../../../../utils/common/CommonUtil'
import { logDebug } from '../../../../utils/logger/Logger'
import { stringToBytes } from "convert-string"
import HashMac from '../authentication/HashMac'
import Constants from '../../../../utils/Constants'
import Encryptor from '../authentication/Encryptor'
import KeyWrapper from '../authentication/KeyWrapper'

const LOG_TAG = Constants.LOG.BT_SECURITY_PACKET
const PREFIX = "\x00"
const TYPE = "\x04"

const SecurityPacket = () => {

    const { getWrappingKeyBytes } = KeyWrapper()
    const { getEncryptedMessage } = Encryptor()
    const { getHashMacBytes } = HashMac()

    getSecurityPacketBytes = (messageBytes) => {

        let upperRandom32Bytes = new Array(16)
        let lowerRandom32Bytes = new Array(16)
        logDebug(LOG_TAG, ">>> upperRandom32Bytes: " + upperRandom32Bytes
            + ", lowerRandom32Bytes: " + lowerRandom32Bytes)


        let random32Bytes = randomBytes(32)
        logDebug(LOG_TAG, ">>> random32Bytes: " + random32Bytes)


        arrayCopy(random32Bytes, 0, upperRandom32Bytes, 0, 16)
        arrayCopy(random32Bytes, 16, lowerRandom32Bytes, 0, 16)
        logDebug(LOG_TAG, ">>> copied upperRandom32Bytes: " + upperRandom32Bytes
            + ", copied lowerRandom32Bytes: " + lowerRandom32Bytes)


        this.headerBytes = convertIntToOneByte(CRYPTO_HS_AAD)
        logDebug(LOG_TAG, ">>> headerBytes: " + headerBytes)


        this.ivBytes = randomBytes(16)
        logDebug(LOG_TAG, ">>> ivBytes: " + ivBytes)


        this.cekBytes = getWrappingKeyBytes(random32Bytes)
        logDebug(LOG_TAG, ">>> cekBytes: " + cekBytes)


        this.encryptedBytes = getEncryptedMessage(messageBytes, lowerRandom32Bytes, ivBytes)
        logDebug(LOG_TAG, ">>> encryptedBytes: " + encryptedBytes)


        this.signatureBytes = getHashMacBytes(encryptedBytes, upperRandom32Bytes, ivBytes)
        logDebug(LOG_TAG, ">>> signatureBytes: " + signatureBytes)

        return this.getTotalBytes()
    }

    getPacketBytesLength = () => {
        const totalBytesLength =
            this.getHeaderBytesLength()
            + this.getCekBytesLength()
            + this.getIvBytesLength()
            + this.getEncryptedBytesLength()
            + this.getSignatureBytesLength() + 8

        logDebug(LOG_TAG, "header bytes length: " + this.getHeaderBytesLength())
        logDebug(LOG_TAG, "cek bytes length: " + this.getCekBytesLength())
        logDebug(LOG_TAG, "iv bytes length: " + this.getIvBytesLength())
        logDebug(LOG_TAG, "encrypted bytes length: " + this.getEncryptedBytesLength())
        logDebug(LOG_TAG, "signature bytes length: " + this.getSignatureBytesLength())

        logDebug(LOG_TAG, "total bytes length: " + totalBytesLength)

        return totalBytesLength
    }

    getHeaderBytes = () => {
        return this.headerBytes
    }

    getHeaderBytesLength = () => {
        return this.headerBytes.length
    }

    getCekBytesLength = () => {
        return this.cekBytes.length
    }

    getCekBytes = () => {
        return this.cekBytes
    }

    getIvBytesLength = () => {
        return this.ivBytes.length
    }

    getIvBytes = () => {
        return this.ivBytes
    }

    getEncryptedBytesLength = () => {
        return this.encryptedBytes.length
    }

    getEncryptedBytes = () => {
        return this.encryptedBytes
    }

    getSignatureBytesLength = () => {
        return this.signatureBytes.length
    }

    getSignatureBytes = () => {
        return this.signatureBytes
    }

    getPrefixBytes = () => {
        this.prefixBytes = stringToBytes(PREFIX)
        return prefixBytes
    }

    getDataLengthBytes = () => {
        this.dataBytesLength = convertIntToOneByte(this.getPacketBytesLength())
        return dataBytesLength
    }

    getTypeBytes = () => {
        this.typeBytes = stringToBytes(TYPE)
        return typeBytes
    }

    getTotalBytes = () => {
        let totalBytes = []

        copyBytes(totalBytes, this.getPrefixBytes())
        copyBytes(totalBytes, this.getDataLengthBytes())
        copyBytes(totalBytes, this.getTypeBytes())

        copyBytes(totalBytes, this.getHeaderBytes())

        totalBytes.push((this.getCekBytesLength() & 0xFF00) >> 8)
        totalBytes.push((this.getCekBytesLength() & 0x00FF) >> 0)

        copyBytes(totalBytes, this.getCekBytes())

        totalBytes.push((this.getIvBytesLength() & 0xFF00) >> 8)
        totalBytes.push((this.getIvBytesLength() & 0x00FF) >> 0)

        copyBytes(totalBytes, this.getIvBytes())

        totalBytes.push((this.getEncryptedBytesLength() & 0xFF00) >> 8)
        totalBytes.push((this.getEncryptedBytesLength() & 0x00FF) >> 0)

        copyBytes(totalBytes, this.getSignatureBytes())

        logDebug(LOG_TAG, ">>> totalBytes: " + totalBytes)
        logDebug(LOG_TAG, ">>> totalBytes length: " + totalBytes.length)

        return totalBytes
    }

    copyBytes = (destinationBytes, sourceBytes) => {
        for (const item of sourceBytes) {
            destinationBytes.push(item)
        }
        logDebug(LOG_TAG, ">>> copied bytes: " + sourceBytes)
    }

    return {
        getSecurityPacketBytes
    }
}

export default SecurityPacket
