import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const WriteEmailUseCase = () => {

    executeWriteEmailUseCase = () => {
        logDebugWithLine(LOG_TAG, ">>> execute WriteEmailUseCase")
    }
    return { executeWriteEmailUseCase }
}

export default WriteEmailUseCase