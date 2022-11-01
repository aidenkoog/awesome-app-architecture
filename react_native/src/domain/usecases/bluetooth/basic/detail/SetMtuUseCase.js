import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'
import Constants from '../../../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SetMtuUseCase = () => {

    const { setMtu } = BleRepository()

    /**
     * execute the use case of setting mtu. 
     * @param {string} peripheralId
     * @param {number} mtu 
     * @returns {Promise}
     */
    executeSetMtuUseCase = (peripheralId, mtu) => {
        logDebug(LOG_TAG, ">>> ### triggered executeStartScanUseCase")

        return new Promise((fulfill, reject) => {
            setMtu(peripheralId, mtu).then(() => {
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