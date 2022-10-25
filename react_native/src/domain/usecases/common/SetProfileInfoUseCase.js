import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const SetProfileInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeSetProfileInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeSetProfileInfoUseCase")
    }
    return { executeSetProfileInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default SetProfileInfoUseCase