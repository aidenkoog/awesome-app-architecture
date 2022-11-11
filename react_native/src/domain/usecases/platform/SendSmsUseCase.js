import PlatformRepository from '../../../data/repositories/platform/PlatformRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'


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
        logDebugWithLine(LOG_TAG, "execute SendSmsUseCase")
        if (directSms) {
            sendDirectSms(receiverPhoneNumber, message)
        } else {
            sendSms(receiverPhoneNumber, message)
        }
    }
    return { executeSendSmsUseCase }
}

export default SendSmsUseCase