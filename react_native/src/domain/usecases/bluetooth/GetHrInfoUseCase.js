import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetHrInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetHrInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeGetHrInfoUseCase")
    }
    return { executeGetHrInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetHrInfoUseCase