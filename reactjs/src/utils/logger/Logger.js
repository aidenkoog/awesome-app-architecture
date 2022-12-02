const fs = require('fs')
const LOG_FILE = './debug.log'

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
export const logError = (logTag, logMessage) => {
    console.error(logTag, logMessage)
}

/**
 * print common error log.
 * @param {string} logTag
 * @param {string} error 
 */
export const outputErrorLog = (logTag, error) => {
    const message = "<<<[E] " + error + "!!!"
    logError(logTag, message)
    makeLogFile(message)
}

/**
 * create log file.
 * @param {string} logMessage 
 */
export const makeLogFile = (logMessage) => {
    fs.writeFile(LOG_FILE, logMessage, function(err) {
        fs.readFile(LOG_FILE, function(err, contents) {
          outputErrorLog(contents.toString())
        })
      })
}