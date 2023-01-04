import { ToastAndroid, Platform, AlertIOS, } from 'react-native'

/**
 * show toast popup.
 * @param {string} message 
 * @param {number} durationType 
 */
export const showToast = (message, durationType = ToastAndroid.LONG) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, durationType)
    } else {
        AlertIOS.alert(message)
    }
}