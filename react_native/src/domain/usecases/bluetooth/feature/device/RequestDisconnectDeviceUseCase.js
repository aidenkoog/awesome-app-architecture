import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'

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

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage("").then(() => {
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