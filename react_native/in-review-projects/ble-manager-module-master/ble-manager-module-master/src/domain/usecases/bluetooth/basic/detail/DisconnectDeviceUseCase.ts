import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const DisconnectDeviceUseCase = () => {

    const { disconnectDevice } = BleRepository()

    /**
     * Execute the use case of disconnecting devices. 
     * @param {string} peripheralId 
     * @return {Promise}
     */
    const executeDisconnectDeviceUseCase = (peripheralId: string): Promise<void> => {
        logDebugWithLine(LOG_TAG, "execute DisconnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            disconnectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, `<<< succeeded to execute disconnectDevice ${peripheralId}`)
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeDisconnectDeviceUseCase }
}

export default DisconnectDeviceUseCase