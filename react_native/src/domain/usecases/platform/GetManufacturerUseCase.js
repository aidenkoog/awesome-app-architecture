import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetManufacturerUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetManufacturerUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetManufacturerUseCase")
    }
    return { executeGetManufacturerUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetManufacturerUseCase