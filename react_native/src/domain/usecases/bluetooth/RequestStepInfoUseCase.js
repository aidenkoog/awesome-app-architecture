import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 */
const RequestStepInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeRequestStepInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRequestStepInfoUseCase")

        return new Promise((fulfill, reject) => {
            
        })
    }
    return { executeRequestStepInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default RequestStepInfoUseCase