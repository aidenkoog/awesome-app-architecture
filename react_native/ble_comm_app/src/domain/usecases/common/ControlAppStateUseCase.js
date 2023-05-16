import CommonRepository from '../../../data/repositories/common/CommonRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ControlAppStateUseCase = () => {

    const { addAppStateHandler, removeAppStateHandler } = CommonRepository()

    /**
     * execute usecase of adding handler that can detect app's state.
     */
    executeAddAppStateHandlerUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute AddAppStateHandlerUseCase")
        addAppStateHandler()
    }

    /**
     * execute usecase of removing handler that can detect app's state.
     */
    executeRemoveAppStopHandlerUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute RemoveAppStopHandlerUseCase")
        removeAppStateHandler()
    }

    return { executeAddAppStateHandlerUseCase, executeRemoveAppStopHandlerUseCase }
}

export default ControlAppStateUseCase