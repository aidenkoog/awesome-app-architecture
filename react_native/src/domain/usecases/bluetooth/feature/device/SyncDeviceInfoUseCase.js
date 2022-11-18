import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'
import RequestMessage from '../../../../../data/repositories/ble/message/RequestMessage.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SyncDeviceInfoUseCase = () => {

    const { sendBleCustomMessage } = BleRepository()

    /**
     * create messages for authentication.
     */
    const { getSyncMessageBytes } = RequestMessage()

    /**
     * execute usecase of syncing device information. 
     */
    executeSyncDeviceInfoUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute SyncDeviceInfoUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(getSyncMessageBytes()).then(() => {
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by sendBleCustomMessage")
                reject(e)
            })
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