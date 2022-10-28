import ServerRepository from '../../../data/repositories/server/ServerRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const WithdrawUseCase = () => {

    const { withDraw } = ServerRepository()

    executeWithdrawUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeWithdrawUseCase")
        withDraw()
    }
    return { executeWithdrawUseCase }
}

export default WithdrawUseCase