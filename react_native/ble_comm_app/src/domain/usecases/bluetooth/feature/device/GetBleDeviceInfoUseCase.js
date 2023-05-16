import Constants from '../../../../../utils/Constants.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'
import { getBleDeviceMacAddress, getBleDeviceName } from '../../../../../utils/storage/StorageUtil.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetBleDeviceInfoUseCase = () => {

    /**
     * execute usecase of getting ble device name.
     * @returns {Promise}
     */
    executeGetBleDeviceNameUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetBleDeviceNameUseCase")

        return new Promise((fulfill, reject) => {
            getBleDeviceName().then((deviceName) => {
                fulfill(deviceName)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * execute usecase of getting ble device mac address.
     * @returns {Promise}
     */
    executeGetBleDeviceMacAddressUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute GetBleDeviceMacAddressUseCase")

        return new Promise((fulfill, reject) => {
            getBleDeviceMacAddress().then((deviceMacAddress) => {
                fulfill(deviceMacAddress)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        executeGetBleDeviceNameUseCase,
        executeGetBleDeviceMacAddressUseCase
    }
}

/**
 * export bluetooth usecase.
 */
export default GetBleDeviceInfoUseCase