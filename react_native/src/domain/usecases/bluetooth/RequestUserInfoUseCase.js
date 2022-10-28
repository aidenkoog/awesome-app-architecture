import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestUserInfoUseCase = () => {

    executeRequestUserInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRequestUserInfoUseCase")

        return new Promise((fulfill, reject) => {

        })
    }
    return { executeRequestUserInfoUseCase }
}

export default RequestUserInfoUseCase