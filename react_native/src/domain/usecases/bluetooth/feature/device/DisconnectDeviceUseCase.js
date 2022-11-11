import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import { ACTION_DISCONNECT } from '../../action/BleActions.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'

const RequestDisconnectDeviceUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic data.
     */
    const { sendBleCustomMessage } = BleRepository()

    /**
     * execute usecase of disconnecting device.
     */
    executeDisconnectDeviceUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute DisconnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(ACTION_DISCONNECT)
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