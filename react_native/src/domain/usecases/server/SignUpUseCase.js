import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const SignUpUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeSignUpUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeSignUpUseCase")
    }
    return { executeSignUpUseCase }
}

/**
 * export bluetooth usecase.
 */
export default SignUpUseCase