import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
import BleRepository from '../../../data/repositories/ble/BleRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

/**
 * [ usecase naming rule. ]
 * usecase's prefix: execute
 * example. executeConnectDeviceUseCase
 * 
 * [ this usecase provides functions below. ]
 * scanning start / stop, 
 * connect / disconnect, 
 * enable / disable notification,
 * getting uuid list,
 * executing ble module.
 * @returns 
 */
const ConnectBleUseCase = () => {

    const {
        connectDevice, disableNotification, disconnectDevice, enableNotification,
        initializeBleModule, getUuidList, sendBleCustomData, startScan, stopScan
    } = BleRepository()

    /**
     * Execute the use case of connecting devices. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeConnectDeviceUseCase = (peripheralId) => {
        logDebug(LOG_TAG, ">>> ### triggered executeConnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            connectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute connectDevice " + peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * Execute the use case of disabling notifications. 
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     * @returns {Promise}
     */
    executeDisableNotificationUseCase = (peripheralId, serviceUuid, characteristicUuid) => {
        logDebug(LOG_TAG, ">>> ### triggered executeDisableNotificationUseCase")

        return new Promise((fulfill, reject) => {
            disableNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute disableNotification " + characteristicUuid)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * Execute the use case of disconnecting devices. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeDisconnectDeviceUseCase = (peripheralId) => {
        logDebug(LOG_TAG, ">>> ### triggered executeDisconnectDeviceUseCase")

        return new Promise((fulfill, reject) => {
            disconnectDevice(peripheralId).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute disconnectDevice " + peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * Execute the use case of enabling notifications.
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     * @returns {Promise}
     */
    executeEnableNotificationUseCase = (peripheralId, serviceUuid, characteristicUuid) => {
        logDebug(LOG_TAG, ">>> ### triggered executeEnableNotificationUseCase")

        return new Promise((fulfill, reject) => {
            enableNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute disconnectDevice " + peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * Execute the use case of initializing ble module. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeBleModuleUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeBleModuleUseCase")

        return new Promise((fulfill, reject) => {
            initializeBleModule().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute initializeBleModule")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * Execute the use case of getting uuid list. 
     * @param {Any} peripheral 
     * @returns {Any}
     */
    executeGetUuidListUseCase = (peripheral) => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetUuidListUseCase")

        const uuidList = getUuidList(peripheral)
        logDebug(LOG_TAG, "<<< succeeded to execute getUuidList: " + uuidList)
        return uuidList
    }

    /**
     * Execute the use case. 
     */
    executeSendBleCustomDataUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeSendBleCustomDataUseCase")

        return new Promise((fulfill, reject) => {
            sendBleCustomData().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute sendBleCustomData")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * Execute the use case of starting the device scan. 
     * @param {string} serviceUuid 
     * @param {number} duration 
     * @returns {Promise}
     */
    executeStartScanUseCase = (serviceUuid, duration) => {
        logDebug(LOG_TAG, ">>> ### triggered executeStartScanUseCase")

        return new Promise((fulfill, reject) => {
            startScan(serviceUuid, duration).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute startScan with " + serviceUuid + " for " + duration + "seconds")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * Execute the use case of stopping the device scan. 
     * @Deprecated
     * @returns {Promise}
     */
    executeStopScanUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeStopScanUseCase")

        return new Promise((fulfill, reject) => {
            stopScan().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute stopScan")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    return {
        executeConnectDeviceUseCase, executeDisableNotificationUseCase, executeDisconnectDeviceUseCase,
        executeEnableNotificationUseCase, executeBleModuleUseCase, executeGetUuidListUseCase,
        executeSendBleCustomDataUseCase, executeStartScanUseCase, executeStopScanUseCase
    }
}

/**
 * export bluetooth usecase.
 */
export default ConnectBleUseCase