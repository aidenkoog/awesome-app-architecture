import Constants from "./Constants"
import { logDebug } from "./Logger"

const LOG_TAG = Constants.LOG.BLE_UTIL_LOG_TAG

/**
 * convert bytes typed custom data to different type's.
 * @param {bytes} customData 
 * @returns {Any}
 */
export const getBleCustomData = (customData) => {
    logDebug(LOG_TAG, "customData: " + customData)
    return customData
}