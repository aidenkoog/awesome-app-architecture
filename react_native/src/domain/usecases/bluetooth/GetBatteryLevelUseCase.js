import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import { BATTERY_CHARACTERISTIC_UUID, BATTERY_SERVICE_UUID } from '../../../utils/Config.js'

const bluetoothRepository = require('../../../data/repositories/BluetoothRepository.js').default
const LOG_TAG = Constants.LOG.BT_USECASE_LOG

class GetBatteryLevelUseCase {

    /**
     * Execute the use case of getting ble device's battery level.
     * @param {string} peripheralId 
     * @param {string} batteryserviceUuid 
     * @param {string} batterycharacteristicUuid 
     * @returns {Promise}
     */
    execute(peripheralId, batteryserviceUuid, batterycharacteristicUuid) {
        return new Promise((fulfill, reject) => {
            bluetoothRepository.getBatteryLevel(
                peripheralId, BATTERY_SERVICE_UUID, BATTERY_CHARACTERISTIC_UUID).then((batteryLevel) => {
                    logDebug(LOG_TAG, "succeeded to execute getBatteryLevel " + batteryLevel)
                    fulfill(batteryLevel)
                }).catch((e) => {
                    this.outputErrorLog(e)
                    reject(e)
                })
        })
    }

    /**
     * print error log delivered from bluetooth repository.
     * @param {string} error 
     */
    outputErrorLog(error) {
        logError(LOG_TAG, error)
    }
}

/**
 * export bluetooth usecase.
 */
export default new GetBatteryLevelUseCase()