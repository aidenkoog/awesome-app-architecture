import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'

const bluetoothRepository = require('../../../data/repositories/BluetoothRepository.js').default
const LOG_TAG = Constants.LOG.BT_USECASE_LOG

class DisconnectDeviceUseCase {

    /**
     * Execute the use case of disconnecting devices. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    execute(peripheralId) {
        return new Promise((fulfill, reject) => {
            bluetoothRepository.disconnectDevice(peripheralId).then(() => {
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
    outputErrorLog(error) {
        logError(LOG_TAG, error)
    }
}

/**
 * export bluetooth usecase.
 */
export default new DisconnectDeviceUseCase()