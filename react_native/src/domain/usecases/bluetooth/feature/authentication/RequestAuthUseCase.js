import Constants from '../../../../../utils/Constants.js'
import { logDebugWithLine, outputErrorLog } from '../../../../../utils/logger/Logger.js'
import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import RequestMessage from '../../../../../data/repositories/ble/message/RequestMessage.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RequestAuthUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic message.
     */
    const { sendBleCustomMessage } = BleRepository()

    /**
     * create messages for authentication.
     */
    const { getAuthenticateMessageBytes } = RequestMessage()

    /**
     * execute usecase of requesting authentication to device.
     */
    executeRequestAuthUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute RequestAuthUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(getAuthenticateMessageBytes()).then(() => {
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