import Constants from '../../../utils/Constants'
import { logDebugWithLine } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetDeviceNameUseCase = () => {

    const executeGetDeviceNameUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetDeviceNameUseCase")
    }
    return { executeGetDeviceNameUseCase }
}

export default GetDeviceNameUseCase