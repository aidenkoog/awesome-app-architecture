import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetPackageNameUseCase = () => {

    executeGetPackageNameUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetPackageNameUseCase")
    }
    return { executeGetPackageNameUseCase }
}

export default GetPackageNameUseCase