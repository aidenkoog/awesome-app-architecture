import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 */
const RequestDeviceInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeRequestDeviceInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRequestDeviceInfoUseCase")

        return new Promise((fulfill, reject) => {
            
        })
    }
    return { executeRequestDeviceInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default RequestDeviceInfoUseCase