import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ShowWebUrlUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeShowWebUrlUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeShowWebUrlUseCase")
    }
    return { executeShowWebUrlUseCase }
}

/**
 * export bluetooth usecase.
 */
export default ShowWebUrlUseCase