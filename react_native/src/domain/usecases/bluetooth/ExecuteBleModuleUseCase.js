import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository'

// const bluetoothRepository = require('../../../data/repositories/BluetoothRepository.js').default
const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const ExecuteBleModuleUseCase = () => {

    const { initializeBleModule } = BluetoothRepository()

    /**
     * Execute the use case of initializing ble module. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeBleModuleUseCase = () => {
        return new Promise((fulfill, reject) => {
            initializeBleModule().then(() => {
                logDebug(LOG_TAG, "succeeded to execute initializeBleModule")
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

    return { executeBleModuleUseCase }
}

/**
 * export bluetooth usecase.
 */
export default ExecuteBleModuleUseCase