import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetProfileInfoUseCase = () => {

    executeGetProfileInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetProfileInfoUseCase")
    }
    return { executeGetProfileInfoUseCase }
}

export default GetProfileInfoUseCase