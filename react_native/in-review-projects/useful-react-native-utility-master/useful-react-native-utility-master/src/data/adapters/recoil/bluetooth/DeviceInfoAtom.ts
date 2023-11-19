import { atom } from 'recoil'
import Constants from '../../../../utils/Constants'

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

/**
 * represent if ble custom message is sent to device successfully.
 */
export const bleWriteResponseAtom = atom({
    key: 'bleWriteResponseAtom',
    default: Constants.COMMON.DEFAULT_DATA
})

/**
 * store the data received from the BLE device.
 */
export const bleCharacteristcChangeAtom = atom({
    key: 'bleCharacteristcChangeAtom',
    default: Constants.COMMON.DEFAULT_DATA
})

/**
 * store device information received from sync command.
 */
export const bleDeviceSettingInfoAtom = atom({
    key: 'bleDeviceSettingInfoAtom',
    default: {
        // integrated circuit card identifier.
        iccid: '',
        btMacAddress: '',
        wifiMacAddress: '',
        modemSwVersion: '',
        modemHwVersion: '',
        sensorSwVersion: '',
        batteryLevel: '--'
    }
})