import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const AddDeviceUseCase = () => {

    executeAddDeviceUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeAddDeviceUseCase")
    }
    return { executeAddDeviceUseCase }
}

export default AddDeviceUseCase