import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 */
const RequestHrInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeRequestHrInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeRequestHrInfoUseCase")
    }
    return { executeRequestHrInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default RequestHrInfoUseCase