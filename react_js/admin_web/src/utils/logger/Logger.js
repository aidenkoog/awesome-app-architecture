import { DEBUGGING_MODE } from "../../configs/Configs"
import { getCurrentDateTime, getCurrentMillTime, MILLISECONDS_24_HOUR } from "../time/TimeUtil"

let cachedLogMessages = []
let logCacheStartTime = 0

/**
 * Log debugging messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logDebug = (logTag, logMessage) => {
    if (DEBUGGING_MODE) {
        console.log(logTag, logMessage)
    }
    addLogMessageHandler(getLogTag(logTag) + logMessage + "\n")
}

/**
 * Log debugging messages with line for reading.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logDebugWithLine = (logTag, logMessage) => {
    if (DEBUGGING_MODE) {
        console.log("START:", "---------------------------------------------------------------")
        console.log("Topic:", logTag)
        console.log("Message:", logMessage)
        console.log("END:", "-----------------------------------------------------------------")
    }
    addLogMessageHandler(getLogTag(logTag) + logMessage + "\n")
}

/**
 * Log error messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logError = (logTag, logMessage) => {
    if (DEBUGGING_MODE) {
        console.error(logTag, logMessage)
    }
    addLogMessageHandler(getLogTag(logTag) + logMessage + "\n")
}

/**
 * Print common error log.
 * @param {string} logTag
 * @param {string} error 
 */
export const outputErrorLog = (logTag, error) => {
    if (DEBUGGING_MODE) {
        logError(logTag, "<<<[E] " + error + "!!!")
    }
}

/**
 * Store log messages.
 * @param {string} logMessageToAdd 
 */
function addLogMessageHandler(logMessageToAdd) {
    if (logMessageToAdd == null || logMessageToAdd === "") {
        return
    }
    if (cachedLogMessages.length <= 0) {
        logCacheStartTime = getCurrentMillTime()
    } else {
        const currentMillTime = getCurrentMillTime()
        const gapTime = Math.abs(currentMillTime - logCacheStartTime)
        if (gapTime > MILLISECONDS_24_HOUR) {
            logCacheStartTime = currentMillTime
            cachedLogMessages = []
        }
    }
    cachedLogMessages.push(logMessageToAdd)
}

function getLogTag(logTag) {
    return `[${getCurrentDateTime()}]::[${logTag}]:: `
}

export function getCachedLogMessages() {
    return cachedLogMessages
}
