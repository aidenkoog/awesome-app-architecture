import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from '../Constants'
import { logDebug, outputErrorLog } from '../logger/Logger'

const KEY_PROFILE_NAME = Constants.STORAGE.KEY_PROFILE_NAME
const KEY_PROFILE_IMAGE_URL = Constants.STORAGE.KEY_PROFILE_IMAGE_URL
const KEY_PROFILE_GENDER = Constants.STORAGE.KEY_PROFILE_GENDER
const KEY_PROFILE_BIRTHDAY = Constants.STORAGE.KEY_PROFILE_BIRTHDAY
const KEY_PROFILE_HEIGHT = Constants.STORAGE.KEY_PROFILE_HEIGHT
const KEY_PROFILE_WEIGHT = Constants.STORAGE.KEY_PROFILE_WEIGHT

const KEY_BLE_DEVICE_NAME = Constants.STORAGE.KEY_BLE_DEVICE_NAME
const KEY_BLE_DEVICE_MAC_ADDRESS = Constants.STORAGE.KEY_BLE_DEVICE_MAC_ADDRESS

let cachedBleDeviceName = null
let cachedBleMacAddress = null

const LOG_TAG = Constants.LOG.STORAGE_LOG_TAG

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
 * store profile image url.
 * @param {string} imageUrl 
 */
export const storeProfileImageUrl = async (imageUrl) => {
    await AsyncStorage.setItem(KEY_PROFILE_IMAGE_URL, imageUrl)
}

/**
 * get profile image url from storage.
 * @returns {Promise}
 */
export const getProfileImageUrl = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_IMAGE_URL)
}

/**
 * store profile gender.
 * @param {number} gender 
 */
export const storeProfileGender = async (gender) => {
    await AsyncStorage.setItem(KEY_PROFILE_GENDER, gender)
}

/**
 * get profile gender from storage.
 * @returns {Promise}
 */
export const getProfileGender = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_GENDER)
}

/**
 * store profile birthday.
 * @param {string} birthday 
 */
export const storeProfileBirthday = async (birthday) => {
    await AsyncStorage.setItem(KEY_PROFILE_BIRTHDAY, birthday)
}

/**
 * get profile birthday from storage.
 * @returns {Promise}
 */
export const getProfileBirthday = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_BIRTHDAY)
}

/**
 * store profile height.
 * @param {number} height 
 */
export const storeProfileHeight = async (height) => {
    await AsyncStorage.setItem(KEY_PROFILE_HEIGHT, height)
}

/**
 * get profile height from storage.
 * @returns {Promise}
 */
export const getProfileHeight = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_HEIGHT)
}

/**
 * store profile weight.
 * @param {number} weight 
 */
export const storeProfileWeight = async (weight) => {
    await AsyncStorage.setItem(KEY_PROFILE_WEIGHT, weight)
}

/**
 * get profile weight from storage.
 * @returns {Promise}
 */
export const getProfileWeight = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_WEIGHT)
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