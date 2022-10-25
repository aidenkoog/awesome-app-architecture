import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 */
const RequestUserInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeRequestUserInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRequestUserInfoUseCase")

        return new Promise((fulfill, reject) => {
            
        })
    }
    return { executeRequestUserInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default RequestUserInfoUseCase