import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'
import { storeBleDeviceMacAddress, storeBleDeviceName } from '../../../../../utils/storage/StorageUtil.js'

const SetBleDeviceInfoUseCase = () => {

    /**
     * execute usecase of setting ble device name.
     * @param {string} deviceName
     * @returns {Promise}
     */
     executeSetBleDeviceNameUseCase = (deviceName) => {
        logDebugWithLine(LOG_TaG, "execute SetBleDeviceNameUseCase with " + deviceName)

        return new Promise((fulfill, reject) => {
            storeBleDeviceName(deviceName).then(() => {
                fulfill()
            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * execute usecase of setting ble device mac address.
     * @param {string} deviceMacAddress
     * @returns {Promise}
     */
     executeSetBleDeviceMacAddressUseCase = (deviceMacAddress) => {
        logDebugWithLine(LOG_TaG, "execute SetBleDeviceMacAddressUseCase with " + deviceMacAddress)

        return new Promise((fulfill, reject) => {
            storeBleDeviceMacAddress(deviceMacAddress).then(() => {
                fulfill()

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        executeSetBleDeviceNameUseCase,
        executeSetBleDeviceMacAddressUseCase
    }
}

/**
 * export bluetooth usecase.
 */
export default SetBleDeviceInfoUseCase