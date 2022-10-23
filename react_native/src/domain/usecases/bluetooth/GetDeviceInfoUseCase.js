import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'

const bluetoothRepository = require('../../../data/repositories/BluetoothRepository.js').default
const LOG_TAG = Constants.LOG.BT_USECASE_LOG

class GetDeviceInfoUseCase {

    /**
     * Execute the use case. 
     */
    execute() {
        
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
export default new GetDeviceInfoUseCase()