import CommonRepository from '../../../data/repositories/common/CommonRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ControlAppStateUseCase = () => {

    const { addAppStateHandler, removeAppStateHandler } = CommonRepository()

    executeAddAppStateHandlerUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeAddAppStateHandlerUseCase")
        addAppStateHandler()
    }

    executeRemoveAppStopHandlerUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeAddAppStopHandlerUseCase")
        removeAppStateHandler()
    }

    return { executeAddAppStateHandlerUseCase }
}

export default ControlAppStateUseCase