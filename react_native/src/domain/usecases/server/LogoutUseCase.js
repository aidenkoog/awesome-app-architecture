import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const LogoutUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeLogoutUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeLogoutUseCase")
    }
    return { executeLogoutUseCase }
}

/**
 * export bluetooth usecase.
 */
export default LogoutUseCase