import Constants from '../../../utils/Constants.js'
import { logDebug, outputErrorLog } from '../../../utils/Logger.js'
import { NativeEventEmitter, NativeModules } from 'react-native'
import { useEffect } from 'react'
import { bleScanningStateAtom } from '../../adapters/recoil/bluetooth/ScanningStateAtom'
import { useSetRecoilState } from 'recoil'
import { getBleDeviceNameFromQrScan, storeBleDeviceMacAddress } from '../../../utils/StorageUtil'
import {
    BATTERY_CHARACTERISTIC_UUID, BATTERY_SERVICE_UUID,
    FLOW_CONTROL_CHARACTERISTIC_UUID, SERVICE_UUID, TX_CHARACTERISTIC_UUID
} from '../../../utils/Config.js'
import {
    bleTxUuidNotificationStateAtom,
    bleFlowControlUuidNotificationStateAtom
} from '../../adapters/recoil/bluetooth/BleNotificationAtom'
import { bleConnectionStateAtom, bleServiceRetrievedAtom, bleDeviceNameAtom, bleMacOrUuidAtom }
    from '../../adapters/recoil/bluetooth/ConnectionStateAtom'
import { getBleCustomData } from '../../../utils/BleUtil.js'


/**
 * load ble manager module (react-native-ble-manager).
 * set-up debugging log tag.
 */
const bleManager = require('../../sources/bluetooth/ble_manager/BleManager.js').default
const LOG_TAG = Constants.LOG.BT_REPO_LOG

/**
 * standard code for handling ble related callbacks.
 */
const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

/**
 * flag for checking repository state.
 * reason : check if state I set as true is continued to keep.
 */
let repositoryState = false

/**
 * bluetooth api implementation.
 */
