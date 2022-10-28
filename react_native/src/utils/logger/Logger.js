
/**
 * log debugging messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export const logDebug = (logTag, logMessage) => {
    console.log(logTag, logMessage)
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
    logError(logTag, "<<<[E] " + error)
}