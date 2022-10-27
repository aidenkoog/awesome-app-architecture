import PlatformRepository from '../../../data/repositories/platform/PlatformRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 */
const SendSmsUseCase = () => {

    const { sendSms, sendDirectSms } = PlatformRepository

    /**
     * Execute the use case. 
     */
    executeSendSmsUseCase = (directSms, receiverPhoneNumber, message = "") => {
        logDebug(LOG_TAG, ">>> ### triggered executeSendSmsUseCase")
        if (directSms) {
            sendDirectSms(receiverPhoneNumber, message)
        } else {
            sendSms(receiverPhoneNumber, message)
        }
    }
    return { executeSendSmsUseCase }
}

/**
 * export bluetooth usecase.
 */
export default SendSmsUseCase