import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const DisconnectDeviceUseCase = () => {

    const { disconnectDevice } = BluetoothRepository()

    /**
     * Execute the use case of disconnecting devices. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeDisconnectDeviceUseCase = (peripheralId) => {
        logDebug(LOG_TAG, ">>> triggered executeDisconnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            disconnectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute disconnectDevice " + peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeDisconnectDeviceUseCase }
}

/**
 * export bluetooth usecase.
 */
export default DisconnectDeviceUseCase