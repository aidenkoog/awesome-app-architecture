import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ShowWebUrlUseCase = () => {

    executeShowWebUrlUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeShowWebUrlUseCase")
    }
    return { executeShowWebUrlUseCase }
}

export default ShowWebUrlUseCase