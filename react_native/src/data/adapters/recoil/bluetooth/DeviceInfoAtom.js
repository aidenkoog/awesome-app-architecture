import { atom } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * represent device info.
 */
export const bleDeviceInfoAtom = atom({
    key: 'bleDeviceInfoAtom',
    default: {
        info1: Constants.COMMON.DEFAULT_DATA,
        info2: Constants.COMMON.DEFAULT_DATA,
        info3: Constants.COMMON.DEFAULT_DATA,
    },
})

/**
 * represent authenticating result.
 */
export const bleAuthResultAtom = atom({
    key: 'bleAuthResultAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * represent sequence id that is used when sending custom data to device.
 */
export const bleSequenceIdAtom = atom({
    key: 'bleSequenceIdAtom',
    default: Constants.COMMON.DEFAULT_INT_VALUE + 1
})