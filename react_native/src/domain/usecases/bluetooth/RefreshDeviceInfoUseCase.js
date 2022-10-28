import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RefreshDeviceInfoUseCase = () => {

    executeRefreshDeviceInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeRefreshDeviceInfoUseCase")
    }
    return { executeRefreshDeviceInfoUseCase }
}

export default RefreshDeviceInfoUseCase