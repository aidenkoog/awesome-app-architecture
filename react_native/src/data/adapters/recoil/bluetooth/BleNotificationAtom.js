import { atom } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * indicate whether or not the notification activation about tx uuid is successful.
 */
export const bluetoothTxUuidNotificationEnabled = atom({
    key: 'bluetoothTxUuidNotificationEnabled',
    default: Constants.COMMON.DEFAULT_STATE,
})

/**
 * indicate whether or not the notification activation about flow control uuid is successful.
 */
export const bluetoothFlowControlUuidNotificationEnabled = atom({
    key: 'bluetoothFlowControlUuidNotificationEnabled',
    default: Constants.COMMON.DEFAULT_STATE,
})