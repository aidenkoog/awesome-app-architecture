import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const SendTextMessageUseCase = () => {

    /**
     * Execute the use case. 
     */
    executeSendTextMessageUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeSendTextMessageUseCase")
    }
    return { executeSendTextMessageUseCase }
}

/**
 * export bluetooth usecase.
 */
export default SendTextMessageUseCase