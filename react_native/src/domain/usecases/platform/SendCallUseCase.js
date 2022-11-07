import PlatformRepository from '../../../data/repositories/platform/PlatformRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const SendCallUseCase = () => {

    const { sendCall, sendDirectCall } = PlatformRepository()

    /**
     * send phone call
     * @param {boolean} directCall
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

export default SendCallUseCase