import Constants from '../../../utils/Constants.js'
import { logDebug, logError, outputErrorLog } from '../../../utils/Logger.js'
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
        logDebug(LOG_TAG, ">>> triggered executeDisableNotificationUseCase")

        return new Promise((fulfill, reject) => {
            disableNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute disableNotification " + characteristicUuid)
                fulfill()

            }).catch((e) => {
                outputErrorLog(e)
                reject(e)
            })
        })
    }
    return { executeDisableNotificationUseCase }
}

/**
 * export bluetooth usecase.
 */
export default DisableNotificationUseCase