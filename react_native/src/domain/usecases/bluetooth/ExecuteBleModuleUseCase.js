import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const ExecuteBleModuleUseCase = () => {

    const { initializeBleModule } = BluetoothRepository()

    /**
     * Execute the use case of initializing ble module. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeBleModuleUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeBleModuleUseCase")

        return new Promise((fulfill, reject) => {
            initializeBleModule().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute initializeBleModule")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeBleModuleUseCase }
}

/**
 * export bluetooth usecase.
 */
export default ExecuteBleModuleUseCase