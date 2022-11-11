import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const AddDeviceUseCase = () => {

    executeAddDeviceUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute AddDeviceUseCase")
    }
    return { executeAddDeviceUseCase }
}

export default AddDeviceUseCase