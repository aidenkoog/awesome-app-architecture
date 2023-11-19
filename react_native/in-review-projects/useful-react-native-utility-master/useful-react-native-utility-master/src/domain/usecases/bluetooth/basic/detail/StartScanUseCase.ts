import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const StartScanUseCase = () => {

    const { startScan } = BleRepository()

    /**
     * Execute the use case of starting the device scan. 
     * @param {string} serviceUuid 
     * @param {number} duration 
     * @return {Promise}
     */
    const executeStartScanUseCase = (serviceUuid: string, duration: number): Promise<void> => {
        logDebugWithLine(LOG_TAG, "execute StartScanUseCase")

        return new Promise((fulfill, reject) => {
            startScan(serviceUuid, duration).then(() => {
                logDebug(LOG_TAG, `<<< succeeded to execute startScan with ${serviceUuid} for ${duration}seconds`)
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeStartScanUseCase }
}

export default StartScanUseCase