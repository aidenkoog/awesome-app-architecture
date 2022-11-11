import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import { logDebug, outputErrorLog, logDebugWithLine } from "../../../../../utils/logger/Logger"
import Constants from "../../../../../utils/Constants"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const StartScanUseCase = () => {

    const { startScan } = BleRepository()

    /**
     * Execute the use case of starting the device scan. 
     * @param {string} serviceUuid 
     * @param {number} duration 
     * @returns {Promise}
     */
    executeStartScanUseCase = (serviceUuid, duration) => {
        logDebugWithLine(LOG_TAG, "execute StartScanUseCase")

        return new Promise((fulfill, reject) => {
            startScan(serviceUuid, duration).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute startScan with " + serviceUuid + " for " + duration + "seconds")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeStartScanUseCase }
}

export default StartScanUseCase