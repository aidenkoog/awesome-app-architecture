import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ShowQrScannerUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeShowQrScannerUseCase = () => {

    }

    /**
     * print error log delivered from bluetooth repository.
     * @param {string} error 
     */
    outputErrorLog = (error) => {
        logError(LOG_TAG, error)
    }

    return { executeShowQrScannerUseCase }
}

/**
 * export bluetooth usecase.
 */
export default new ShowQrScannerUseCase()