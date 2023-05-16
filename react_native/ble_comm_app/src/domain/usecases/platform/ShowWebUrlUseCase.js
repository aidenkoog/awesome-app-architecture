import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ShowWebUrlUseCase = () => {

    executeShowWebUrlUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute ShowWebUrlUseCase")
    }
    return { executeShowWebUrlUseCase }
}

export default ShowWebUrlUseCase