import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from './Constants'

/**
 * [ storage utility ]
 * function's prefix naming rule. GET: get, SET: store
 * example. getProfileName, storeProfileName
 * 
 * [ notice. ]
 * use Promise return style.
 * example. 
 * getProfileName().then(() => {}).catch((e) => {})
 */

const KEY_PROFILE_NAME = Constants.STORAGE.KEY_PROFILE_NAME
const KEY_BLE_DEVICE_NAME = Constants.STORAGE.KEY_BLE_DEVICE_NAME
const KEY_BLE_DEVICE_MAC_ADDRESS = Constants.STORAGE.KEY_BLE_DEVICE_MAC_ADDRESS

/**
 * store profile name.
 * @param {string} name 
 */
export const storeProfileName = async (name) => {
    await AsyncStorage.setItem(KEY_PROFILE_NAME, name)
}

/**
 * get profile name from storage.
 * @returns {Promise}
 */
export const getProfileName = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_NAME)
}

/**
 * store ble device name.
 * device name is saved when qr scan is executed first.
 * @param {string} name 
 */
export const storeBleDeviceName = async (name) => {
    await AsyncStorage.setItem(KEY_BLE_DEVICE_NAME, name)
}

/**
 * get ble device name from storage.
 * @returns {Promise}
 */
export const getBleDeviceName = async () => {
    return AsyncStorage.getItem(KEY_BLE_DEVICE_NAME)
}

/**
 * store ble device mac address.
 * @param {string} macAddress 
 */
export const storeBleDeviceMacAddress = async (address) => {
    await AsyncStorage.setItem(KEY_BLE_DEVICE_MAC_ADDRESS, address)
}


/**
 * get ble device mac address from storage.
 * @returns {Promise}
 */
export const getBleDeviceMacAddress = async () => {
    return AsyncStorage.getItem(KEY_BLE_DEVICE_MAC_ADDRESS)
}

