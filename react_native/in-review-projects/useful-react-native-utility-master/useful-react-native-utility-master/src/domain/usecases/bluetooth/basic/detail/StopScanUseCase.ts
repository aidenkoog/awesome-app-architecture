import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const StopScanUseCase = () => {

    const { stopScan } = BleRepository()

    /**
     * Execute the use case of stopping the device scan. 
     * @return {Promise}
     */
    const executeStopScanUseCase = (): Promise<void> => {
        logDebugWithLine(LOG_TAG, "execute StopScanUseCase")

        return new Promise((fulfill, reject) => {
            stopScan().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute stopScan")
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeStopScanUseCase }
}

export default StopScanUseCase