import DataCrypto from "./data/DataCrypto"
import KeyCrypto from "./key/KeyCrypto"


const BleCryptoManager = () => {

    const { getEncryptedDataMessage, getDecryptedDataMessage } = DataCrypto()
    const { getEncryptedKeyMessage, getDecryptedKeyMessage } = KeyCrypto()

    /**
     * encryption / descryption about key.
     */
    getEncryptedKey = (data) => {
        return getEncryptedKeyMessage(data)
    }

    getDecryptedKey = (data) => {
        return getDecryptedKeyMessage(data)
    }

    /**
     * encryption / decryption about data.
     */
    getEncryptedData = (data) => {
        return getEncryptedDataMessage(data)
    }

    getDecryptedData = (data) => {
        return getDecryptedDataMessage(data)
    }

    return {
        getEncryptedKey,
        getDecryptedKey,
        getEncryptedData,
        getDecryptedData
    }
}

export default BleCryptoManager