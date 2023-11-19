import CommonRepository from '../../../data/repositories/common/CommonRepository'
import Constants from '../../../utils/Constants'
import { logDebugWithLine } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ControlAppStateUseCase = () => {

    const { addAppStateHandler, removeAppStateHandler } = CommonRepository()

    /**
     * execute usecase of adding handler that can detect app's state.
     */
    const executeAddAppStateHandlerUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute AddAppStateHandlerUseCase")
        addAppStateHandler()
    }

    /**
     * execute usecase of removing handler that can detect app's state.
     */
    const executeRemoveAppStopHandlerUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute RemoveAppStopHandlerUseCase")
        removeAppStateHandler()
    }

    return { executeAddAppStateHandlerUseCase, executeRemoveAppStopHandlerUseCase }
}

export default ControlAppStateUseCase