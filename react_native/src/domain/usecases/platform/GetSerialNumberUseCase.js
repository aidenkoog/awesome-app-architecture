import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetSerialNumberUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetSerialNumberUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeGetSerialNumberUseCase")
    }
    return { executeGetSerialNumberUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetSerialNumberUseCase