import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import { ACTION_DISCONNECT } from '../../action/BleActions.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'

const ControlHrMonitoringUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic data.
     */
    const { sendBleCustomMessage } = BleRepository()

    /**
     * execute usecase of turning ON HR monitoring.
     */
    executeTurnOnHrMonitoring = () => {
        logDebugWithLine(LOG_TAG, "execute TurnOnHrMonitoring")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(ACTION_DISCONNECT)
                .then(() => fulfill())
                .catch((e) => reject(e))
        })
    }

    /**
     * execute usecase of turning OFF HR monitoring.
     */
    executeTurnOffHrMonitoring = () => {
        logDebugWithLine(LOG_TAG, "execute TurnOffHrMonitoring")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(ACTION_DISCONNECT)
                .then(() => fulfill())
                .catch((e) => reject(e))
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