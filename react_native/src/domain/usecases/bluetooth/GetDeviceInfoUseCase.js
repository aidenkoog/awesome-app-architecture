import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetDeviceInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetDeviceInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetDeviceInfoUseCase")
    }
    return { executeGetDeviceInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetDeviceInfoUseCase