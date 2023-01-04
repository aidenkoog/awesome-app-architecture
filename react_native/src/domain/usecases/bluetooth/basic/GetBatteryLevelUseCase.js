import Constants from '../../../../utils/Constants.js'
import { logDebug, outputErrorLog, logDebugWithLine } from '../../../../utils/logger/Logger.js'
import { BATTERY_CHARACTERISTIC_UUID, BATTERY_SERVICE_UUID } from '../../../../utils/ble/BleConfig.js'
import BleRepository from '../../../../data/repositories/ble/BleRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetBatteryLevelUseCase = () => {

    /**
     * ble repository's function that read battery value using reading characteristic.
     */
    const { getBatteryLevel } = BleRepository()

    /**
     * Execute the use case of getting ble device's battery level.
     * @param {string} batteryserviceUuid
     * @param {string} batterycharacteristicUuid 
     * @returns {Promise}
     */
    executeGetBatteryLevelUseCase = (
        batteryserviceUuid = BATTERY_SERVICE_UUID,
        batterycharacteristicUuid = BATTERY_CHARACTERISTIC_UUID) => {

        logDebugWithLine(LOG_TAG, "execute GetBatteryLevelUseCase")

        return new Promise((fulfill, reject) => {
            getBatteryLevel(
                batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
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