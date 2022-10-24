import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'
import { BATTERY_CHARACTERISTIC_UUID, BATTERY_SERVICE_UUID } from '../../../utils/Config.js'
import BluetoothRepository from '../../../data/repositories/BluetoothRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetBatteryLevelUseCase = () => {

    const { getBatteryLevel } = BluetoothRepository()

    /**
     * Execute the use case of getting ble device's battery level.
     * @param {string} peripheralId 
     * @param {string} batteryserviceUuid
     * @param {string} batterycharacteristicUuid 
     * @returns {Promise}
     */
    executeGetBatteryLevelUseCase = (
        peripheralId,
        batteryserviceUuid = BATTERY_SERVICE_UUID,
        batterycharacteristicUuid = BATTERY_CHARACTERISTIC_UUID) => {
        return new Promise((fulfill, reject) => {
            getBatteryLevel(
                peripheralId, batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
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
    outputErrorLog = (error) => {
        logError(LOG_TAG, error)
    }

    return { executeGetBatteryLevelUseCase }
}

/**
 * export bluetooth usecase.
 */
export default GetBatteryLevelUseCase