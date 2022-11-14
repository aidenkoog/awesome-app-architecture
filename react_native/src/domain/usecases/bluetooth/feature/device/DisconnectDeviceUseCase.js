import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'
import { stringToBytes } from "convert-string"
import Constants from '../../../../../utils/Constants.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

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

        const customMessage = stringToBytes("\x00" + "\x06" + "\x00" + "DFDFDF")
        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(customMessage)
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