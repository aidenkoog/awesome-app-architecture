import { atom, selector } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * provides whether a scan operation is currently being performed or not.
 */
export const bleScanningStateAtom = atom({
    key: 'bleScanningStateAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * custom selector about scanning state.
 */
export const bleScanningStateSelector = selector({
    key: 'bleScanningStateSelector',
    get: ({ get }) => {
        return get(bleScanningStateAtom)
    }
})

/**
 * indicate list of scanned bluetooth devices.
 */
export const foundBleDeviceListAtom = atom({
    key: 'foundBleDeviceListAtom',
    default: Constants.COMMON.DEFAULT_LIST_STATE,
})

/**
 * represent whether ble device has been found.
 */
export const bleDeviceFoundAtom = atom({
    key: 'bleDeviceFoundAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})