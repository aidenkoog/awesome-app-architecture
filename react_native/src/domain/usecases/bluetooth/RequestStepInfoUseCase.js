import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestStepInfoUseCase = () => {

    executeRequestStepInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRequestStepInfoUseCase")

        return new Promise((fulfill, reject) => {

        })
    }
    return { executeRequestStepInfoUseCase }
}

export default RequestStepInfoUseCase