import Constants from '../../../../utils/Constants'
import { logDebug, outputErrorLog, logDebugWithLine } from '../../../../utils/logger/Logger'
import { BATTERY_CHARACTERISTIC_UUID, BATTERY_SERVICE_UUID } from '../../../../utils/ble/BleConfig'
import BleRepository from '../../../../data/repositories/ble/BleRepository'

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
     * @return {Promise}
     */
    const executeGetBatteryLevelUseCase = (
        batteryserviceUuid: string = BATTERY_SERVICE_UUID,
        batterycharacteristicUuid: string = BATTERY_CHARACTERISTIC_UUID): Promise<any> => {

        logDebugWithLine(LOG_TAG, "execute GetBatteryLevelUseCase")

        return new Promise((fulfill, reject) => {
            getBatteryLevel(
                batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel: any) => {
                    logDebug(LOG_TAG, `<<< succeeded to execute getBatteryLevel ${batteryLevel}`)
                    fulfill(batteryLevel)

                }).catch((e: any) => {
                    outputErrorLog(LOG_TAG, e)
                    reject(e)
                })
        })
    }
    return { executeGetBatteryLevelUseCase }
}

export default GetBatteryLevelUseCase