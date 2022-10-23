import Constants from '../../utils/Constants.js'
import { logDebug, logError } from '../../utils/Logger.js'

const bleManager = require('../sources/bluetooth/BleManager.js').default
const LOG_TAG = Constants.LOG.BT_REPO_LOG

/**
 * bluetooth api implementation.
 */
class BluetoothRepository {

    /**
     * BluetoothRepository constructor.
     */
    constructor() { }

    /** 
     * connect ble device. 
     * @param {string} peripheralId
     * @returns {Promise}
     */
    connectDevice(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.connect(peripheralId).then(() => {
                logDebug(LOG_TAG, "succeeded to connect " + peripheralId)
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * disable notification of ble device.
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid
     * @returns {Promise}
     */
    disableNotification(peripheralId, serviceUuid, characteristicUuid) {
        return new Promise((fulfill, reject) => {
            bleManager.stopNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "succeeded to disable notification of " + characteristicUuid)
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * disconnect ble device.
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    disconnectDevice(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.disconnect(peripheralId).then(() => {
                logDebug(LOG_TAG, "succeeded to disconnect " + peripheralId)
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })

    }

    /**
     * enable notification of ble device.
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     * @returns {Promise}
     */
    enableNotification(peripheralId, serviceUuid, characteristicUuid) {
        return new Promise((fulfill, reject) => {
            bleManager.startNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "succeeded to enable notification of " + characteristicUuid)
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * initialize ble manager and enable bluetooth feature.
     * @returns {Promise}
     */
    initializeBleModule() {
        return new Promise((fulfill, reject) => {
            bleManager.start(null).then(() => {
                logDebug(LOG_TAG, "succeeded to initialize ble manager")
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * enable bluetooth (Android only)
     * @returns {Promise}
     */
    enableBluetooth() {
        return new Promise((fulfill, reject) => {
            bleManager.enableBluetooth().then(() => {
                logDebug(LOG_TAG, "succeeded to enable bluetooth feature")
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * get battery level of ble device.
     * @param {string} peripheralId 
     * @param {string} batteryserviceUuid 
     * @param {string} batterycharacteristicUuid
     * @returns {Promise}
     */
    getBatteryLevel(peripheralId, batteryserviceUuid, batterycharacteristicUuid) {
        return new Promise((fulfill, reject) => {
            bleManager.read(peripheralId, batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
                logDebug(LOG_TAG, "succeeded to get battery level-" + batteryLevel)
                fulfill(batteryLevel)
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * start scanning ble device.
     * @param {string} serviceUuid 
     * @param {number} duration 
     */
    startScan(serviceUuid, duration) {
        return new Promise((fulfill, reject) => {
            var serviceUuids = []
            if (serviceUuid != null && serviceUuid != "" && serviceUuid && "undefined") {
                serviceUuids.push(serviceUuid)
            } else {
                const errorMessage = "wrong service uuids !!!"
                this.outputErrorLog(errorMessage)
                reject(errorMessage)
                return
            }
            logDebug(LOG_TAG, "service uuids for scanning: " + serviceUuids)

            bleManager.scan(serviceUuids, duration, true).then(() => {
                logDebug(LOG_TAG, "succeeded to execute scanning")
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * stop scanning ble device.
     */
    stopScan() {
        return new Promise((fulfill, reject) => {
            bleManager.stopScan().then(() => {
                logDebug(LOG_TAG, "succeeded in stopping the device scan")
                fulfill()
            }).catch((e) => {
                this.outputErrorLog(e)
                reject(e)
            })
        })
    }

    /**
     * get all uuid list that exists in ble device.
     * @param {Any} peripheral 
     */
    getUuidList(peripheral) {
        return bleManager.getUuidList(peripheral)
    }

    /**
     * retrieve services of ble device.
     * @param {string} peripheralId 
     */
    retrieveServices(peripheralId) {
        bleManager.retrieveServices(peripheralId).then(() => {
            logDebug(LOG_TAG, "succeeded in retrieving services")
        }).catch((e) => {
            this.outputErrorLog(e)
        })
    }

    /**
     * it's not implemented yet.
     */
    getHrInfo() { }

    /**
     * it's not implemented yet.
     */
    getSleepInfo() { }

    /**
     * it's not implemented yet.
     */
    getStepInfo() { }

    /**
     * it's not implemented yet.
     */
    refreshDeviceInfo() { }

    /**
     * it's not implemented yet.
     */
    upgradeFirmware() { }

    /**
     * print error log delivered from ble manager.
     * @param {string} error 
     */
    outputErrorLog(error) {
        logError(LOG_TAG, error)
    }

}

/**
 * export bluetooth repository object.
 */
export default new BluetoothRepository()