import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetDeviceUniqueIdUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetDeviceUniqueIdUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetDeviceUniqueIdUseCase")
    }
    return { executeGetDeviceUniqueIdUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetDeviceUniqueIdUseCase