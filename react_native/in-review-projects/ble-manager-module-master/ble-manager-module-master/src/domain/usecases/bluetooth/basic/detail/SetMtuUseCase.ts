import BleRepository from "../../../../../data/repositories/ble/BleRepository"
import Constants from "../../../../../utils/Constants"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const SetMtuUseCase = () => {

    const { requestMTU, getPeripheralId } = BleRepository()

    /**
     * execute the use case of setting mtu. 
     * @param {number} mtu 
     * @return {Promise}
     */
    const executeSetMtuUseCase = (mtu: number): Promise<any> => {
        logDebugWithLine(LOG_TAG, "execute SetMtuUseCase")

        return new Promise((fulfill, reject) => {
            const peripheralId = getPeripheralId()

            requestMTU(peripheralId, mtu).then((mtuSetUp: any) => {
                logDebug(LOG_TAG, `<<< succeeded to set mtu with ${mtuSetUp}(mtu) for ${peripheralId}`)
                fulfill(mtuSetUp)

            }).catch((e: any) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }
    return { executeSetMtuUseCase }
}

export default SetMtuUseCase