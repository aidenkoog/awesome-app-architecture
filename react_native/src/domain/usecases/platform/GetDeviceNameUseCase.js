import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetDeviceNameUseCase = () => {

    executeGetDeviceNameUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetDeviceNameUseCase")
    }
    return { executeGetDeviceNameUseCase }
}

export default GetDeviceNameUseCase