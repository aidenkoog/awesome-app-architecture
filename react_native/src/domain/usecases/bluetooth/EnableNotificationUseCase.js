import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const EnableNotificationUseCase = () => {

    const { enableNotification } = BluetoothRepository()

    /**
     * Execute the use case of enabling notifications.
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     * @returns {Promise}
     */
    executeEnableNotificationUseCase = (peripheralId, serviceUuid, characteristicUuid) => {
        return new Promise((fulfill, reject) => {
            enableNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "succeeded to execute disconnectDevice " + peripheralId)
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

    return { executeEnableNotificationUseCase }
}

/**
 * export bluetooth usecase.
 */
export default EnableNotificationUseCase