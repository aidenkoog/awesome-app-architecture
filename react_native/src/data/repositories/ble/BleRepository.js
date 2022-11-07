import { useEffect } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import Constants from '../../../utils/Constants.js'
import { isValid } from '../../../utils/common/CommonUtil.js'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger.js'
import { NativeEventEmitter, NativeModules } from 'react-native'
import { bleScanningStateAtom, bleDeviceFoundAtom } from '../../adapters/recoil/bluetooth/ScanningStateAtom'
import { bleBatteryStateAtom } from '../../adapters/recoil/bluetooth/BatteryStateAtom.js'
import { convertBleCustomToHexData, getFeatureNameAsUuid } from '../../../utils/ble/BleUtil.js'
import { getBleDeviceMacAddress, getBleDeviceName, storeBleDeviceMacAddress } from '../../../utils/storage/StorageUtil'
import {
    BATTERY_CHARACTERISTIC_UUID, BATTERY_SERVICE_UUID, RX_CHARACTERISTIC_UUID,
    FLOW_CONTROL_CHARACTERISTIC_UUID, TX_CHARACTERISTIC_UUID
} from '../../../utils/ble/BleConfig.js'
import {
    bleTxUuidNotificationStateAtom,
    bleFlowControlUuidNotificationStateAtom,
    bleBatteryUuidNotificationStateAtom
} from '../../adapters/recoil/bluetooth/BleNotificationAtom'
import {
    bleConnectionStateAtom, bleDeviceNameAtom, bleMacOrUuidAtom, bleConnectionCompleteStateAtom
} from '../../adapters/recoil/bluetooth/ConnectionStateAtom'
import { bleAuthResultAtom } from '../../adapters/recoil/bluetooth/DeviceInfoAtom'
import { SERVICE_UUID } from '../../../utils/ble/BleConfig.js'

/**
 * load ble manager module (react-native-ble-manager).
 * initialize scan duration and scan restart delay time.
 */
const bleManager = require('../../sources/bluetooth/ble_manager/BleManager.js').default
const LOG_TAG = Constants.LOG.BT_REPO_LOG
const SCAN_DURATION = Constants.BT.SCAN_DURATION
const SCAN_DELAY_TIME = Constants.BT.SCAN_DELAY_TIME

/**
 * standard code for handling ble related callbacks.
 */
const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

/**
 * cached ble device name and mac address.
 */
let cachedBleDeviceName = ""
let cachedBleMacAddress = ""

/**
 * bluetooth api implementation.
 * @returns {Any}
 */
