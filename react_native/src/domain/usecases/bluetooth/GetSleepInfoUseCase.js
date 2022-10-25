import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetSleepInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetSleepInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeGetSleepInfoUseCase")
    }
    return { executeGetSleepInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetSleepInfoUseCase