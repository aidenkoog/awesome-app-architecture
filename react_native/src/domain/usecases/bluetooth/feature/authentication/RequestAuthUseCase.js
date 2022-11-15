import Constants from '../../../../../utils/Constants.js'
import { logDebug, logDebugWithLine, outputErrorLog } from '../../../../../utils/logger/Logger.js'
import { stringToBytes } from "convert-string"
import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import RequestMessage from '../../../../../data/repositories/ble/message/RequestMessage.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestAuthUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic message.
     */
    const { sendBleCustomMessage } = BleRepository()

    const { getAuthenticateMessage } = RequestMessage()

    /**
     * execute usecase of requesting authentication to device.
     */
    executeRequestAuthUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute RequestAuthUseCase")

        logDebug(LOG_TAG, ">>> authentication message: " + getAuthenticateMessage())

        return new Promise((fulfill, reject) => {
            const customMessage = stringToBytes("\x00" + "\x06" + "\x00" + "DFDFDF")
            sendBleCustomMessage(customMessage).then(() => {
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by sendBleCustomMessage")
                reject(e)
            })
        })
    }

    return { executeRequestAuthUseCase }
}

export default RequestAuthUseCase