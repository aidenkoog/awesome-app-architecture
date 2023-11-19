import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from '../Constants'

const KEY_USER_PROFILE = Constants.STORAGE.KEY_USER_PROFILE
const KEY_BLE_DEVICE_NAME = Constants.STORAGE.KEY_BLE_DEVICE_NAME
const KEY_BLE_DEVICE_MAC_ADDRESS = Constants.STORAGE.KEY_BLE_DEVICE_MAC_ADDRESS
const KEY_DEVICE_REGISTRATION_FLAG = Constants.STORAGE.KEY_DEVICE_REGISTRATION_FLAG

/**
 * store user profile data.
 * @param {any} userProfile 
 * @return {Promise}
 */
export const storeUserProfileData = async (userProfile: any): Promise<any> => {
    await AsyncStorage.setItem(KEY_USER_PROFILE, JSON.stringify(userProfile))
}

/**
 * get user profile data.
 * @return {Promise}
 */
export const getUserProfileData = async (): Promise<any> => {
    return AsyncStorage.getItem(KEY_USER_PROFILE)
}

/**
 * store ble device name.
 * device name is saved when qr scan is executed first.
 * @param {string} name 
 * @return {Promise}
 */
export const storeBleDeviceName = async (name: string): Promise<any> => {
    await AsyncStorage.setItem(KEY_BLE_DEVICE_NAME, name)
}

/**
 * get ble device name from storage.
 * @return {Promise}
 */
export const getBleDeviceName = async (): Promise<any> => {
    return AsyncStorage.getItem(KEY_BLE_DEVICE_NAME)
}

/**
 * store ble device mac address.
 * @param {string} macAddress 
 * @return {Promise}
 */
export const storeBleDeviceMacAddress = async (macAddress: string): Promise<any> => {
    await AsyncStorage.setItem(KEY_BLE_DEVICE_MAC_ADDRESS, macAddress)
}

/**
 * get ble device mac address from storage.
 * @return {Promise}
 */
export const getBleDeviceMacAddress = async (): Promise<any> => {
    return AsyncStorage.getItem(KEY_BLE_DEVICE_MAC_ADDRESS)
}

/**
 * store flag that checks if device registration is completed or not.
 * @param {boolean} registered 
 * @return {Promise}
 * Ref. AsyncStorage cannot store boolean type's value.
 */
export const storeIsDeviceRegistered = async (registered: boolean): Promise<any> => {
    await AsyncStorage.setItem(KEY_DEVICE_REGISTRATION_FLAG,
        registered == null ? registered : registered.toString())
}

/**
 * get flag that checks if device registration is completed or not.
 * @return {Promise}
 */
export const getIsDeviceRegistered = async (): Promise<any> => {
    return AsyncStorage.getItem(KEY_DEVICE_REGISTRATION_FLAG)
}