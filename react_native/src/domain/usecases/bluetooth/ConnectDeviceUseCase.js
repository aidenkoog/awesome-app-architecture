import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const ConnectDeviceUseCase = () => {

    const { connectDevice } = BluetoothRepository()

    /**
     * Execute the use case of connecting devices. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeConnectDeviceUseCase = (peripheralId) => {
        return new Promise((fulfill, reject) => {
            connectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, "succeeded to execute connectDevice " + peripheralId)
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

    return { executeConnectDeviceUseCase }
}

/**
 * export bluetooth usecase.
 */
export default ConnectDeviceUseCase