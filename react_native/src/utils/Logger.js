
/**
 * log debugging messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export function logDebug(logTag, logMessage) {
    console.log(logTag, logMessage)
}

/**
 * log error messages.
 * @param {string} logTag 
 * @param {string} logMessage 
 */
export function logError(logTag, logMessage) {
    console.error(logTag, logMessage)
}