import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetDeviceUniqueIdUseCase = () => {

    executeGetDeviceUniqueIdUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetDeviceUniqueIdUseCase")
    }
    return { executeGetDeviceUniqueIdUseCase }
}

export default GetDeviceUniqueIdUseCase