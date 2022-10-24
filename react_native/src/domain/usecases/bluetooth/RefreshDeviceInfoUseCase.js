import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const RefreshDeviceInfoUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeRefreshDeviceInfoUseCase = () => {

    }

    /**
     * print error log delivered from bluetooth repository.
     * @param {string} error 
     */
    outputErrorLog = (error) => {
        logError(LOG_TAG, error)
    }

    return { executeRefreshDeviceInfoUseCase }
}

/**
 * export bluetooth usecase.
 */
export default RefreshDeviceInfoUseCase