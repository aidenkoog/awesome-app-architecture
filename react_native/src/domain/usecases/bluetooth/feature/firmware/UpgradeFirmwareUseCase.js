import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'
import { ACTION_UPGRADE_FIRMWARE } from '../../action/BleActions.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const UpgradeFirewareUseCase = () => {

    executeUpgradeFirewareUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeUpgradeFirewareUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomValue(ACTION_UPGRADE_FIRMWARE)
                .then(() => fulfill())
                .catch((e) => reject(e))
        })
    }
    return { executeUpgradeFirewareUseCase }
}

export default UpgradeFirewareUseCase