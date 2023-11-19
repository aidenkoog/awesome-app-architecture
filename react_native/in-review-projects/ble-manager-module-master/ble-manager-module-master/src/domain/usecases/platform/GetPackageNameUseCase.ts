import Constants from '../../../utils/Constants'
import { logDebugWithLine } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetPackageNameUseCase = () => {

    const executeGetPackageNameUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetPackageNameUseCase")
    }
    return { executeGetPackageNameUseCase }
}

export default GetPackageNameUseCase