import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const EnableBluetoothUseCase = () => {

    const { enableBluetooth } = BleRepository()

    /**
     * Execute the use case of connecting devices. 
     * @return {Promise}
     */
    const executeEnableBluetoothUseCase = (): Promise<void> => {
        logDebugWithLine(LOG_TAG, "execute EnableBluetoothUseCase")

        return new Promise((fulfill, reject) => {
            enableBluetooth().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute enableBluetooth")
                fulfill()

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeEnableBluetoothUseCase }
}

export default EnableBluetoothUseCase