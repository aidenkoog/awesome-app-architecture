import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'

const bluetoothRepository = require('../../../data/repositories/BluetoothRepository.js').default
const LOG_TAG = Constants.LOG.BT_USECASE_LOG

class DisableNotificationUseCase {

    /**
     * Execute the use case of disabling notifications. 
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     * @returns {Promise}
     */
    execute(peripheralId, serviceUuid, characteristicUuid) {
        return new Promise((fulfill, reject) => {
            bluetoothRepository.disableNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
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
    outputErrorLog(error) {
        logError(LOG_TAG, error)
    }
}

/**
 * export bluetooth usecase.
 */
export default new DisableNotificationUseCase()