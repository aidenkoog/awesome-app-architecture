/**
 * detailed bluetooth usecase.
 * currently, it's not used.
 */

import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
import BleRepository from '../../../../data/repositories/ble/BleRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 */
const StopScanUseCase = () => {

    const { stopScan } = BleRepository()

    /**
     * Execute the use case of stopping the device scan. 
     * @returns {Promise}
     */
    executeStopScanUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeStopScanUseCase")

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

/**
 * export bluetooth usecase.
 */
export default StopScanUseCase