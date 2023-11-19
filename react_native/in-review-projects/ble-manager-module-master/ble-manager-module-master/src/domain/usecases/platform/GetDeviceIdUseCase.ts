import PlatformRepository from '../../../data/repositories/platform/PlatformRepository'
import Constants from '../../../utils/Constants'
import { logDebugWithLine, outputErrorLog } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetDeviceIdUseCase = () => {

    const { getInstanceId, getAndroidId, getUniqueId } = PlatformRepository()

    /**
     * execute usecase of getting instance id.
     * @return {Promise}
     */
    const executeGetInstanceIdUseCase = (): Promise<any> => {
        logDebugWithLine(LOG_TAG, "execute GetInstanceIdUseCase")

        return new Promise((fulfill, reject) => {
            getInstanceId().then((instanceId: any) => {
                fulfill(instanceId)

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e + " occurred by getInstanceId")
                reject(e)
            })
        })
    }

    /**
     * execute usecase of getting android id.
     * @return {Promise}
     */
    const executeGetAndroidIdUseCase = (): Promise<any> => {
        logDebugWithLine(LOG_TAG, "execute GetAndroidIdUseCase")

        return new Promise((fulfill, reject) => {
            getAndroidId().then((androidId: any) => {
                fulfill(androidId)

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e + " occurred by getAndroidId")
                reject(e)
            })
        })
    }

    /**
     * execute usecase of getting unique id.
     * @return {Promise}
     */
    const executeGetUniqueIdUseCase = (): Promise<any> => {
        logDebugWithLine(LOG_TAG, "execute GetUniqueIdUseCase")

        return new Promise((fulfill, reject) => {
            getUniqueId().then((instanceId: any) => {
                fulfill(instanceId)

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e + " occurred by getUniqueId")
                reject(e)
            })
        })
    }
    return {
        executeGetInstanceIdUseCase,
        executeGetAndroidIdUseCase,
        executeGetUniqueIdUseCase
    }
}

export default GetDeviceIdUseCase