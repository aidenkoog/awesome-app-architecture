import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
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
        logDebug(LOG_TAG, ">>> triggered executeConnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            connectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute connectDevice " + peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(e)
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