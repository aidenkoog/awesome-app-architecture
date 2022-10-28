import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestHrInfoUseCase = () => {

    executeRequestHrInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeRequestHrInfoUseCase")
    }
    return { executeRequestHrInfoUseCase }
}

export default RequestHrInfoUseCase