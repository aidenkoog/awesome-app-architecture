import PlatformRepository from '../../../data/repositories/platform/PlatformRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetPhoneNumberUseCase = () => {

    const { getMyPhoneNumber } = PlatformRepository()

    executeGetPhoneNumberUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetPhoneNumberUseCase")
        getMyPhoneNumber()
    }
    return { executeGetPhoneNumberUseCase }
}

export default GetPhoneNumberUseCase