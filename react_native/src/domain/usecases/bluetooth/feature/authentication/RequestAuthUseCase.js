import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../../../utils/logger/Logger.js'
import { stringToBytes } from "convert-string"
import PlatformRepository from '../../../../../data/repositories/platform/PlatformRepository.js'
import { getDeviceNameAsHexString, getSequenceId, getStatus, getVersionAsHexString } from '../../../../../utils/ble/BleFeatureUtil.js'
import { getBleDeviceName } from '../../../../../utils/storage/StorageUtil.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG
const DUMMY_VALUE = stringToBytes("\x00" + "\x05" + "\x00" + "DUMMY")

const RequestAuthUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic data.
     */
    const { sendBleCustomValue } = BleRepository()

    /**
     * platform repository's api.
     */
    const { getInstanceId } = PlatformRepository()

    /**
     * execute usecase of requesting authentication to device.
     * [ sequence ]
     * 1. create protocol.
     * 2. encrypt values.
     * 3. send encrypted values.
     */
    executeRequestAuthUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRequestAuthUseCase")

        const protocol = createPairingProtocol()
        const encryptedProtocol = encryptProtocol(protocol)

        return new Promise((fulfill, reject) =>
            sendBleCustomValue(encryptedProtocol)
                .then(() => fulfill())
                .catch((e) => reject(e)))
            .catch((e) => reject(e))
    }

    /**
     * create pairing protocol values.
     * Ref. version + sequence id + status + device id + user id (uuid)
     * @returns {string}
     */
    createPairingProtocol = () => {
        let pairingProtocol = getVersionAsHexString() + getSequenceId() + getStatus()

        getBleDeviceName().then((deviceName) => {
            pairingProtocol += getDeviceNameAsHexString(deviceName)

            getInstanceId().then((instanceId) => {
                pairingProtocol += instanceId
                return pairingProtocol

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
     * encrypt protocol values.
     */
    encryptProtocol = (protocol) => {
        // TODO:
        return ""
    }

    return { executeRequestAuthUseCase }
}

export default RequestAuthUseCase