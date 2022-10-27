import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
import BleRepository from '../../../data/repositories/ble/BleRepository'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const ExecuteBleModuleUseCase = () => {

    const { initializeBleModule } = BleRepository()

    /**
     * Execute the use case of initializing ble module. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeBleModuleUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeBleModuleUseCase")

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

export default ExecuteBleModuleUseCase