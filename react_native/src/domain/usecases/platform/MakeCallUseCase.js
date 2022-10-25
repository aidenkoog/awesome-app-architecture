import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const MakeCallUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeMakeCallUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeMakeCallUseCase")
    }
    return { executeMakeCallUseCase }
}

/**
 * export bluetooth usecase.
 */
export default MakeCallUseCase