import { DEBUGGING_MODE } from "../../configs/Configs"
import { getCurrentDateTime } from "../time/TimeUtil"

let cachedLogMessages = []

/**
 * log debugging messages.
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
 * log debugging messages with line for reading.
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
 * log error messages.
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
 * print common error log.
 * @param {string} logTag
 * @param {string} error 
 */
export const outputErrorLog = (logTag, error) => {
    if (DEBUGGING_MODE) {
        logError(logTag, "<<<[E] " + error + "!!!")
    }
}

/**
 * store log messages.
 * @param {string} logMessageToAdd 
 */
function addLogMessageHandler(logMessageToAdd) {
    if (logMessageToAdd == null || logMessageToAdd === "") {
        return
    }
    cachedLogMessages.push(logMessageToAdd)
}

function getLogTag(logTag) {
    return "[" + getCurrentDateTime() + "]::" + "[" + logTag + "]:: "
}

export function getCachedLogMessages() {
    return cachedLogMessages
}
