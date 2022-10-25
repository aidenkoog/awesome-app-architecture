import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ShowQrScannerUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeShowQrScannerUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeShowQrScannerUseCase")
    }
    return { executeShowQrScannerUseCase }
}

/**
 * export bluetooth usecase.
 */
export default ShowQrScannerUseCase