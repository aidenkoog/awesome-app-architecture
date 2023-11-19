import BleRepository from '../../../../../data/repositories/ble/BleRepository'
import Constants from '../../../../../utils/Constants'
import { logDebugWithLine, outputErrorLog } from '../../../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SendBleLogUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic message.
     */
    const { sendBleCustomMessage } = BleRepository()

    /**
     * execute usecase of requesting authentication to device.
     */
    const executeSendBleLogUseCase = (): Promise<void> => {
        logDebugWithLine(LOG_TAG, "execute SendBleLogUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomMessage(`\x00\x06\x00DFDFDF`).then(() => {
                fulfill()
            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, `${e} occurred by sendBleCustomMessage`)
                reject(e)
            })
        })
    }

    return { executeSendBleLogUseCase }
}

export default SendBleLogUseCase