import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const EnableNotificationUseCase = () => {

    const { enableNotification } = BleRepository()

    /**
     * Execute the use case of enabling notifications.
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     * @return {Promise}
     */
    const executeEnableNotificationUseCase = (
        peripheralId: string,
        serviceUuid: string,
        characteristicUuid: string): Promise<void> => {

        logDebugWithLine(LOG_TAG, "execute EnableNotificationUseCase")

        return new Promise((fulfill, reject) => {
            enableNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, `<<< succeeded to execute disconnectDevice ${peripheralId}`)
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeEnableNotificationUseCase }
}

export default EnableNotificationUseCase