import { stringToBytes } from "convert-string"
import { convertDecimalToHexString } from "../ble/BleUtil"

/**
 * log debugging messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logDebug = (logTag, logMessage) => {
    console.log(logTag, logMessage)
}

/**
 * log debugging messages with line for reading.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logDebugWithLine = (logTag, logMessage) => {
    console.log("START:", "-------------------------------------------------------------------------")
    console.log("Topic:", logTag)
    console.log("Message:", logMessage)
    console.log("END:", "---------------------------------------------------------------------------")
}

/**
 * log BLE data.
 * @param {string} logTag
 * @param {string} logMessage
 */
export const logBleData = (logTag, logMessage) => {
    console.log("START:", "-------------------------------------------------------------------------")
    console.log(logTag + ":", "[raw]: " + logMessage)
    console.log(logTag + ":", "[hex]: " + convertDecimalToHexString(logMessage))
    console.log(logTag + ":", "[byte]: " + stringToBytes(logMessage))
    console.log("END:", "---------------------------------------------------------------------------")
}

/**
 * log error messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logError = (logTag, logMessage) => {
    console.error(logTag, logMessage)
}

/**
 * print common error log.
 * @param {string} logTag
 * @param {string} error 
 */
export const outputErrorLog = (logTag, error) => {
    logError(logTag, "<<<[E] " + error + "!!!")
}