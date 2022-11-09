import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebug } from '../../../../../utils/logger/Logger.js'
import { ACTION_SYNC } from '../../action/BleActions.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SyncDeviceInfoUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic data.
     */
    const { sendBleCustomValue } = BleRepository()

    /**
     * Execute the use case. 
     */
    executeSyncDeviceInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeSyncDeviceInfoUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomValue(ACTION_SYNC)
                .then(() => fulfill())
                .catch((e) => reject(e))
        })
    }

    return {
        executeSyncDeviceInfoUseCase
    }
}

/**
 * export bluetooth usecase.
 */
export default SyncDeviceInfoUseCase