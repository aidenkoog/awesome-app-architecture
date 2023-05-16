import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from '../Constants'

const KEY_USER_PROFILE = Constants.STORAGE.KEY_USER_PROFILE

const KEY_PROFILE_NAME = Constants.STORAGE.KEY_PROFILE_NAME
const KEY_PROFILE_IMAGE_URL = Constants.STORAGE.KEY_PROFILE_IMAGE_URL
const KEY_PROFILE_GENDER = Constants.STORAGE.KEY_PROFILE_GENDER
const KEY_PROFILE_BIRTHDAY = Constants.STORAGE.KEY_PROFILE_BIRTHDAY
const KEY_PROFILE_HEIGHT = Constants.STORAGE.KEY_PROFILE_HEIGHT
const KEY_PROFILE_WEIGHT = Constants.STORAGE.KEY_PROFILE_WEIGHT

const KEY_BLE_DEVICE_NAME = Constants.STORAGE.KEY_BLE_DEVICE_NAME
const KEY_BLE_DEVICE_MAC_ADDRESS = Constants.STORAGE.KEY_BLE_DEVICE_MAC_ADDRESS

const KEY_DEVICE_REGISTRATION_FLAG = Constants.STORAGE.KEY_DEVICE_REGISTRATION_FLAG

/**
 * store user profile data.
 * ( imageUrl, name, gender, birthday, height, weight )
 * @param {Any} userProfile 
 * @returns {Promise}
 */
export const storeUserProfileData = async (userProfile) => {
    await AsyncStorage.setItem(KEY_USER_PROFILE, JSON.stringify(userProfile))
}

/**
 * get user profile data.
 * ( imageUrl, name, gender, birthday, height, weight )
 * @returns {Promise}
 */
export const getUserProfileData = async () => {
    return AsyncStorage.getItem(KEY_USER_PROFILE)
}

/**
 * @deprecated 
 * store profile name.
 * @param {string} name 
 * @returns {Promise}
 */
export const storeProfileName = async (name) => {
    await AsyncStorage.setItem(KEY_PROFILE_NAME, name)
}

/**
 * @deprecated 
 * get profile name from storage.
 * @returns {Promise}
 */
export const getProfileName = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_NAME)
}

/**
 * @deprecated 
 * store profile image url.
 * @param {string} imageUrl
 * @returns {Promise}
 */
export const storeProfileImageUrl = async (imageUrl) => {
    await AsyncStorage.setItem(KEY_PROFILE_IMAGE_URL, imageUrl)
}

/**
 * @deprecated 
 * get profile image url from storage.
 * @returns {Promise}
 */
export const getProfileImageUrl = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_IMAGE_URL)
}

/**
 * @deprecated 
 * store profile gender.
 * @param {number} gender 
 * @returns {Promise}
 */
export const storeProfileGender = async (gender) => {
    await AsyncStorage.setItem(KEY_PROFILE_GENDER, gender)
}

/**
 * @deprecated
 * get profile gender from storage.
 * @returns {Promise}
 */
export const getProfileGender = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_GENDER)
}

/**
 * @deprecated
 * store profile birthday.
 * @param {string} birthday 
 */
export const storeProfileBirthday = async (birthday) => {
    await AsyncStorage.setItem(KEY_PROFILE_BIRTHDAY, birthday)
}

/**
 * @deprecated
 * get profile birthday from storage.
 * @returns {Promise}
 */
export const getProfileBirthday = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_BIRTHDAY)
}

/**
 * @deprecated
 * store profile height.
 * @param {number} height 
 */
export const storeProfileHeight = async (height) => {
    await AsyncStorage.setItem(KEY_PROFILE_HEIGHT, height)
}

/**
 * @deprecated
 * get profile height from storage.
 * @returns {Promise}
 */
export const getProfileHeight = async () => {
    return AsyncStorage.getItem(KEY_PROFILE_HEIGHT)
}

/**
 * @deprecated
 * store profile weight.
 * @param {number} weight 
 * @returns {Promise}
 */
export const storeProfileWeight = async (weight) => {
    await AsyncStorage.setItem(KEY_PROFILE_WEIGHT, weight)
}

/**
 * @deprecated
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
 * @returns {Promise}
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
 * @returns {Promise}
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

/**
 * store flag that checks if device registration is completed or not.
 * @param {boolean} registered 
 * @returns {Promise}
 * Ref. AsyncStorage cannot store boolean type's value.
 */
export const storeIsDeviceRegistered = async (registered) => {
    await AsyncStorage.setItem(KEY_DEVICE_REGISTRATION_FLAG, registered == null ? registered : registered.toString())
}

/**
 * get flag that checks if device registration is completed or not.
 * @returns {Promise}
 */
export const getIsDeviceRegistered = async () => {
    return AsyncStorage.getItem(KEY_DEVICE_REGISTRATION_FLAG)
}