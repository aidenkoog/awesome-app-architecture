import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const WriteEmailUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeWriteEmailUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeWriteEmailUseCase")
    }
    return { executeWriteEmailUseCase }
}

/**
 * export bluetooth usecase.
 */
export default WriteEmailUseCase