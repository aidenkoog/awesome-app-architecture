import Constants from '../../../utils/Constants.js'
import { logDebugWithLine, outputErrorLog } from '../../../utils/logger/Logger.js'
import { getIsDeviceRegistered } from '../../../utils/storage/StorageUtil.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetDeviceRegistrationUseCase = () => {

    /**
     * execute usecase of getting device registration.
     * @param {Promise}
     */
    executeGetDeviceRegistrationUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetDeviceRegistrationUseCase")

        return new Promise((fulfill, reject) => {
            getIsDeviceRegistered().then((registered) => {
                fulfill(registered)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by getIsDeviceRegistered")
                reject(e)
            })
        })
    }
    return { executeGetDeviceRegistrationUseCase }
}

export default GetDeviceRegistrationUseCase