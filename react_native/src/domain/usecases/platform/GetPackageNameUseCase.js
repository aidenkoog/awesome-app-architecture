import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetPackageNameUseCase = () => {

    executeGetPackageNameUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetPackageNameUseCase")
    }
    return { executeGetPackageNameUseCase }
}

export default GetPackageNameUseCase