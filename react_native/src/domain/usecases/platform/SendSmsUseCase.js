import PlatformRepository from '../../../data/repositories/platform/PlatformRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const SendSmsUseCase = () => {

    const { sendSms, sendDirectSms } = PlatformRepository

    /**
     * send sms.
     * @param {boolean} directSms
     * @param {string} receiverPhoneNumber
     * @param {string} message
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

export default SendSmsUseCase