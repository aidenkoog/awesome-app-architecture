import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetUserInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetUserInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetUserInfoUseCase")
    }
    return { executeGetUserInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetUserInfoUseCase