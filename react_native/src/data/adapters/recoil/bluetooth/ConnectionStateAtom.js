import { atom } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * represent bluetooth gatt connection state.
 */
export const bleConnectionStateAtom = atom({
    key: 'bleConnectionStateAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * represent if services corresponding to mac or uuid (ios) are retrieved.
 */
export const bleServiceRetrievedAtom = atom({
    key: 'bleServiceRetrievedAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate the saved imei obtained after qr scan.
 */
export const bleDeviceNameAtom = atom({
    key: 'bleDeviceNameAtom',
    default: Constants.COMMON.DEFAULT_DATA,
})

/**
 * represent mac or uuid (ios) of the connected bluetooth device.
 */
export const bleMacOrUuidAtom = atom({
    key: 'bleMacOrUuidAtom',
    default: Constants.COMMON.DEFAULT_DATA,
})