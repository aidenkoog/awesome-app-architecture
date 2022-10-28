import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestSleepInfoUseCase = () => {

    executeRequestSleepInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeRequestSleepInfoUseCase")
    }
    return { executeRequestSleepInfoUseCase }
}

export default RequestSleepInfoUseCase