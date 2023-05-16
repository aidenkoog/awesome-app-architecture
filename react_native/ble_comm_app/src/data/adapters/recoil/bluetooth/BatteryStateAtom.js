import { atom } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * represent bluetooth device battery state.
 */
export const bleBatteryStateAtom = atom({
    key: 'bleBatteryStateAtom',
    default: Constants.COMMON.DEFAULT_INT_VALUE,
})