const BleRepository = () => {

    /**
     * state handling code to set data as a global variable according to ble state change 
     * and make it available to other components.
     * (resolved issue) comment this code because recoil state cannot be refered outside.
     * 
     * [ scanning ]
     */
    const setBleScanningStateAtom = useSetRecoilState(bleScanningStateAtom)

    /**
     * [ connection ]
     */
    const setBleConnectionStateAtom = useSetRecoilState(bleConnectionStateAtom)
    const setBleServiceRetrieveStateAtom = useSetRecoilState(bleServiceRetrievedAtom)
    const setBleDeviceNameAtom = useSetRecoilState(bleDeviceNameAtom)
    const setBleMacOrUuidAtom = useSetRecoilState(bleMacOrUuidAtom)

    /**
     * [ notification ]
     */
    const setBleTxUuidNotificationStateAtom = useSetRecoilState(bleTxUuidNotificationStateAtom)
    const setBleFlowControlUuidNotificationStateAtom = useSetRecoilState(bleFlowControlUuidNotificationStateAtom)

    /**
     * listeners for catching the ble events.
     */
    addBleEventListeners = () => {
        bleManagerEmitter.addListener("BleManagerDiscoverPeripheral", this.onFoundPeripheral)
        bleManagerEmitter.addListener("BleManagerStopScan", this.onScanStopped)
        bleManagerEmitter.addListener("BleManagerDisconnectPeripheral", this.onPeripheralDisconnecrted)
        bleManagerEmitter.addListener("BleManagerDidUpdateValueForCharacteristic", this.onCharacteristicChanged)
    }

    /**
     * release ble event listeners.
     */
    releaseBleEventListeners = () => {
        bleManagerEmitter.removeAllListeners("BleManagerDiscoverPeripheral")
        bleManagerEmitter.removeAllListeners("BleManagerStopScan")
        bleManagerEmitter.removeAllListeners("BleManagerDisconnectPeripheral")
        bleManagerEmitter.removeAllListeners("BleManagerDidUpdateValueForCharacteristic")
    }

    /**
     * refresh ble event listeners. (release and add them again.)
     */
    refreshBleEventListeners = () => {
        logDebug(LOG_TAG, ">>> refresh ble event listeners")
        this.releaseBleEventListeners()
        this.addBleEventListeners()
        logDebug(LOG_TAG, "<<< finished refreshing ble event listeners")
    }

    /**
     * obtain device information that is detected by scanning device.
     * [ flow sequence ]
     * 1. detect peripherals.
     * 2. check if detected peripheral name is the same with peripheral's found by qr scan.
     * 3. set name and mac address (or uuid in case of iOS) to atom, store mac address to storage.
     * @param {Any} peripheral 
     */
    onFoundPeripheral = (peripheral) => {
        const peripheralName = peripheral?.name
        const peripheralId = peripheral?.id
        logDebug(LOG_TAG, "<<< discovered " + peripheralName + " (" + peripheralId + ")")

        if (peripheralName == getBleDeviceNameFromQrScan()) {
            setBleDeviceNameAtom(peripheralName)
            setBleMacOrUuidAtom(peripheralId)
            storeBleDeviceMacAddress(peripheralId)

            bleManager.stopScan.then(() => {
                logDebug(LOG_TAG, "<<< succeeded in stopping the device scan in onFoundPeripheral")
                connectDeviceWhenFound()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " in onFoundPeripheral")
            })
        }
    }

    /**
     * connect ble device when it's found perfectly.
     * @param (string) peripheralId
     */
    connectDeviceWhenFound = (peripheralId) => {
        bleManager.connect(peripheralId).then(() => {
            logDebug(LOG_TAG, "<<< succeeded to connect " + peripheralId)
            this.retrieveServices(peripheralId)
        }).catch((e) => {
            outputErrorLog(LOG_TAG, e)
        })
    }

    /**
     * catch when the device scan is stopped.
     */
    onScanStopped = () => {
        logDebug(LOG_TAG, "<<< stopped device scan")
        logDebug(LOG_TAG, "<<< repositoryState: " + repositoryState)
        setBleScanningStateAtom(false)
    }

    /**
     * catch when device is disconnected.
     * @param {Any} peripheral 
     */
    onPeripheralDisconnecrted = (peripheral) => {
        logDebug(LOG_TAG, "<<< disconnected " + peripheral)
        setBleConnectionStateAtom(false)
    }

    /**
     * receive characteristic custom data that is sent from device.
     * @param {Any} characteristicCustomData 
     */
    onCharacteristicChanged = (characteristicCustomData) => {
        logDebug(LOG_TAG, "<<< received " + characteristicCustomData)
    }

    /** 
     * connect ble device. 
     * @param {string} peripheralId
     * @returns {Promise}
     */
    connectDevice = (peripheralId) => {
        return new Promise((fulfill, reject) => {
            bleManager.connect(peripheralId).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to connect " + peripheralId)
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                setBleConnectionStateAtom(false)
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
    disableNotification = (peripheralId, serviceUuid, characteristicUuid) => {
        return new Promise((fulfill, reject) => {
            bleManager.stopNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to disable notification of " + characteristicUuid)
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * disconnect ble device.
     * @param {string} peripheralId 
     * @returns {Promise}
     */
    disconnectDevice = (peripheralId) => {
        return new Promise((fulfill, reject) => {
            bleManager.disconnect(peripheralId).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to disconnect " + peripheralId)
                setBleConnectionStateAtom(false)
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
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
    enableNotification = (peripheralId, serviceUuid, characteristicUuid) => {
        return new Promise((fulfill, reject) => {
            bleManager.startNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to enable notification of " + characteristicUuid)
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * initialize ble manager and enable bluetooth feature.
     * @returns {Promise}
     */
    initializeBleModule = () => {
        logDebug(LOG_TAG, ">>> repositoryState: " + repositoryState)
        repositoryState = true
        return new Promise((fulfill, reject) => {
            bleManager.start(null).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to initialize ble manager")
                this.refreshBleEventListeners()
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * enable bluetooth (Android only)
     * @returns {Promise}
     */
    enableBluetooth = () => {
        return new Promise((fulfill, reject) => {
            bleManager.enableBluetooth().then(() => {
                logDebug(LOG_TAG, "<<< succeeded to enable bluetooth feature")
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
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
    getBatteryLevel = (peripheralId, batteryserviceUuid, batterycharacteristicUuid) => {
        return new Promise((fulfill, reject) => {
            bleManager.read(peripheralId, batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
                logDebug(LOG_TAG, "<<< succeeded to get battery level-" + batteryLevel)
                fulfill(batteryLevel)
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * start scanning ble device.
     * @param {string} serviceUuid 
     * @param {number} duration 
     */
    startScan = (serviceUuid, duration) => {
        logDebug(LOG_TAG, ">>> repositoryState: " + repositoryState)
        return new Promise((fulfill, reject) => {
            var serviceUuids = []
            if (serviceUuid != null && serviceUuid != "" && serviceUuid && "undefined") {
                serviceUuids.push(serviceUuid)
            } else {
                const errorMessage = "wrong service uuids !!!"
                outputErrorLog(LOG_TAG, errorMessage)
                reject(errorMessage)
                return
            }
            setBleScanningStateAtom(true)
            logDebug(LOG_TAG, ">>> service uuids for scanning: " + serviceUuids)

            bleManager.scan(serviceUuids, duration, true).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to execute scanning")
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * stop scanning ble device.
     */
    stopScan = () => {
        return new Promise((fulfill, reject) => {
            bleManager.stopScan().then(() => {
                logDebug(LOG_TAG, "<<< succeeded in stopping the device scan")
                setBleScanningStateAtom(false)
                fulfill()
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
                reject(e)
            })
        })
    }

    /**
     * get all uuid list that exists in ble device.
     * @param {Any} peripheral 
     */
    getUuidList = (peripheral) => {
        return bleManager.getUuidList(peripheral)
    }

    /**
     * retrieve services of ble device.
     * @param {string} peripheralId 
     */
    retrieveServices = (peripheralId) => {
        bleManager.retrieveServices(peripheralId).then((peripheral) => {
            logDebug(LOG_TAG, "<<< succeeded in retrieving services " + peripheral)

            setBleServiceRetrieveStateAtom(true)

            const uuidList = getUuidList(peripheral)
            logDebug(LOG_TAG, "uuidList: " + uuidList)

            executeEnableAllNotificationPromise()

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e)
            setBleServiceRetrieveStateAtom(false)
        })
    }

    /**
     * execute enabling all notifications.
     */
    const executeEnableAllNotificationPromise = async () => {
        await enableAllNotificationPromise().then(() => {
            logDebug("succeeded to enable all notifications")

            setBleTxUuidNotificationStateAtom(true)
            setBleFlowControlUuidNotificationStateAtom(true)
            setBleConnectionStateAtom(true)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e)
        })
    }

    /**
     * this is used when you want to perform batch parallel processing of all multiple asynchronous processing.
     * promises to enable all notifications.
     * @param {string} peripheralId 
     * @returns {Promise[]}
     */
    const enableAllNotificationPromise = (peripheralId) => {
        return Promise.all([
            this.enableNotification(peripheralId, SERVICE_UUID, TX_CHARACTERISTIC_UUID),
            this.enableNotification(peripheralId, SERVICE_UUID, FLOW_CONTROL_CHARACTERISTIC_UUID),
            this.enableNotification(peripheralId, BATTERY_SERVICE_UUID, BATTERY_CHARACTERISTIC_UUID),
        ])
    }

    /**
     * send custom characteristic data.
     * @param {bytes} customData 
     */
    sendBleCustomData = (customData) => {
        return new Promise((fulfill, reject) => {
            bleManager.writeWithoutResponse(peripheralId, SERVICE_UUID, TX_CHARACTERISTIC_UUID,
                getBleCustomData(customData)).then(() => {
                    logDebug(LOG_TAG, "<<< succeeded to write ble custom characteristic data")
                    fulfill()
                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e)
                    reject(e)
                })
        })
    }

    /**
     * it's not implemented yet.
     */
    getHrInfo = () => { }

    /**
     * it's not implemented yet.
     */
    getSleepInfo = () => { }

    /**
     * it's not implemented yet.
     */
    getStepInfo = () => { }

    /**
     * it's not implemented yet.
     */
    refreshDeviceInfo = () => { }

    /**
     * it's not implemented yet.
     */
    upgradeFirmware = () => { }

    useEffect(() => {
        this.refreshBleEventListeners()
        return () => { }
    }, [])

    /**
     * export BluetoothRepository's functions.
     */
    return {
        initializeBleModule,
        startScan,
        connectDevice,
        disableNotification,
        disconnectDevice,
        enableNotification,
        enableBluetooth,
        getBatteryLevel,
        startScan,
        stopScan,
        getUuidList,
        retrieveServices,
        getHrInfo,
        getSleepInfo,
        getStepInfo,
        refreshDeviceInfo,
        upgradeFirmware,
        sendBleCustomData
    }
}

/**
 * export bluetooth repository object.
 */
export default BleRepository