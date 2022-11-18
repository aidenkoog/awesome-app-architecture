import { BLE_TEST_DEVICE_MAC_ADDRESS, BLE_TEST_DEVICE_NAME, BLE_TEST_MODE, SERVICE_UUID } from '../../../utils/ble/BleConfig.js'
import { BATTERY_CHARACTERISTIC_UUID, BATTERY_SERVICE_UUID, RX_CHARACTERISTIC_UUID, FLOW_CONTROL_CHARACTERISTIC_UUID, TX_CHARACTERISTIC_UUID } from '../../../utils/ble/BleConfig.js'
import { bleTxUuidNotificationStateAtom, bleFlowControlUuidNotificationStateAtom, bleBatteryUuidNotificationStateAtom, } from '../../adapters/recoil/bluetooth/BleNotificationAtom'
import { bleConnectionStateAtom, bleDeviceNameAtom, bleMacOrUuidAtom, bleConnectionCompleteStateAtom } from '../../adapters/recoil/bluetooth/ConnectionStateAtom'
import { ACTION_AUTHENTICATE, ACTION_DISCONNECT, ACTION_SYNC, ACTION_UPGRADE_FIRMWARE } from '../../../domain/usecases/bluetooth/action/BleActions.js'
import { getBleDeviceMacAddress, getBleDeviceName, storeBleDeviceMacAddress, storeBleDeviceName } from '../../../utils/storage/StorageUtil'
import { bleScanningStateAtom, bleDeviceFoundAtom } from '../../adapters/recoil/bluetooth/ScanningStateAtom'
import { bleAuthResultAtom, bleCharacteristcChangeAtom, bleSequenceIdAtom, bleWriteResponseAtom } from '../../adapters/recoil/bluetooth/DeviceInfoAtom'
import { bleBatteryStateAtom } from '../../adapters/recoil/bluetooth/BatteryStateAtom.js'
import { logDebug, logDebugWithLine, outputErrorLog } from '../../../utils/logger/Logger.js'
import { byteToHex, convertBleCustomToHexData } from '../../../utils/ble/BleUtil.js'
import { getFeatureNameAsUuid } from '../../../utils/ble/BleUtil.js'
import { NativeEventEmitter, NativeModules } from 'react-native'
import { isValid } from '../../../utils/common/CommonUtil.js'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import Constants from '../../../utils/Constants.js'
import { useEffect } from 'react'
import { getInstanceId } from 'react-native-device-info'
import { bytesToString } from 'convert-string'


const LOG_TAG = Constants.LOG.BT_REPO_LOG

/**
 * load ble manager module (react-native-ble-manager).
 * initialize scan duration and scan restart delay time.
 */
const bleManager = require('../../sources/bluetooth/ble_manager/BleManager.js').default
const SCAN_DURATION = Constants.BT.SCAN_DURATION
const SCAN_DELAY_TIME = Constants.BT.SCAN_DELAY_TIME

/**
 * standard code for handling ble related callbacks.
 */
const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

/**
 * cached ble device name, mac address and device uuid.
 */
let cachedBleDeviceName = ""
let cachedBleMacAddress = ""
let cachedDeviceUuid = ""

/**
 * ble battery uuid existence.
 */
let bleBatteryUuidExistence = false

/**
 * enable or disable the ble log characteristic message.
 */
