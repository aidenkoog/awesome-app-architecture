import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const ExecuteBleModuleUseCase = () => {

    const { initializeBleModule } = BleRepository()

    /**
     * Execute the use case of initializing ble module. 
     * @return {Promise}
     */
    const executeBleModuleUseCase = (): Promise<void> => {
        logDebugWithLine(LOG_TAG, "execute BleModuleUseCase")

        return new Promise((fulfill, reject) => {
            initializeBleModule().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute initializeBleModule")
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeBleModuleUseCase }
}

export default ExecuteBleModuleUseCase