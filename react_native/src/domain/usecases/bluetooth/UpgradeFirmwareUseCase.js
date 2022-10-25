import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 */
const UpgradeFirewareUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeUpgradeFirewareUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeUpgradeFirewareUseCase")

        return new Promise((fulfill, reject) => {
            
        })
    }
    return { executeUpgradeFirewareUseCase }
}

/**
 * export bluetooth usecase.
 */
export default UpgradeFirewareUseCase