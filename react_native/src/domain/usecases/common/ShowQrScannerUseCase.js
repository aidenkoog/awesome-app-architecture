import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ShowQrScannerUseCase = () => {

    executeShowQrScannerUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeShowQrScannerUseCase")
    }
    return { executeShowQrScannerUseCase }
}

export default ShowQrScannerUseCase