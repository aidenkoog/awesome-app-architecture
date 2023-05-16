import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'
import { ACTION_UPGRADE_FIRMWARE } from '../../action/BleActions.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const UpgradeFirewareUseCase = () => {

    const { sendBleCustomMessage } = BleRepository()

    executeUpgradeFirewareUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute UpgradeFirewareUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(ACTION_UPGRADE_FIRMWARE)
                .then(() => fulfill())
                .catch((e) => reject(e))
        })
    }
    return { executeUpgradeFirewareUseCase }
}

export default UpgradeFirewareUseCase