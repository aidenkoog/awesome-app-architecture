import Constants from '../../../utils/Constants'
import { logDebug, logDebugWithLine } from '../../../utils/logger/Logger'
import packageInfo from '../../../../package.json'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG
const APP_VERSION = packageInfo.version

const GetAppVersionUseCase = () => {

    /**
     * get app version.
     * @return {string}
     */
    const executeGetAppVersionUseCase = (): string => {
        logDebugWithLine(LOG_TAG, "execute executeGetAppVersionUseCase")

        logDebug(LOG_TAG, `app version: ${APP_VERSION}`)
        return APP_VERSION
    }
    return { executeGetAppVersionUseCase }
}

export default GetAppVersionUseCase