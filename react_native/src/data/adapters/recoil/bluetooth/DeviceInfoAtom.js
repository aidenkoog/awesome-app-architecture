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