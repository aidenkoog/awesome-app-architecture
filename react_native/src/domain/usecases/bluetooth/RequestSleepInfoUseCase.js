import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestSleepInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeRequestSleepInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeRequestSleepInfoUseCase")
    }
    return { executeRequestSleepInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default RequestSleepInfoUseCase