let bleLogEnabled = false

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
     * [ sequence id atom ]
     */
    const bleSequenceId = useRecoilValue(bleSequenceIdAtom)
    const setBleSequenceId = useSetRecoilState(bleSequenceIdAtom)

    /**
     * [ ble custom message write method's response ]
     */
    const setBleWriteResponse = useSetRecoilState(bleWriteResponseAtom)

    /**
     * [ ble characteristc change ]
     */
    const setBleCharacteristcChange = useSetRecoilState(bleCharacteristcChangeAtom)

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
            + "), currently, cached peripheral name: " + cachedBleDeviceName)

        if (BLE_TEST_MODE) {
            if (peripheralName == BLE_TEST_DEVICE_NAME || peripheralId == BLE_TEST_DEVICE_MAC_ADDRESS) {
                handleFoundPeripheral(peripheralName, peripheralId)
            }
        } else {
            if (peripheralName == cachedBleDeviceName) {
                handleFoundPeripheral(peripheralName, peripheralId)
            }
        }
    }

    /**
     * prepare and initiate a connection operation to the found device.
     */
    handleFoundPeripheral = (peripheralName, peripheralId) => {
        logDebugWithLine(LOG_TAG, "<<< found my device (" + peripheralName + "). start to connect device")
        setBleDeviceFoundAtom(true)
        setBleDeviceNameAtom(peripheralName)
        setBleMacOrUuidAtom(peripheralId)

        if (bleScanningState) {
            this.stopScan().catch((e) => { outputErrorLog(LOG_TAG, e) })
        }
        this.connectDeviceWhenFound(peripheralId)
    }

    /**
     * connect ble device when it's found perfectly.
     * @param {string} peripheralId
     * @param {number} mtu
     */
    connectDeviceWhenFound = (peripheralId) => {
        bleManager.connect(peripheralId).then(() => {
            setBleConnectionStateAtom(true)
            this.requestMTU(peripheralId, 512)
            this.retrieveServices(peripheralId)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by connect of ble manager")

            setBleConnectionStateAtom(false)
            setBleDeviceFoundAtom(false)
            this.restartScan()
        })
    }

    /**
     * catch when the device scan is stopped.
     */
    onScanStopped = () => {
        logDebugWithLine(LOG_TAG, "<<< stopped device scan")

        // disables the flag indicating that the scan is in progress.
        setBleScanningStateAtom(false)
        this.restartScan()
    }

    /**
     * catch when device is disconnected.
     * @param {Any} peripheral 
     */
    onPeripheralDisconnecrted = (peripheral) => {
        logDebugWithLine(LOG_TAG, "<<< disconnected " + peripheral.name + " (" + peripheral.id + ")")
        this.releaseAllAtomStates()
    }

    /**
     * receive characteristic custom message that is sent from device.
     * @param {bytes} bleCustomMessage 
     */
    onCharacteristicChanged = (bleCustomMessage) => {

        const bleCustomBytes = bleCustomMessage.value
        const bleCustomBytesLength = bleCustomBytes.length

        logDebug(LOG_TAG, "-----------------------------------------------------------------------")
        logDebug(LOG_TAG, "<<< received characteristic custom message - start")
        logDebug(LOG_TAG, "peripheral: " + bleCustomMessage.peripheral)
        logDebug(LOG_TAG, "characteristic: " + bleCustomMessage.characteristic)
        logDebug(LOG_TAG, "bytes: " + bleCustomBytes)
        logDebug(LOG_TAG, "bytes length: " + bleCustomBytesLength)
        logDebug(LOG_TAG, "hex: " + convertBleCustomToHexData(bleCustomBytes))
        logDebug(LOG_TAG, "<<< received characteristic custom message - end")
        logDebug(LOG_TAG, "-----------------------------------------------------------------------")

        const randomValue = Math.random()
        const lastByteValue = bleCustomBytes[bleCustomBytesLength - 1]

        if (bleCustomBytesLength > 0 && (lastByteValue == 3 || lastByteValue == 4 || bleLogEnabled)) {
            setBleCharacteristcChange(
                "1. [Bytes]: " + bleCustomBytes + "\n\n"
                + "2. [Hex]: " + convertBleCustomToHexData(bleCustomBytes) + "\n"
                + "3. [String]: " + bytesToString(bleCustomBytes) + "\n"
                + "4. [Unique Id]: " + randomValue
            )
        }
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
                logDebug(LOG_TAG, "<<< there's no any connected peripheral. "
                    + "scanning is going to be starting after " + SCAN_DELAY_TIME + "")
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
            outputErrorLog(LOG_TAG, e + " occurred by getConnectedPeripherals of ble manager")
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
                logDebugWithLine(LOG_TAG, "<<< succeeded to connect " + peripheralId)

                setBleConnectionStateAtom(true)
                this.requestMTU(peripheralId, 512)
                this.retrieveServices(peripheralId)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by connect of ble manager")
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
                outputErrorLog(LOG_TAG, e + " occurred by stopNotification of ble manager")
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
                logDebugWithLine(LOG_TAG, "<<< succeeded to disconnect " + peripheralId)
                this.releaseAllAtomStates()
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by disconnect of ble manager")
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
            if (!bleBatteryUuidExistence && BATTERY_CHARACTERISTIC_UUID == characteristicUuid) {
                logDebugWithLine(LOG_TAG, "battery uuid NOT exist")
                fulfill()
                return
            }
            bleManager.startNotification(peripheralId, serviceUuid, characteristicUuid).then(() => {
                logDebugWithLine(LOG_TAG, "<<< succeeded to enable notification of "
                    + getFeatureNameAsUuid(characteristicUuid) + " : " + characteristicUuid)
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by startNotification of ble manager")
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
                outputErrorLog(LOG_TAG, e + " occurred by start of ble manager")
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
                logDebugWithLine(LOG_TAG, "<<< succeeded to enable bluetooth feature")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by enableBluetooth of ble manager")
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
            if (!bleBatteryUuidExistence) {
                fulfill("--")
                return
            }
            bleManager.read(cachedBleMacAddress, batteryserviceUuid, batterycharacteristicUuid).then((batteryLevel) => {
                logDebug(LOG_TAG, "<<< succeeded to get battery level-" + batteryLevel + "%")
                setBleBatteryStateAtom(batteryLevel)
                fulfill(batteryLevel)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by read of ble manager")
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
                const errorMessage = "ble scanning is being executed"
                outputErrorLog(LOG_TAG, ">>> " + errorMessage)
                reject(errorMessage)
                return
            }
            this.releaseAllAtomStates()

            let serviceUuids = []
            if (serviceUuid != null && serviceUuid != "" && serviceUuid != undefined) {
                serviceUuids.push(serviceUuid)

            } else {
                const errorMessage = "wrong service uuids"
                outputErrorLog(LOG_TAG, errorMessage)
                reject(errorMessage)
                return
            }

            setBleScanningStateAtom(true)

            this.enableBluetooth().then(() => {
                bleManager.scan(serviceUuids, duration, false).then(() => {
                    fulfill()

                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by scan of ble manager")
                    reject(e)
                })

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by enableBluetooth of ble manager")
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
                outputErrorLog(LOG_TAG, e + " occurred by stopScan of ble manager")
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
    requestMTU = (peripheralId, mtu = 512) => {
        return new Promise((fulfill, reject) => {
            bleManager.requestMTU(peripheralId, mtu).then((returnedMtu) => {
                logDebug(LOG_TAG, "<<< succeeded to request mtu (" + returnedMtu + ")")
                fulfill(returnedMtu)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by requestMtu of ble manager")
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
            const uuidList = getUuidList(peripheral)
            logDebug(LOG_TAG, "<<< uuidList: " + uuidList)

            bleBatteryUuidExistence = uuidList.includes(BATTERY_CHARACTERISTIC_UUID)
            logDebug(LOG_TAG, ">>> is there ble battery characteristic uuid ?: " + bleBatteryUuidExistence)

            executeEnableAllNotificationPromise(peripheralId)

        }).catch((e) => outputErrorLog(LOG_TAG, e + " occurred by retrieveServices of ble manager"))
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
                logDebug(LOG_TAG, ">>> scanning is still in progress. stop it")
                bleManager.stopScan().catch((e) => { outputErrorLog(LOG_TAG, e) })
            }
            this.enableAllNotificationAtoms()
            this.releaseAtomStateAfterCompleted()

            storeBleDeviceMacAddress(peripheralId).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to store ble device mac address")
                setBleConnectionCompleteStateAtom(true)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + "occurred by storeBleDeviceMacAddress in enableAllNotificationPromise")
            })

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by enableAllNotificationPromise")
        })
    }

    /**
     * release all atom atates.
     * case. when device is disconnected. / before the device scan.
     */
    releaseAllAtomStates = () => {
        // connection state. (only bleManager.connect()'s result).
        setBleConnectionStateAtom(false)

        // connection complete state (including enabling notification steps).
        setBleConnectionCompleteStateAtom(false)

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
     * send custom characteristic message.
     * @param {bytes} bleMessage
     * @returns {Promise}
     */
    sendBleCustomMessage = (bleMessage) => {
        return new Promise((fulfill, reject) => {
            bleManager.retrieveServices(cachedBleMacAddress).then((peripheral) => {
                logDebug(LOG_TAG, ">>> execute writeWithoutResponse api")

                bleManager.writeWithoutResponse(
                    peripheral.id,
                    SERVICE_UUID,
                    RX_CHARACTERISTIC_UUID,
                    bleMessage).then(() => {
                        const responseMessage =
                            "<<< succeeded to write ble custom message\n\n"
                            + "1. [Peripheral Id]: " + peripheral.id + ",\n\n2. [Sequence Id]: " + bleSequenceId
                            + ",\n\n3. [Sent-Bytes]: " + bleMessage + ",\n\n4. [Sent-Bytes-Length]: " + bleMessage.length
                            + ",\n\n5. [Sent-Hex]: " + byteToHex(bleMessage)

                        logDebug(LOG_TAG, responseMessage)

                        setBleWriteResponse(responseMessage)
                        setBleSequenceId(bleSequenceId + 1)
                        setBleAuthResultState(true)
                        fulfill()

                    }).catch((e) => {
                        outputErrorLog(LOG_TAG, e + " occurred by writeWithoutResponse of ble manager")
                        reject(e)
                    })

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by retrieveServices of ble manager")
                reject(e)
            })
        })
    }

    /**
     * get ble custom message to send.
     * @param {string} action
     */
    getBleMessageAsAction = (action) => {
        switch (action) {
            case ACTION_AUTHENTICATE:
            case ACTION_SYNC:
            case ACTION_DISCONNECT:
            case ACTION_UPGRADE_FIRMWARE:
            default:
                return null
        }
    }

    /**
     * get cached device name.
     * @returns {string}
     */
    getDeviceName = () => {
        return cachedBleDeviceName
    }

    /**
     * get cached device mac address.
     * @returns {string}
     */
    getPeripheralId = () => {
        return cachedBleMacAddress
    }

    /**
     * enable or disable ble log characteristic.
     * @param {boolean} enable
     */
    enableBleLog = (enable) => {
        bleLogEnabled = enable
    }

    /**
     * get current log enable state.
     * @returns {boolean}
     */
    getCurrentLogEnableState = () => {
        return bleLogEnabled
    }

    /**
     * change cached device information.
     * @param {string} deviceName
     * @param {string} macAddress
     * @returns {Promise}
     */
    changeCachedDeviceInformation = (deviceName, macAddress) => {
        return new Promise((fulfill, reject) => {
            storeBleDeviceName(deviceName).then(() => {
                storeBleDeviceMacAddress(macAddress).then(() => {
                    fulfill()

                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by storeBleDeviceMacAddress")
                    reject(e)
                })

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by storeBleDeviceName")
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

        getInstanceId().then((deviceUuid) => {
            cachedDeviceUuid = deviceUuid.toString()
            logDebug(LOG_TAG, "cachedDeviceUuid: " + cachedDeviceUuid)
        })

        return () => { }
    }, [cachedBleDeviceName, cachedBleMacAddress, cachedDeviceUuid])

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
        sendBleCustomMessage,
        requestMTU,
        getDeviceName,
        getPeripheralId,
        enableBleLog,
        getCurrentLogEnableState,
        changeCachedDeviceInformation
    }
}

/**
 * export bluetooth repository object.
 */
export default BleRepository