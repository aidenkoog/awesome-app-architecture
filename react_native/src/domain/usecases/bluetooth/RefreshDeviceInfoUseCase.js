import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RefreshDeviceInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeRefreshDeviceInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeRefreshDeviceInfoUseCase")
    }
    return { executeRefreshDeviceInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default RefreshDeviceInfoUseCase