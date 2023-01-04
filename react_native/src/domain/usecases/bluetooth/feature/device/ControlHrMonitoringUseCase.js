import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'
import RequestMessage from '../../../../../data/repositories/ble/message/RequestMessage.js'

const ControlHrMonitoringUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic data.
     */
    const { sendBleCustomMessage } = BleRepository()

    /**
     * create messages for authentication.
     */
    const { getAuthenticateMessageBytes } = RequestMessage()

    /**
     * execute usecase of turning ON HR monitoring.
     */
    executeTurnOnHrMonitoring = () => {
        logDebugWithLine(LOG_TAG, "execute TurnOnHrMonitoring")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(getAuthenticateMessageBytes()).then(() => {
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by sendBleCustomMessage")
                reject(e)
            })
        })
    }

    /**
     * execute usecase of turning OFF HR monitoring.
     */
    executeTurnOffHrMonitoring = () => {
        logDebugWithLine(LOG_TAG, "execute TurnOffHrMonitoring")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(getAuthenticateMessageBytes()).then(() => {
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by sendBleCustomMessage")
                reject(e)
            })
        })
    }

    return {
        executeTurnOnHrMonitoring,
        executeTurnOffHrMonitoring
    }
}

/**
 * export bluetooth usecase.
 */
export default ControlHrMonitoringUseCase