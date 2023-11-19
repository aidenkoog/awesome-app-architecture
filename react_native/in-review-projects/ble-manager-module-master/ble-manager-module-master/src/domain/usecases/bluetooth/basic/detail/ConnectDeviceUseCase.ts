import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const ConnectDeviceUseCase = () => {

    const { connectDevice } = BleRepository()

    /**
     * Execute the use case of connecting devices. 
     * @param {string} peripheralId 
     * @return {Promise}
     */
    const executeConnectDeviceUseCase = (peripheralId: string): Promise<void> => {
        logDebugWithLine(LOG_TAG, "execute ConnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            connectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, `<<< succeeded to execute connectDevice ${peripheralId}`)
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeConnectDeviceUseCase }
}

export default ConnectDeviceUseCase