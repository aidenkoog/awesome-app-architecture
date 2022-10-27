import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetSerialNumberUseCase = () => {

    executeGetSerialNumberUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetSerialNumberUseCase")
    }
    return { executeGetSerialNumberUseCase }
}

export default GetSerialNumberUseCase