const BleRepository = () => {

    /**
     * state handling code to set data as a global variable according to ble state change 
     * and make it available to other components.
     * (resolved issue) comment this code because recoil state cannot be refered outside.
     * 
     * [ scanning atoms ]
     */
    const setBleScanningStateAtom = useSetRecoilState(bleScanningStateAtom)
    const bleScanningState = useRecoilValue(bleScanningStateAtom)

    const setBleDeviceFoundAtom = useSetRecoilState(bleDeviceFoundAtom)
    const bleDeviceFound = useRecoilValue(bleDeviceFoundAtom)

    /**
     * [ connection atoms ]
     */
    const bleConnectionState = useRecoilValue(bleConnectionStateAtom)
    const setBleConnectionStateAtom = useSetRecoilState(bleConnectionStateAtom)

    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)
    const setBleConnectionCompleteStateAtom = useSetRecoilState(bleConnectionCompleteStateAtom)

    const setBleDeviceNameAtom = useSetRecoilState(bleDeviceNameAtom)
    const setBleMacOrUuidAtom = useSetRecoilState(bleMacOrUuidAtom)

    /**
     * [ authentication atom ]
     */
    const setBleAuthResultState = useSetRecoilState(bleAuthResultAtom)

    /**
     * [ battery state atom ]
     */
    const setBleBatteryStateAtom = useSetRecoilState(bleBatteryStateAtom)

    /**
     * [ notification atoms ]
     */
    const setBleTxUuidNotificationStateAtom = useSetRecoilState(bleTxUuidNotificationStateAtom)
    const setBleFlowControlUuidNotificationStateAtom = useSetRecoilState(bleFlowControlUuidNotificationStateAtom)
    const setBleBatteryUuidNotificationStateAtom = useSetRecoilState(bleBatteryUuidNotificationStateAtom)

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
        this.releaseBleEventListeners()
        this.addBleEventListeners()
    }

    /**
     * enable all notification state atoms.
     * activate the status of tx, flow control and battery notification.
     */
    enableAllNotificationAtoms = () => {
        setBleTxUuidNotificationStateAtom(true)
        setBleFlowControlUuidNotificationStateAtom(true)
        setBleBatteryUuidNotificationStateAtom(true)
    }

    /**
     * release atom states after all steps are cleared.
     * disables the flag indicating that the scan is in progress and the flag indicating that the device has been found.
     */
    releaseAtomStateAfterCompleted = () => {
        setBleDeviceFoundAtom(false)
        setBleScanningStateAtom(false)
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

        logDebug(LOG_TAG, "<<< discovered "
            + peripheralName + " (" + peripheralId
            + "), cached peripheral name: " + cachedBleDeviceName)

        if (peripheralName == cachedBleDeviceName) {
            logDebug(LOG_TAG, "<<< found my device (" + peripheralName + "). start to connect device")
            setBleDeviceFoundAtom(true)
            setBleDeviceNameAtom(peripheralName)
            setBleMacOrUuidAtom(peripheralId)

            if (bleScanningState) {
                logDebug(LOG_TAG, ">>> scanning is in progress")
                this.stopScan().catch((e) => { outputErrorLog(LOG_TAG, e) })
            }
            this.connectDeviceWhenFound(peripheralId)
        }
    }

    /**
     * connect ble device when it's found perfectly.
     * @param (string) peripheralId
     */
    connectDeviceWhenFound = (peripheralId) => {
        bleManager.connect(peripheralId).then(() => {
            setBleConnectionStateAtom(true)
            this.retrieveServices(peripheralId)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occured by connect of ble manager")

            setBleConnectionStateAtom(false)
            setBleDeviceFoundAtom(false)

            this.restartScan()
        })
    }

    /**
     * catch when the device scan is stopped.
     */
    onScanStopped = () => {
        logDebug(LOG_TAG, "<<< stopped device scan")

        // disables the flag indicating that the scan is in progress.
        setBleScanningStateAtom(false)
        this.restartScan()
    }

    /**
     * catch when device is disconnected.
     * @param {Any} peripheral 
     */
    onPeripheralDisconnecrted = (peripheral) => {
        logDebug(LOG_TAG, "<<< disconnected " + peripheral.name + " (" + peripheral.id + ")")
        this.releaseAllAtomStates()
    }

    /**
     * receive characteristic custom data that is sent from device.
     * @param {Any} characteristicCustomData 
     */
    onCharacteristicChanged = (characteristicCustomData) => {
        logDebug(LOG_TAG, "------------------------------------------------------------------------------------------")
        logDebug(LOG_TAG, "<<< received characteristic custom data")
        logDebug(LOG_TAG, "peripheral: " + characteristicCustomData.peripheral)
        logDebug(LOG_TAG, "characteristic: " + characteristicCustomData.characteristic)
        logDebug(LOG_TAG, "value: " + characteristicCustomData.value)
        logDebug(LOG_TAG, "hex: " + convertBleCustomToHexData(characteristicCustomData.value))
        logDebug(LOG_TAG, ">>> received perfectly")
        logDebug(LOG_TAG, "------------------------------------------------------------------------------------------")
    }

    /**
     * restart scanning ble device.
     * currently, here are some issues.
     * needed to have a flag that represents scanning job is completed and not necessary anymore.
     */
    restartScan = () => {
        if (bleDeviceFound || bleConnectionState || bleConnectionCompleteState) {
            logDebug(LOG_TAG, "cannot restart scanning ("
                + "device found: " + bleDeviceFound
                + ", connected: " + bleConnectionState
                + ", completed: " + bleConnectionCompleteState + ")")
            return
        }
        bleManager.getConnectedPeripherals([]).then((peripherals) => {
            if (peripherals.length == 0) {
                outputErrorLog(LOG_TAG, "<<< there's no any connected peripheral. "
                    + "scanning is going to be starting after " + SCAN_DELAY_TIME)
                setTimeout(() => { this.startScan() }, SCAN_DELAY_TIME)

            } else {
                if (!isValid(cachedBleDeviceName) || !isValid(cachedBleMacAddress)) {
                    setTimeout(() => { this.startScan() }, SCAN_DELAY_TIME)

                } else {
                    logDebug(LOG_TAG, "there's already cached ble device name and mac address. connect device directly")
                    this.connectDevice(cachedBleMacAddress)
                }
            }

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occured by getConnectedPeripherals of ble manager")
        })
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
                setBleConnectionStateAtom(true)
                this.retrieveServices(peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occured by connect of ble manager")
                setBleConnectionStateAtom(false)
                setBleDeviceFoundAtom(false)
                this.restartScan()
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
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occured by stopNotification of ble manager")
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
                this.releaseAllAtomStates()
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occured by disconnect of ble manager")
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
                logDebug(LOG_TAG, "<<< succeeded to enable notification of "
                    + getFeatureNameAsUuid(characteristicUuid) + " : " + characteristicUuid)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occured by startNotification of ble manager")
                reject(e)
            })
        })
    }

    /**
     * initialize ble manager and enable bluetooth feature.
     * @returns {Promise}
     */
    initializeBleModule = () => {
        return new Promise((fulfill, reject) => {
            bleManager.start(null).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to initialize ble manager")
                this.refreshBleEventListeners()
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occured by start of ble manager")
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
                outputErrorLog(LOG_TAG, e + " occured by enableBluetooth of ble manager")
                reject(e)
            })
        })
    }

    /**
     * get battery level of ble device.
     * @param {string} batteryserviceUuid 
     * @param {string} batterycharacteristicUuid
     * @returns {Promise}
     */
    getBatteryLevel = (batteryserviceUuid, batterycharacteristicUuid) => {
        return new Promise((fulfill, reject) => {
            bleManager.read(cachedBleMacAddress, batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
                logDebug(LOG_TAG, "<<< succeeded to get battery level-" + batteryLevel + "%")
                setBleBatteryStateAtom(batteryLevel)
                fulfill(batteryLevel)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occured by read of ble manager")
                reject(e)
            })
        })
    }

    /**
     * start scanning ble device.
     * [ flow sequence ]
     * 1. release all recoil atom state.
     * 2. check if delivered service uuid is valid.
     * 3. enable bluetooth feature.
     * 4. start scanning the device.
     * @param {string} serviceUuid 
     * @param {number} duration
     * @returns {Promise}
     */
    startScan = (serviceUuid = SERVICE_UUID, duration = SCAN_DURATION) => {
        return new Promise((fulfill, reject) => {
            if (bleScanningState) {
                const errorMessage = "ble scanning is being executed !!!"
                outputErrorLog(LOG_TAG, ">>> " + errorMessage)
                reject(errorMessage)
                return
            }
            this.releaseAllAtomStates()

            let serviceUuids = []
            if (serviceUuid != null && serviceUuid != "" && serviceUuid && "undefined") {
                serviceUuids.push(serviceUuid)

            } else {
                const errorMessage = "wrong service uuids !!!"
                outputErrorLog(LOG_TAG, errorMessage)
                reject(errorMessage)
                return
            }
            setBleScanningStateAtom(true)
            this.enableBluetooth().then(() => {
                bleManager.scan(serviceUuids, duration, false).then(() => {
                    fulfill()

                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occured by scan of ble manager !!!")
                    reject(e)
                })

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occured by enableBluetooth of ble manager !!!")
                reject(e)
            })
        })
    }

    /**
     * stop scanning ble device.
     * @returns {Promise}
     */
    stopScan = () => {
        return new Promise((fulfill, reject) => {
            bleManager.stopScan().then(() => {
                setBleScanningStateAtom(false)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occured by stopScan of ble manager")
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
     * set mtu (maximum transmission unit)
     * @param {string} peripheralId
     * @param {number} mtu
     */
    setMtu = (peripheralId, mtu = 512) => {
        return new Promise((fulfill, reject) => {
            bleManager.requestMtu(peripheralId, mtu).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to request mtu (" + mtu + ")")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by requestMtu of ble manager !!!")
                reject(e)
            })
        })
    }

    /**
     * retrieve services of ble device.
     * @param {string} peripheralId 
     */
    retrieveServices = (peripheralId) => {
        bleManager.retrieveServices(peripheralId).then((peripheral) => {
            logDebug(LOG_TAG, "<<< uuidList: " + getUuidList(peripheral))
            executeEnableAllNotificationPromise(peripheralId)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occured by retrieveServices of ble manager !!!")
        })
    }

    /**
     * execute enabling all notifications.
     * @param {string} peripheralId 
     */
    const executeEnableAllNotificationPromise = async (peripheralId) => {
        await enableAllNotificationPromise(peripheralId).then(() => {
            logDebug(LOG_TAG, "<<< succeeded to enable all notifications")

            // stop scanning job if it's still being executed.
            if (bleScanningState) {
                logDebug(LOG_TAG, ">>> scanning is still in progress")
                bleManager.stopScan().catch((e) => { outputErrorLog(LOG_TAG, e) })
            }

            setBleConnectionCompleteStateAtom(true)

            this.enableAllNotificationAtoms()
            this.releaseAtomStateAfterCompleted()

            storeBleDeviceMacAddress(peripheralId)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occured by enableAllNotificationPromise")
        })
    }

    /**
     * release all atom atates.
     * case. when device is disconnected. / before the device scan.
     */
    releaseAllAtomStates = () => {
        // connection state.
        setBleConnectionStateAtom(false)

        // scanning state.
        setBleDeviceFoundAtom(false)
        setBleScanningStateAtom(false)

        // found device's name.
        setBleDeviceNameAtom(Constants.COMMON.DEFAULT_DATA)

        // notification states.
        setBleBatteryUuidNotificationStateAtom(false)
        setBleFlowControlUuidNotificationStateAtom(false)
        setBleTxUuidNotificationStateAtom(false)

        // found device's mac or uuid.
        setBleMacOrUuidAtom(Constants.COMMON.DEFAULT_DATA)

        // authetication state.
        setBleAuthResultState(false)
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
     * send custom characteristic value.
     * @param {bytes} customValue
     * @returns {Promise}
     */
    sendBleCustomValue = (customValue) => {
        return new Promise((fulfill, reject) => {
            bleManager.retrieveServices(cachedBleMacAddress).then((peripheral) => {
                bleManager.writeWithoutResponse(
                    peripheral.id, SERVICE_UUID, RX_CHARACTERISTIC_UUID, customValue).then(() => {
                        logDebug(LOG_TAG, "<<< succeeded to write ble custom data to " + peripheral.id)
                        fulfill()

                    }).catch((e) => {
                        outputErrorLog(LOG_TAG, e + " occurred by writeWithoutResponse of ble manager !!!")
                        reject(e)
                    })

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by retrieveServices of ble manager !!!")
                reject(e)
            })
        })
    }

    /**
     * explanation. execute logic after rendering and painting is completed.
     */
    useEffect(() => {
        this.refreshBleEventListeners()

        getBleDeviceName().then((deviceName) => {
            cachedBleDeviceName = deviceName
            logDebug(LOG_TAG, "cachedBleDeviceName: " + cachedBleDeviceName)
        })
        getBleDeviceMacAddress().then((macAddress) => {
            cachedBleMacAddress = macAddress
            logDebug(LOG_TAG, "cachedBleMacAddress: " + cachedBleMacAddress)
        })

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
        sendBleCustomValue,
        setMtu
    }
}

/**
 * export bluetooth repository object.
 */
export default BleRepository