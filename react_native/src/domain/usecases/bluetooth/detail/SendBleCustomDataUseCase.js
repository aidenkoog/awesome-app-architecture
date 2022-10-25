/**
 * detailed bluetooth usecase.
 * currently, it's not used.
 */

import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
import BleRepository from '../../../data/repositories/ble/BleRepository'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SendBleCustomDataUseCase = () => {

    const { sendBleCustomData } = BleRepository()

    /**
     * Execute the use case. 
     */
    executeSendBleCustomDataUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeSendBleCustomDataUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomData().then(() => {
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

/**
 * export bluetooth usecase.
 */
export default SendBleCustomDataUseCase