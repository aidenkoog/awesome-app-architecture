import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const DisableNotificationUseCase = () => {

    const { disableNotification } = BleRepository()

    /**
     * Execute the use case of disabling notifications. 
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     * @return {Promise}
     */
    const executeDisableNotificationUseCase = (
        peripheralId: string,
        serviceUuid: string,
        characteristicUuid: string): Promise<void> => {

        logDebugWithLine(LOG_TAG, "execute DisableNotificationUseCase")

        return new Promise((fulfill, reject) => {
            disableNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, `<<< succeeded to execute disableNotification ${characteristicUuid}`)
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeDisableNotificationUseCase }
}

export default DisableNotificationUseCase