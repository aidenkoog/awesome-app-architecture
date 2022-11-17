import Constants from '../../../../utils/Constants'
import { SERVICE_UUID } from '../../../../utils/ble/BleConfig'
import BleRepository from '../../../../data/repositories/ble/BleRepository'
import { logDebug, outputErrorLog, logDebugWithLine } from '../../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG
const SCAN_DURATION = Constants.BT.SCAN_DURATION

const ConnectBleUseCase = () => {

    /**
     * ble repository's apis.
     */
    const {
        connectDevice, disableNotification, disconnectDevice, enableNotification,
        initializeBleModule, getUuidList, sendBleCustomData, startScan, stopScan,
        getBleDeviceInfo, changeCachedDeviceInformation
    } = BleRepository()

    /**
     * Execute the use case of connecting devices. 
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    executeConnectDeviceUseCase = (peripheralId) => {
        logDebugWithLine(LOG_TAG, "execute ConnectDeviceUseCase")

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
        logDebugWithLine(LOG_TAG, "execute DisableNotificationUseCase")

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
        logDebugWithLine(LOG_TAG, "execute DisconnectDeviceUseCase")

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
        logDebugWithLine(LOG_TAG, "execute EnableNotificationUseCase")

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
        logDebugWithLine(LOG_TAG, "execute BleModuleUseCase")

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
        logDebugWithLine(LOG_TAG, "execute GetUuidListUseCase")

        const uuidList = getUuidList(peripheral)
        logDebug(LOG_TAG, "<<< succeeded to execute getUuidList: " + uuidList)
        return uuidList
    }

    /**
     * Execute the use case. 
     */
    executeSendBleCustomDataUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute SendBleCustomDataUseCase")

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
    executeStartScanUseCase = (serviceUuid = SERVICE_UUID, duration = SCAN_DURATION) => {
        logDebugWithLine(LOG_TAG, "execute StartScanUseCase")

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
        logDebugWithLine(LOG_TAG, "execute StopScanUseCase")

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

    /**
     * execute the use case of getting ble device information.
     * release ble listeners after completing to getting information.
     */
    executeGetBleDeviceInfo = () => {
        logDebugWithLine(LOG_TAG, "execute GetBleDeviceInfo")
        getBleDeviceInfo((bleDeviceInfo) => {
            return bleDeviceInfo
        })
    }

    /**
     * execute usecase of trying to reconnect ble device.
     * @param {string} deviceName
     * @param {string} macAddress
     * @returns {Promise}
     */
    executeReconnectBleDeviceUseCase = (deviceName, macAddress) => {
        logDebugWithLine(LOG_TAG, "execute ReconnectBleDeviceUseCase")

        return new Promise((fulfill, reject) => {
            changeCachedDeviceInformation(deviceName, macAddress).then(() => {
                startScan(serviceUuid, duration).then(() => {
                    logDebug(LOG_TAG, "<<< succeeded to execute startScan with "
                        + serviceUuid + " for " + duration + "seconds")
                    fulfill()

                }).catch((e) => {
                    reject(e)
                })

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * execute usecase of changing cached ble device name and mac address.
     * @param {string} deviceName
     * @param {string} macAddress
     * @returns {Promise}
     */
    executeChangeCachedDeviceInfoUseCase = (deviceName, macAddress) => {
        logDebugWithLine(LOG_TAG, "execute ChangeCachedDeviceInfoUseCase")
        return new Promise((fulfill, reject) => {
            changeCachedDeviceInformation(deviceName, macAddress).then(() => {
                fulfill()

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        executeConnectDeviceUseCase, executeDisableNotificationUseCase, executeDisconnectDeviceUseCase,
        executeEnableNotificationUseCase, executeBleModuleUseCase, executeGetUuidListUseCase,
        executeSendBleCustomDataUseCase, executeStartScanUseCase, executeStopScanUseCase,
        executeGetBleDeviceInfo, executeReconnectBleDeviceUseCase, executeChangeCachedDeviceInfoUseCase
    }
}

export default ConnectBleUseCase