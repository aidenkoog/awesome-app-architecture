import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const GetManufacturerUseCase = () => {

    executeGetManufacturerUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetManufacturerUseCase")
    }
    return { executeGetManufacturerUseCase }
}

export default GetManufacturerUseCase