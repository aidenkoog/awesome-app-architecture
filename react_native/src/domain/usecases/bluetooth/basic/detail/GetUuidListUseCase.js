import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetUuidListUseCase = () => {

    const { getUuidList } = BleRepository

    /**
     * Execute the use case of getting uuid list. 
     * @param {Any} peripheral 
     * @returns {Any}
     */
    executeGetUuidListUseCase = (peripheral) => {
        logDebugWithLine(LOG_TAG, "execute GetUuidListUseCase")

        const uuidList = getUuidList(peripheral)
        logDebug(LOG_TAG, "<<< succeeded to execute getUuidList: " + uuidList)
        return uuidList
    }
    return { executeGetUuidListUseCase }
}

export default GetUuidListUseCase