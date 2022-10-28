import ServerRepository from '../../../data/repositories/server/ServerRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const LogoutUseCase = () => {

    const { logout } = ServerRepository()

    executeLogoutUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeLogoutUseCase")
        logout()
    }
    return { executeLogoutUseCase }
}

export default LogoutUseCase