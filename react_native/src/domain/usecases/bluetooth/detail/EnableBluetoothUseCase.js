import Constants from '../../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../../utils/logger/Logger.js'
import BleRepository from '../../../../data/repositories/ble/BleRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const EnableBluetoothUseCase = () => {

    const { enableBluetooth } = BleRepository()

    /**
     * Execute the use case of connecting devices. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeEnableBluetoothUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeEnableBluetoothUseCase")

        return new Promise((fulfill, reject) => {
            enableBluetooth().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute enableBluetooth")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeEnableBluetoothUseCase }
}

export default EnableBluetoothUseCase