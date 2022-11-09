import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SendBleCustomDataUseCase = () => {

    const { sendBleCustomLog } = BleRepository()

    /**
     * Execute usecase of sending log message to device.
     * @param {string} logMessage
     * @returns {Promise}
     */
    executeSendBleCustomDataUseCase = (logMessage) => {
        logDebug(LOG_TAG, ">>> ### triggered executeSendBleCustomDataUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomLog(logMessage).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute sendBleCustomData")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeSendBleCustomDataUseCase }
}

export default SendBleCustomDataUseCase