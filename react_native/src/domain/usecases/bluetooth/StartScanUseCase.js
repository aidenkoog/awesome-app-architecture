import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'

const bluetoothRepository = require('../../../data/repositories/BluetoothRepository.js').default
const LOG_TAG = Constants.LOG.BT_USECASE_LOG

class StartScanUseCase {

    /**
     * Execute the use case of starting the device scan. 
     * @param {string} serviceUuid 
     * @param {number} duration 
     * @returns {Promise}
     */
    execute(serviceUuid, duration) {
        return new Promise((fulfill, reject) => {
            bluetoothRepository.startScan(serviceUuid, duration).then(() => {
                logDebug(LOG_TAG, "succeeded to execute startScan with " + serviceUuid + " for " + duration + "seconds")
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
export default new StartScanUseCase()