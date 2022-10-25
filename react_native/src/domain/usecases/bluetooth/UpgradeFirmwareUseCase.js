import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const UpgradeFirewareUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeUpgradeFirewareUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeUpgradeFirewareUseCase")
    }
    return { executeUpgradeFirewareUseCase }
}

/**
 * export bluetooth usecase.
 */
export default UpgradeFirewareUseCase