import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetDeviceNameUseCase = () => {

    executeGetDeviceNameUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetDeviceNameUseCase")
    }
    return { executeGetDeviceNameUseCase }
}

export default GetDeviceNameUseCase