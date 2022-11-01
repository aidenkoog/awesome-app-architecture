import PlatformRepository from '../../../data/repositories/platform/PlatformRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetPhoneInfoUseCase = () => {

    const { getMyPhoneNumber } = PlatformRepository()

    /**
     * execute usecase of getting my phone number information.
     * @returns {Promise}
     */
    executeGetPhoneNumberUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetPhoneNumberUseCase")

        return new Promise((fulfill, reject) => {
            getMyPhoneNumber().then((phoneNumber) => {
                fulfill(phoneNumber)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by getMyPhoneNumber !!!")
                reject(e)
            })
        })
    }
    return { executeGetPhoneNumberUseCase }
}

export default GetPhoneInfoUseCase