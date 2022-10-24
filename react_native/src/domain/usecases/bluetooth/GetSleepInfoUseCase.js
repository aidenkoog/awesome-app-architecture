import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetSleepInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetSleepInfoUseCase = () => {

    }

    /**
     * print error log delivered from bluetooth repository.
     * @param {string} error 
     */
    outputErrorLog = (error) => {
        logError(LOG_TAG, error)
    }

    return { executeGetSleepInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetSleepInfoUseCase