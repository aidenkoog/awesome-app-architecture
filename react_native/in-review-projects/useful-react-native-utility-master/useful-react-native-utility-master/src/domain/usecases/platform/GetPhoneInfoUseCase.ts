import PlatformRepository from '../../../data/repositories/platform/PlatformRepository'
import Constants from '../../../utils/Constants'
import { logDebugWithLine, outputErrorLog } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetPhoneInfoUseCase = () => {

    const { getMyPhoneNumber } = PlatformRepository()

    /**
     * execute usecase of getting my phone number information.
     * @return {Promise}
     */
    const executeGetPhoneNumberUseCase = (): Promise<any> => {
        logDebugWithLine(LOG_TAG, "execute GetPhoneNumberUseCase")

        return new Promise((fulfill, reject) => {
            getMyPhoneNumber().then((phoneNumber: any) => {
                fulfill(phoneNumber)

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e + " occurred by getMyPhoneNumber")
                reject(e)
            })
        })
    }
    return { executeGetPhoneNumberUseCase }
}

export default GetPhoneInfoUseCase