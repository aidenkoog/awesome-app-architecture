import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../../../utils/logger/Logger.js'
import {
    getDeviceNameAsHexString, getSequenceId, getStatus, getUserId, getVersionAsHexString
} from '../../../../../utils/ble/BleFeatureUtil.js'
import { getBleDeviceName } from '../../../../../utils/storage/StorageUtil.js'
import { convertHexStringToByteArray } from '../../../../../utils/ble/BleUtil.js'
import { getEncryptedData } from '../../../../../utils/ble/BleEncryptionUtil.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestAuthUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic data.
     */
    const { sendBleCustomValue } = BleRepository()

    /**
     * execute usecase of requesting authentication to device.
     * [ sequence ]
     * 1. create protocol.
     * 2. encrypt values.
     * 3. send encrypted values.
     */
    executeRequestAuthUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRequestAuthUseCase")

        return new Promise((fulfill, reject) =>
            sendBleCustomValue(encryptProtocol(createPairingProtocol()))
                .then(() => fulfill())
                .catch((e) => reject(e)))
            .catch((e) => reject(e))
    }

    /**
     * create pairing protocol values.
     * Ref. version + sequence id + status + device id + user id (uuid)
     * @returns {bytes}
     */
    createPairingProtocol = () => {
        let pairingProtocol = getVersionAsHexString() + getSequenceId() + getStatus()

        getBleDeviceName().then((deviceName) => {
            pairingProtocol += getDeviceNameAsHexString(deviceName)

            getUserId().then((instanceId) => {
                pairingProtocol += instanceId
                logDebug(LOG_TAG, "<<< paringProtocol: " + pairingProtocol)

                const paringProtocolBytes = convertHexStringToByteArray(pairingProtocol)
                logDebug(LOG_TAG, "<<< paringProtocolBytes: " + paringProtocolBytes)
                return paringProtocolBytes

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                return null
            })

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e)
            return null
        })
    }

    /**
     * encrypt protocol values and return it.
     * @returns {bytes}
     */
    encryptProtocol = (protocolBytes) => {
        return getEncryptedData(protocolBytes)
    }

    return { executeRequestAuthUseCase }
}

export default RequestAuthUseCase