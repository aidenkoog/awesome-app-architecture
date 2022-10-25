import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from './Constants'
import { logDebug } from './Logger'

/**
 * storage utility
 * rule. GET: get, SET: store
 * example. getProfileName, storeProfileName
 */

const LOG_TAG = Constants.LOG.STORAGE_LOG_TAG
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
 * @returns {string}
 */
export const getProfileName = async () => {
    const profileName = await AsyncStorage.getItem(KEY_PROFILE_NAME)
    logDebug(LOG_TAG, "<<< profileName: " + profileName)
    return profileName
}

/**
 * store ble device name.
 * device name is saved when qr scan is executed first.
 * @param {string} name 
 */
export const storeBleDeviceNameFromQrScan = async (name) => {
    await AsyncStorage.setItem(KEY_BLE_DEVICE_NAME, name)
}

/**
 * get ble device name from storage.
 * @returns {string}
 */
export const getBleDeviceNameFromQrScan = async () => {
    const bleDeviceName = await AsyncStorage.getItem(KEY_BLE_DEVICE_NAME)
    logDebug(LOG_TAG, "<<< bleDeviceName: " + bleDeviceName)
    return bleDeviceName
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
 * @returns {string}
 */
export const getBleDeviceMacAddress = async () => {
    const bleDeviceMacAddress = await AsyncStorage.getItem(KEY_BLE_DEVICE_MAC_ADDRESS)
    logDebug(LOG_TAG, "<<< bleDeviceMacAddress: " + bleDeviceMacAddress)
    return bleDeviceMacAddress
}

