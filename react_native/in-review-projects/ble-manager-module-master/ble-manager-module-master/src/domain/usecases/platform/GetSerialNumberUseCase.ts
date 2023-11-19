import Constants from '../../../utils/Constants'
import { logDebugWithLine } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetSerialNumberUseCase = () => {

    const executeGetSerialNumberUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetSerialNumberUseCase")
    }
    return { executeGetSerialNumberUseCase }
}

export default GetSerialNumberUseCase