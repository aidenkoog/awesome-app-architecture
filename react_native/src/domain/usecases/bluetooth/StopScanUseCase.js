import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const StopScanUseCase = () => {

    /**
     * Execute the use case of stopping the device scan. 
     * @returns {Promise}
     */
    executeStopScanUseCase = () => {
        logDebug(LOG_TAG, ">>> triggered executeStopScanUseCase")

        return new Promise((fulfill, reject) => {
            bluetoothRepository.stopScan().then(() => {
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

/**
 * export bluetooth usecase.
 */
export default StopScanUseCase