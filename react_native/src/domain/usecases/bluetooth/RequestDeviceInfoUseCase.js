import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestDeviceInfoUseCase = () => {

    executeRequestDeviceInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRequestDeviceInfoUseCase")

        return new Promise((fulfill, reject) => {

        })
    }
    return { executeRequestDeviceInfoUseCase }
}

export default RequestDeviceInfoUseCase