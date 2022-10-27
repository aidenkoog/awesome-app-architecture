import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const SetProfileInfoUseCase = () => {

    executeSetProfileInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeSetProfileInfoUseCase")
    }
    return { executeSetProfileInfoUseCase }
}

export default SetProfileInfoUseCase