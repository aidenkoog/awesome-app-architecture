import { atom } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * indicate whether or not the notification activation about tx uuid is successful.
 */
export const bleTxUuidNotificationStateAtom = atom({
    key: 'bleTxUuidNotificationStateAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate whether or not the notification activation about flow control uuid is successful.
 */
export const bleFlowControlUuidNotificationStateAtom = atom({
    key: 'bleFlowControlUuidNotificationStateAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate whether or not the notification activation about battery uuid is successful.
 */
export const bleBatteryUuidNotificationStateAtom = atom({
    key: 'bleBatteryUuidNotificationStateAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * represent if ble battery uuid exists.
 * currently, it's not used.
 * @deprecated
 */
export const bleBatteryUuidExistenceStateAtom = atom({
    key: 'bleBatteryUuidExistenceStateAtom',
    default: Constants.COMMON.DEFAULT_STATE,
})