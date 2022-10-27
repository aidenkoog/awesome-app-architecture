import { Platform, PermissionsAndroid } from "react-native"
import Constants from "./Constants"
import { logDebug } from "./Logger"

/**
 * indicate whether the user accepts the permission required before using the bluetooth module.
 */
const ACCEPTED = Constants.BT.BT_PERMISSION_ACCEPTED
const REJECTED = Constants.BT.BT_PERMISSION_REJECTED

/**
 * access fine location permission.
 */
const ACCESS_FILE_LOCATION_PERMISSION = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION

/**
 * declare log tag.
 */
const LOG_TAG = Constants.LOG.PERMISSION_LOG_TAG

/**
 * check permissions related to bluetooth module.
 * @param {callback} onResult 
 */
export const checkBluetoothPermission = (onResult) => {
    if (Platform.OS == "android") {
        if (Platform.Version >= 23) {
            PermissionsAndroid.check(ACCESS_FILE_LOCATION_PERMISSION).then((permitted) => {
                if (permitted) {
                    logDebug(LOG_TAG, "<<< user had already accepted permission")
                    onResult(ACCEPTED)

                } else {
                    PermissionsAndroid.request(ACCESS_FILE_LOCATION_PERMISSION).then((permitted) => {
                        permitted ? onResult(ACCEPTED) : onResult(REJECTED)
                    });
                }
            })
        }
    } else {
        onResult(ACCEPTED)
    }
}