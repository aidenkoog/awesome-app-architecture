import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const LoginUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeLoginUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeLoginUseCase")
    }
    return { executeLoginUseCase }
}

/**
 * export bluetooth usecase.
 */
export default LoginUseCase