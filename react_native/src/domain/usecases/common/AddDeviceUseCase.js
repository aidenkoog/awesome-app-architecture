import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const AddDeviceUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeAddDeviceUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeAddDeviceUseCase")
    }
    return { executeAddDeviceUseCase }
}

/**
 * export bluetooth usecase.
 */
export default AddDeviceUseCase