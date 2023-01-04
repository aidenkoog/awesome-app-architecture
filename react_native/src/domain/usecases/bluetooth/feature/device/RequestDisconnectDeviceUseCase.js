import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import RequestMessage from '../../../../../data/repositories/ble/message/RequestMessage.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestDisconnectDeviceUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic data.
     */
    const { sendBleCustomMessage } = BleRepository()

    /**
     * create messages for authentication.
     */
    const { getDisconnectMessageBytes } = RequestMessage()

    /**
     * execute usecase of disconnecting device.
     */
    executeDisconnectDeviceUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute DisconnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(getDisconnectMessageBytes()).then(() => {
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by sendBleCustomMessage")
                reject(e)
            })
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