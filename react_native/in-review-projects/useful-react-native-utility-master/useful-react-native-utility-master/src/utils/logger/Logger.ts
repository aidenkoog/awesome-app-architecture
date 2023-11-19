
/**
 * log debugging messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logDebug = (logTag: string, logMessage: string) => {
    console.log(logTag, logMessage)
}

/**
 * log debugging messages with line for reading.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logDebugWithLine = (logTag: string, logMessage: string) => {
    console.log("START:", "---------------------------------------------------------------")
    console.log("Topic:", logTag)
    console.log("Message:", logMessage)
    console.log("END:", "-----------------------------------------------------------------")
}

/**
 * log error messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logError = (logTag: string, logMessage: string) => {
    console.error(logTag, logMessage)
}

/**
 * print common error log.
 * @param {string} logTag
 * @param {string} error 
 */
export const outputErrorLog = (logTag: string, error: string) => {
    logError(logTag, `<<<[E] ${error}!!!`)
}