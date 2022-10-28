import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger.js'
import { BATTERY_CHARACTERISTIC_UUID, BATTERY_SERVICE_UUID } from '../../../utils/ble/BleConfig.js'
import BleRepository from '../../../data/repositories/ble/BleRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetBatteryLevelUseCase = () => {

    const { getBatteryLevel } = BleRepository()

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

        logDebug(LOG_TAG, ">>> ### triggered executeGetBatteryLevelUseCase")

        return new Promise((fulfill, reject) => {
            getBatteryLevel(
                peripheralId, batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
                    logDebug(LOG_TAG, "<<< succeeded to execute getBatteryLevel " + batteryLevel)
                    fulfill(batteryLevel)

                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e)
                    reject(e)
                })
        })
    }
    return { executeGetBatteryLevelUseCase }
}

export default GetBatteryLevelUseCase