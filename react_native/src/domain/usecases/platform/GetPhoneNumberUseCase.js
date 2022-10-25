import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetPhoneNumberUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeGetPhoneNumberUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeGetPhoneNumberUseCase")
    }
    return { executeGetPhoneNumberUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetPhoneNumberUseCase