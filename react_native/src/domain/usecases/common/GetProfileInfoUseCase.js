import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetProfileInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetProfileInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeGetProfileInfoUseCase")
    }
    return { executeGetProfileInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetProfileInfoUseCase