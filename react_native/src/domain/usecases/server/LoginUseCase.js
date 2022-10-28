import ServerRepository from '../../../data/repositories/server/ServerRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const LoginUseCase = () => {

    const { login } = ServerRepository()

    executeLoginUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeLoginUseCase")
        login()
    }
    return { executeLoginUseCase }
}

export default LoginUseCase