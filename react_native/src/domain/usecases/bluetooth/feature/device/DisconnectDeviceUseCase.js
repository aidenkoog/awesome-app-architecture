import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import { ACTION_DISCONNECT } from '../../action/BleActions.js'

const RequestDisconnectDeviceUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic data.
     */
    const { sendBleCustomValue } = BleRepository()

    /**
     * execute usecase of disconnecting device.
     */
    executeDisconnectDeviceUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeDisconnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomValue(ACTION_DISCONNECT)
                .then(() => fulfill())
                .catch((e) => reject(e))
        })
    }

    return {
        executeDisconnectDeviceUseCase,
    }
}

/**
 * export bluetooth usecase.
 */
export default RequestDisconnectDeviceUseCase