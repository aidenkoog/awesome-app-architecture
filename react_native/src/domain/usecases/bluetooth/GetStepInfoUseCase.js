import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetStepInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetStepInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetStepInfoUseCase")
    }
    return { executeGetStepInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetStepInfoUseCase