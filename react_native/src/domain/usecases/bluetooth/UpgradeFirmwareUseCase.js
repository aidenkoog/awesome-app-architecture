import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const UpgradeFirewareUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeUpgradeFirewareUseCase = () => {

    }

    /**
     * print error log delivered from bluetooth repository.
     * @param {string} error 
     */
    outputErrorLog = (error) => {
        logError(LOG_TAG, error)
    }

    return { executeUpgradeFirewareUseCase }
}

/**
 * export bluetooth usecase.
 */
export default UpgradeFirewareUseCase