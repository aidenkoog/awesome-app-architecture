import Constants from '../../utils/Constants.js'
import { debugLog, errorLog } from '../../utils/Logger.js'

const bleManager = require('../sources/bluetooth/BleManager.js').default
const LOG_TAG = Constants.LOG.BT_REPO_LOG

/**
 * bluetooth api implementation.
 */
const BluetoothRepository = () => {
    /** 
     * connect ble device. 
     * @param {string} peripheralId
     */
    function connectDevice(peripheralId) {
        bleManager.connect(peripheralId).then(() => {
            debugLog(LOG_TAG, "succeeded to connect ", peripheralId)
        }).catch((e) => {
            outputErrorLog(e)
        })
    }

    /**
     * disable notification of ble device.
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     */
    function disableNotification(peripheralId, serviceUuid, characteristicUuid) {
        bleManager.stopNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
            debugLog(LOG_TAG, "succeeded to disable notification of ", characteristicUuid)
        }).catch((e) => {
            outputErrorLog(e)
        })
    }

    /**
     * disconnect ble device.
     * @param {string} peripheralId 
     */
    function disconnectDevice(peripheralId) {
        bleManager.disconnect(peripheralId).then(() => {
            debugLog(LOG_TAG, "succeeded to disconnect ", peripheralId)
        }).catch((e) => {
            outputErrorLog(e)
        })
    }

    /**
     * enable notification of ble device.
     * @param {string} peripheralId 
     * @param {string} serviceUuid 
     * @param {string} characteristicUuid 
     */
    function enableNotification(peripheralId, serviceUuid, characteristicUuid) {
        bleManager.startNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
            debugLog(LOG_TAG, "succeeded to enable notification of ", characteristicUuid)
        }).catch((e) => {
            outputErrorLog(e)
        })
    }

    /**
     * initialize ble manager and enable bluetooth feature.
     */
    function initializeBleModule() {
        bleManager.start(null).then(() => {
            debugLog(LOG_TAG, "succeeded to initialize ble manager")
            bleManager.enableBluetooth().then(() => {
                debugLog(LOG_TAG, "succeeded to enable bluetooth feature")
            }).catch((e) => {
                outputErrorLog(e)
            })
        }).catch((e) => {
            outputErrorLog(e)
        })
    }

    /**
     * get battery level of ble device.
     * @param {string} peripheralId 
     * @param {string} batteryserviceUuid 
     * @param {string} batterycharacteristicUuid 
     */
    function getBatteryLevel(peripheralId, batteryserviceUuid, batterycharacteristicUuid) {
        bleManager.read(peripheralId, batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
            console.log(LOG_TAG, "succeeded to get battery level-", batteryLevel)
        }).catch((e) => {
            outputErrorLog(e)
        });
    }

    /**
     * start scanning ble device.
     * @param {string} serviceUuid 
     * @param {number} duration 
     */
    function startScan(serviceUuid, duration) {
        var serviceUuids = []
        if (serviceUuid != null || serviceUuid != "" || serviceUuid != "undefined") {
            serviceUuids.push(serviceUuid)
        }
        console.log(LOG_TAG, "service uuids for scanning: ", serviceUuids)

        bleManager.scan(serviceUuids, duration, true).then(() => {
            console.log(LOG_TAG, "succeeded to execute scanning")
        }).catch((e) => {
            outputErrorLog(e)
        });
    }

    /**
     * stop scanning ble device.
     */
    function stopScan() {
        bleManager.stopScan().then(() => {
            console.log(LOG_TAG, "succeeded in stopping the device scan")
        }).catch((e) => {
            outputErrorLog(e)
        })
    }

    /**
     * get all uuid list that exists in ble device.
     * @param {Any} peripheral 
     */
    function getUuidList(peripheral) {
        return bleManager.getUuidList(peripheral)
    }

    /**
     * retrieve services of ble device.
     * @param {string} peripheralId 
     */
    function retrieveServices(peripheralId) {
        bleManager.retrieveServices(peripheralId).then(() => {
            console.log(LOG_TAG, "succeeded in retrieving services")
        }).catch((e) => {
            outputErrorLog(e)
        })
    }

    /**
     * it's not implemented yet.
     */
    function getHrInfo() { }

    /**
     * it's not implemented yet.
     */
    function getSleepInfo() { }

    /**
     * it's not implemented yet.
     */
    function getStepInfo() { }

    /**
     * it's not implemented yet.
     */
    function refreshDeviceInfo() { }

    /**
     * it's not implemented yet.
     */
    function upgradeFirmware() { }

    /**
     * print error log delivered from ble manager.
     * @param {string} error 
     */
    function outputErrorLog(error) {
        errorLog(LOG_TAG, error)
    }

}

/**
 * export bluetooth repository object.
 */
module.exports = new BluetoothRepository();