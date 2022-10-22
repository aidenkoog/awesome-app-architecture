import { atom } from 'recoil';
import Constants from '../../../utils/Constants';

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
export const bluetoothScanningState = atom({
    key: 'bluetoothScanningState',
    default: Constants.COMMON.DEFAULT_STATE,
});

/**
 * represent whether ble device has been found.
 */
export const bluetoothDeviceFound = atom({
    key: 'bluetoothDeviceFound',
    default: Constants.COMMON.DEFAULT_STATE,
});

/**
 * represent bluetooth gatt connection state.
 */
export const bluetoothConnectionState = atom({
    key: 'bluetoothConnectionState',
    default: Constants.COMMON.DEFAULT_STATE,
});

/**
 * indicate the saved imei obtained after qr scan.
 */
export const bluetoothDeviceImei = atom({
    key: 'bluetoothDeviceImei',
    default: Constants.COMMON.DEFAULT_DATA,
});

/**
 * represent if services corresponding to mac or uuid (ios) are retrieved.
 */
export const bluetoothServiceRetrieved = atom({
    key: 'bluetoothServiceRetrieved',
    default: Constants.COMMON.DEFAULT_STATE,
});

/**
 * indicate whether or not the notification activation about tx uuid is successful.
 */
export const bluetoothTxUuidNotificationEnabled = atom({
    key: 'bluetoothTxUuidNotificationEnabled',
    default: Constants.COMMON.DEFAULT_STATE,
});

/**
 * indicate whether or not the notification activation about flow control uuid is successful.
 */
export const bluetoothFlowControlUuidNotificationEnabled = atom({
    key: 'bluetoothFlowControlUuidNotificationEnabled',
    default: Constants.COMMON.DEFAULT_STATE,
});

/**
 * indicate list of scanned bluetooth devices.
 */
export const scannedBluetoothDeviceList = atom({
    key: 'scannedBluetoothDeviceList',
    default: Constants.COMMON.DEFAULT_LIST_STATE,
});

/**
 * represent device info.
 */
export const bluetoothDeviceInfo = atom({
    key: 'bluetoothDeviceInfo',
    default: {
        info1: Constants.COMMON.DEFAULT_DATA,
        info2: Constants.COMMON.DEFAULT_DATA,
        info3: Constants.COMMON.DEFAULT_DATA,
    },
});

/**
 * represent mac or uuid (ios) of the connected bluetooth device.
 */
export const bluetoothMacOrUuidAtom = atom({
    key: 'bluetoothMacOrUuidAtom',
    default: Constants.COMMON.DEFAULT_DATA,
});
