import { atom } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * represent bluetooth gatt connection state.
 */
export const bluetoothConnectionState = atom({
    key: 'bluetoothConnectionState',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * represent if services corresponding to mac or uuid (ios) are retrieved.
 */
export const bluetoothServiceRetrieved = atom({
    key: 'bluetoothServiceRetrieved',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate the saved imei obtained after qr scan.
 */
export const bluetoothDeviceImei = atom({
    key: 'bluetoothDeviceImei',
    default: Constants.COMMON.DEFAULT_DATA,
})

/**
 * represent mac or uuid (ios) of the connected bluetooth device.
 */
export const bluetoothMacOrUuidAtom = atom({
    key: 'bluetoothMacOrUuidAtom',
    default: Constants.COMMON.DEFAULT_DATA,
})