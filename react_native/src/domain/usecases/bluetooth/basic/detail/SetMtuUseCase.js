import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebug, outputErrorLog, logDebugWithLine } from '../../../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SetMtuUseCase = () => {

    const { requestMTU } = BleRepository()

    /**
     * execute the use case of setting mtu. 
     * @param {string} peripheralId
     * @param {number} mtu 
     * @returns {Promise}
     */
    executeSetMtuUseCase = (peripheralId, mtu) => {
        logDebugWithLine(LOG_TAG, "execute StartScanUseCase")

        return new Promise((fulfill, reject) => {
            requestMTU(peripheralId, mtu).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to set mtu with " + mtu + "(mtu) for " + peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeSetMtuUseCase }
}

export default SetMtuUseCase