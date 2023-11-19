import { ToastAndroid, Platform } from 'react-native'
import { outputErrorLog } from '../logger/Logger'

const LOG_TAG: string = "ToastUtil"

/**
 * show toast popup.
 * @param {string} message 
 * @param {number} durationType 
 */
export const showToast = (message: string, durationType: number = ToastAndroid.LONG) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, durationType)
    } else {
        outputErrorLog(LOG_TAG, "current platform: ios, cannot show toast ui")
    }
}