import Constants from '../../../utils/Constants.js'
import { logDebugWithLine, outputErrorLog } from '../../../utils/logger/Logger.js'
import { storeIsDeviceRegistered } from '../../../utils/storage/StorageUtil.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const SetDeviceRegistrationUseCase = () => {

    /**
     * execute usecase of setting device registration.
     * @param {boolean} registered
     * @param {callback} onResult
     */
    executeSetDeviceRegistrationUseCase = (registered) => {
        logDebugWithLine(LOG_TAG, "execute SetDeviceRegistrationUseCase with " + registered)

        return new Promise((fulfill, reject) => {
            storeIsDeviceRegistered(registered).then(() => {
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by storeIsDeviceRegistered")
                reject(e)
            })
        })
    }
    return { executeSetDeviceRegistrationUseCase }
}

export default SetDeviceRegistrationUseCase