import { atom, selector } from 'recoil'
import Constants from '../../../utils/Constants'

/*-----------------------------------------------------------------------------------
 * necessary bluetooth related states.
 * 1.  scanning.
 * 2.  found device.
 * 3.  ble connection.
 * 4.  ble device imei information.
 * 5.  retrieve service.
 * 6.  tx uuid notification enable.
 * 7.  flow control uuid notification enable.
 * 8.  battery service uuid notification enable.
 * 9.  scanned device list.
 * 10. device info ( info 1, info 2, info 3 etc )
 * 11. ble device mac address or uuid (ios).
 *----------------------------------------------------------------------------------*/

/**
 * provides whether a scan operation is currently being performed or not.
 */
let bluetoothScanningState = atom({
    key: 'bluetoothScanningState',
    default: Constants.COMMON.DEFAULT_STATE,
})

let scanningStateSelector = selector({
    key: 'scanningStateSelector',
    get: ({ get }) => {
        return get(bluetoothScanningState)
    }
})

/**
 * represent whether ble device has been found.
 */
let bluetoothDeviceFound = atom({
    key: 'bluetoothDeviceFound',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * represent bluetooth gatt connection state.
 */
let bluetoothConnectionState = atom({
    key: 'bluetoothConnectionState',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate the saved imei obtained after qr scan.
 */
let bluetoothDeviceImei = atom({
    key: 'bluetoothDeviceImei',
    default: Constants.COMMON.DEFAULT_DATA,
})

/**
 * represent if services corresponding to mac or uuid (ios) are retrieved.
 */
let bluetoothServiceRetrieved = atom({
    key: 'bluetoothServiceRetrieved',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate whether or not the notification activation about tx uuid is successful.
 */
let bluetoothTxUuidNotificationEnabled = atom({
    key: 'bluetoothTxUuidNotificationEnabled',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate whether or not the notification activation about flow control uuid is successful.
 */
let bluetoothFlowControlUuidNotificationEnabled = atom({
    key: 'bluetoothFlowControlUuidNotificationEnabled',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate list of scanned bluetooth devices.
 */
let scannedBluetoothDeviceList = atom({
    key: 'scannedBluetoothDeviceList',
    default: Constants.COMMON.DEFAULT_LIST_STATE,
})

/**
 * represent device info.
 */
let bluetoothDeviceInfo = atom({
    key: 'bluetoothDeviceInfo',
    default: {
        info1: Constants.COMMON.DEFAULT_DATA,
        info2: Constants.COMMON.DEFAULT_DATA,
        info3: Constants.COMMON.DEFAULT_DATA,
    },
})

/**
 * represent mac or uuid (ios) of the connected bluetooth device.
 */
let bluetoothMacOrUuidAtom = atom({
    key: 'bluetoothMacOrUuidAtom',
    default: Constants.COMMON.DEFAULT_DATA,
})

export default {
    bluetoothScanningState,
    scanningStateSelector,
    bluetoothDeviceFound,
    bluetoothConnectionState,
    bluetoothDeviceImei,
    bluetoothServiceRetrieved,
    bluetoothTxUuidNotificationEnabled,
    bluetoothFlowControlUuidNotificationEnabled,
    scannedBluetoothDeviceList,
    bluetoothDeviceInfo,
    bluetoothMacOrUuidAtom
}