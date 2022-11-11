import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetManufacturerUseCase = () => {

    executeGetManufacturerUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetManufacturerUseCase")
    }
    return { executeGetManufacturerUseCase }
}

export default GetManufacturerUseCase