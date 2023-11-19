import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { Platform, PermissionsAndroid } from "react-native"
import Constants from "../Constants"
import { logDebug, outputErrorLog } from "../logger/Logger"
import { Metrics } from "../theme"

/**
 * indicate whether the user accepts the permission required before using the bluetooth module.
 */
const ACCEPTED = Constants.BT.BT_PERMISSION_ACCEPTED
const REJECTED = Constants.BT.BT_PERMISSION_REJECTED

/**
 * android permissions.
 */
const ACCESS_FINE_LOCATION_PERMISSION = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
const CALL_PHONE_PERMISSION = PermissionsAndroid.PERMISSIONS.CALL_PHONE
const SEND_SMS_PERMISSION = PermissionsAndroid.PERMISSIONS.SEND_SMS
const READ_CONTACTS_PERMISSION = PermissionsAndroid.PERMISSIONS.READ_CONTACTS

/**
 * declare log tag.
 */
const LOG_TAG = Constants.LOG.PERMISSION_LOG_TAG

/**
 * check permissions related to bluetooth module.
 * @param {any} onResult 
 */
export const checkBluetoothPermission = (onResult: any) => {
    if (Platform.OS == "android") {
        if (Platform.Version >= 23) {
            invokePermissionCheck(ACCESS_FINE_LOCATION_PERMISSION, (accepted: boolean) => {
                onResult(accepted)
            })
        }
    } else {
        onResult(ACCEPTED)
    }
}

/**
 * check the necessary permission when reading device phone number information.
 * @param {any} onResult 
 */
export const checkReadContactPermission = (onResult: any) => {
    invokePermissionCheck(READ_CONTACTS_PERMISSION, (accepted: boolean) => {
        onResult(accepted)
    })
}

/**
 * check call phone permission.
 * @param {any} onResult 
 */
export const checkCallPhonePermission = (onResult: any) => {
    invokePermissionCheck(CALL_PHONE_PERMISSION, (accepted: boolean) => {
        onResult(accepted)
    })
}

/**
 * check send sms permission.
 * @param {callback} onResult 
 */
export const checkSendSmsPermission = (onResult: any) => {
    invokePermissionCheck(SEND_SMS_PERMISSION, (accepted: boolean) => {
        onResult(accepted)
    })
}

/**
 * invoke checking and requesting the android permission.
 * @param {any} permission 
 * @param {any} onResult 
 */
const invokePermissionCheck = (permission: any, onResult: any) => {
    PermissionsAndroid.check(permission).then((permitted) => {
        if (permitted) {
            logDebug(LOG_TAG, `<<< user had already accepted permission (${permission})`)
            onResult(ACCEPTED)

        } else {
            PermissionsAndroid.request(permission).then((permitted) => {
                permitted ? onResult(ACCEPTED) : onResult(REJECTED)
            })
        }
    })
}

/**
 * ask the user to accept the camera permission.
 * @return {Promise}
 */
export const requestCameraPermission = (): Promise<any> => {
    return new Promise((fulfill, reject) => {
        if (Metrics.IS_IOS) {
            request(PERMISSIONS.IOS.CAMERA).then(result => {
                if (result === RESULTS.GRANTED) {
                    fulfill(true)
                } else {
                    fulfill(false)
                }
            }).catch((e) => {
                reject(e)
            })
        } else {
            request(PERMISSIONS.ANDROID.CAMERA).then(result => {
                if (result === RESULTS.GRANTED) {
                    fulfill(true)
                } else {
                    fulfill(false)
                }
            }).catch(e => {
                outputErrorLog(LOG_TAG, `${e} occurred by checking android camera permission`)
                reject(e)
            })
        }
    })
}

/**
 * checkl if camera permission is accepted or not.
 * @return {boolean}
 */
export const checkCameraPermission = async (): Promise<any> => {
    return new Promise((fulfill, reject) => {
        if (Metrics.IS_IOS) {
            check(PERMISSIONS.IOS.CAMERA)
                .then((result) => {
                    if (result === RESULTS.GRANTED) {
                        fulfill(true)

                    } else if (result === RESULTS.DENIED) {
                        requestCameraPermission().then((granted: boolean) => {
                            fulfill(granted)

                        }).catch((e) => {
                            reject(e)
                        })
                    } else {
                        fulfill(false)
                    }
                })
                .catch((e) => {
                    outputErrorLog(LOG_TAG, `${e} occurred by checking ios camera permission`)
                    reject(e)
                })
        } else {
            check(PERMISSIONS.ANDROID.CAMERA)
                .then((result) => {
                    if (result === RESULTS.GRANTED) {
                        fulfill(true)
                    } else if (result === RESULTS.DENIED) {
                        requestCameraPermission().then((granted) => {
                            fulfill(granted)
                        }).catch((e) => {
                            reject(e)
                        })
                    } else {
                        fulfill(false)
                    }
                })
                .catch((e) => {
                    outputErrorLog(LOG_TAG, `${e} occurred by checking android camera permission`)
                    reject(e)
                })
        }
    })
}