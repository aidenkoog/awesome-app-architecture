import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetDeviceNameUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetDeviceNameUseCase = () => {

    }

    /**
     * print error log delivered from bluetooth repository.
     * @param {string} error 
     */
    outputErrorLog = (error) => {
        logError(LOG_TAG, error)
    }

    return { executeGetDeviceNameUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetDeviceNameUseCase