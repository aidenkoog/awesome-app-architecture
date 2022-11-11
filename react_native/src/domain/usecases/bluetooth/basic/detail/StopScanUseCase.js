import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog, logDebugWithLine } from '../../../utils/Logger.js'
import BleRepository from '../../../../data/repositories/ble/BleRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const StopScanUseCase = () => {

    const { stopScan } = BleRepository()

    /**
     * Execute the use case of stopping the device scan. 
     * @returns {Promise}
     */
    executeStopScanUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute StopScanUseCase")

        return new Promise((fulfill, reject) => {
            stopScan().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute stopScan")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeStopScanUseCase }
}

export default StopScanUseCase