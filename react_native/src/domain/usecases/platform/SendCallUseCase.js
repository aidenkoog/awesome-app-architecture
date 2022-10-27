import PlatformRepository from '../../../data/repositories/platform/PlatformRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 */
const SendCallUseCase = () => {

    const { sendCall, sendDirectCall } = PlatformRepository()

    /**
     * Execute the use case. 
     */
    executeSendCallUseCase = (directCall) => {
        logDebug(LOG_TAG, ">>> ### triggered executeSendCallUseCase")
        if (directCall) {
            sendDirectCall()
        } else {
            sendCall()
        }
    }
    return { executeSendCallUseCase }
}

/**
 * export bluetooth usecase.
 */
export default SendCallUseCase