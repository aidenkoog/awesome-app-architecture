import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
import BleRepository from '../../../data/repositories/ble/BleRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const ConnectDeviceUseCase = () => {

    const { connectDevice } = BleRepository()

    /**
     * Execute the use case of connecting devices. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeConnectDeviceUseCase = (peripheralId) => {
        logDebug(LOG_TAG, ">>> ### triggered executeConnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            connectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute connectDevice " + peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeConnectDeviceUseCase }
}

/**
 * export bluetooth usecase.
 */
export default ConnectDeviceUseCase