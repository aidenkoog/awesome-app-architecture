import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SendBleCustomDataUseCase = () => {

    const { sendBleCustomLog } = BleRepository()

    /**
     * Execute usecase of sending log message to device.
     * @param {string} logMessage
     * @return {Promise}
     */
    const executeSendBleCustomDataUseCase = (logMessage: string): Promise<void> => {
        logDebugWithLine(LOG_TAG, "execute SendBleCustomDataUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomLog(logMessage).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute sendBleCustomData")
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeSendBleCustomDataUseCase }
}

export default SendBleCustomDataUseCase