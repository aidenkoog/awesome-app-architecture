import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetUuidListUseCase = () => {

    /**
     * Execute the use case of getting uuid list. 
     * @param {any} peripheral 
     * @return {any}
     */
    const executeGetUuidListUseCase = (peripheral: any): any => {
        logDebugWithLine(LOG_TAG, "execute GetUuidListUseCase")
        logDebug(LOG_TAG, `peripheral:  ${peripheral}`)
        return null
    }
    return { executeGetUuidListUseCase }
}

export default GetUuidListUseCase