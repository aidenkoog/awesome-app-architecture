import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const UpgradeFirewareUseCase = () => {

    executeUpgradeFirewareUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeUpgradeFirewareUseCase")

        return new Promise((fulfill, reject) => {

        })
    }
    return { executeUpgradeFirewareUseCase }
}

export default UpgradeFirewareUseCase