import { atom, selector } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * provides whether a scan operation is currently being performed or not.
 */
export const bluetoothScanningState = atom({
    key: 'bluetoothScanningState',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * custom selector about scanning state.
 */
export const scanningStateSelector = selector({
    key: 'scanningStateSelector',
    get: ({ get }) => {
        return get(bluetoothScanningState)
    }
})

/**
 * indicate list of scanned bluetooth devices.
 */
export const scannedBluetoothDeviceList = atom({
    key: 'scannedBluetoothDeviceList',
    default: Constants.COMMON.DEFAULT_LIST_STATE,
})

/**
 * represent whether ble device has been found.
 */
export const bluetoothDeviceFound = atom({
    key: 'bluetoothDeviceFound',
    default: Constants.COMMON.DEFAULT_STATE,
})