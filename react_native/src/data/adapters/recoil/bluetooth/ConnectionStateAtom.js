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
 * represent if all bluetooth connection job is completed.
 */
export const bleConnectionCompleteStateAtom = atom({
    key: 'bleConnectionCompleteStateAtom',
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

/**
 * represent if bluetooth disconnection job is succeeded or not.
 */
export const bleDisconnectionSuccessAtom = atom({
    key: 'bleDisconnectionSuccessAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})