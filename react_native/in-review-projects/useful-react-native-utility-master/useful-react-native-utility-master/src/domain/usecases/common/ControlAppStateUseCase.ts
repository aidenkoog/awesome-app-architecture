import CommonRepository from '../../../data/repositories/common/CommonRepository'
import Constants from '../../../utils/Constants'
import { logDebugWithLine } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const ControlAppStateUseCase = () => {

    const { addAppStateHandler } = CommonRepository()

    /**
     * execute usecase of adding handler that can detect app's state.
     */
    const executeAddAppStateHandlerUseCase = (): void => {
        logDebugWithLine(LOG_TAG, "execute AddAppStateHandlerUseCase")
        addAppStateHandler()
    }

    return { executeAddAppStateHandlerUseCase }
}

export default ControlAppStateUseCase