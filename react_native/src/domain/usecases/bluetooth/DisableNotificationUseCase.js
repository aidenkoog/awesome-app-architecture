import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const DisableNotificationUseCase = () => {

    const { disableNotification } = BluetoothRepository()

    /**
     * Execute the use case of disabling notifications. 
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     * @returns {Promise}
     */
    executeDisableNotificationUseCase = (peripheralId, serviceUuid, characteristicUuid) => {
        return new Promise((fulfill, reject) => {
            disableNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "succeeded to execute disableNotification " + characteristicUuid)
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * print error log delivered from bluetooth repository.
     * @param {string} error 
     */
    outputErrorLog = (error) => {
        logError(LOG_TAG, error)
    }

    return { executeDisableNotificationUseCase }
}

/**
 * export bluetooth usecase.
 */
export default DisableNotificationUseCase