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
     */
    disconnectDevice(peripheralId) {
        bleManager.disconnect(peripheralId).then(() => {
            logDebug(LOG_TAG, "succeeded to disconnect " + peripheralId)
        }).catch((e) => {
            this.outputErrorLog(e)
        })
    }

    /**
     * enable notification of ble device.
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     */
    enableNotification(peripheralId, serviceUuid, characteristicUuid) {
        bleManager.startNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
            logDebug(LOG_TAG, "succeeded to enable notification of " + characteristicUuid)
        }).catch((e) => {
            this.outputErrorLog(e)
        })
    }

    /**
     * initialize ble manager and enable bluetooth feature.
     */
    initializeBleModule() {
        bleManager.start(null).then(() => {
            logDebug(LOG_TAG, "succeeded to initialize ble manager")
            bleManager.enableBluetooth().then(() => {
                logDebug(LOG_TAG, "succeeded to enable bluetooth feature")
            }).catch((e) => {
                this.outputErrorLog(e)
            })
        }).catch((e) => {
            this.outputErrorLog(e)
        })
    }

    /**
     * get battery level of ble device.
     * @param {string} peripheralId 
     * @param {string} batteryserviceUuid 
     * @param {string} batterycharacteristicUuid 
     */
    getBatteryLevel(peripheralId, batteryserviceUuid, batterycharacteristicUuid) {
        bleManager.read(peripheralId, batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
            logDebug(LOG_TAG, "succeeded to get battery level-" + batteryLevel)
        }).catch((e) => {
            this.outputErrorLog(e)
        })
    }

    /**
     * start scanning ble device.
     * @param {string} serviceUuid 
     * @param {number} duration 
     */
    startScan(serviceUuid, duration) {
        var serviceUuids = []
        if (serviceUuid != null || serviceUuid != "" || serviceUuid != "undefined") {
            serviceUuids.push(serviceUuid)
        }
        logDebug(LOG_TAG, "service uuids for scanning: " + serviceUuids)

        bleManager.scan(serviceUuids, duration, true).then(() => {
            logDebug(LOG_TAG, "succeeded to execute scanning")
        }).catch((e) => {
            this.outputErrorLog(e)
        })
    }

    /**
     * stop scanning ble device.
     */
    stopScan() {
        bleManager.stopScan().then(() => {
            logDebug(LOG_TAG, "succeeded in stopping the device scan")
        }).catch((e) => {
            this.outputErrorLog(e)
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