import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
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
        return new Promise((fulfill, reject) => {
            disconnectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, "succeeded to execute disconnectDevice " + peripheralId)
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * print error log delivered from bluetooth repository.
     * @param {string} error 
     */
    outputErrorLog = (error) => {
        logError(LOG_TAG, error)
    }

    return { executeDisconnectDeviceUseCase }
}

/**
 * export bluetooth usecase.
 */
export default DisconnectDeviceUseCase