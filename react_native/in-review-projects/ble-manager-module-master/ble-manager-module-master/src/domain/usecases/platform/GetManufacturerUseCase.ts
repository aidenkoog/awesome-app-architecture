import Constants from '../../../utils/Constants'
import { logDebugWithLine } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetManufacturerUseCase = () => {

    const executeGetManufacturerUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetManufacturerUseCase")
    }
    return { executeGetManufacturerUseCase }
}

export default GetManufacturerUseCase