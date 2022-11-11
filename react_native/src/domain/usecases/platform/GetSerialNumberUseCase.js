import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetSerialNumberUseCase = () => {

    executeGetSerialNumberUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetSerialNumberUseCase")
    }
    return { executeGetSerialNumberUseCase }
}

export default GetSerialNumberUseCase