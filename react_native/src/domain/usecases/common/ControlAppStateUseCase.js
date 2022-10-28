import CommonRepository from '../../../data/repositories/common/CommonRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ControlAppStateUseCase = () => {

    const { addAppStateHandler, removeAppStateHandler } = CommonRepository()

    /**
     * execute usecase of adding handler that can detect app's state.
     */
    executeAddAppStateHandlerUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeAddAppStateHandlerUseCase")
        addAppStateHandler()
    }

    /**
     * execute usecase of removing handler that can detect app's state.
     */
    executeRemoveAppStopHandlerUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRemoveAppStopHandlerUseCase")
        removeAppStateHandler()
    }

    return { executeAddAppStateHandlerUseCase, executeRemoveAppStopHandlerUseCase }
}

export default ControlAppStateUseCase