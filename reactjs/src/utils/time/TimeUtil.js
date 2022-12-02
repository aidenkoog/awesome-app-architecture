import { BEFORE_1_HOURS, BEFORE_24_HOURS } from "../../assets/strings/Strings"
import { logDebug } from "../logger/Logger"

const LOG_TAG = "TimeUtil"
const MILLISECONDS_1_HOUR = 3600000
const MILLISECONDS_24_HOUR = 86400000

/**
 * get current time string.
 * @returns {string}
 */
export const getCurrentTime = () => {
    let currentDate = new Date()
    let hours = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours()
    let minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
    let seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds()
    return hours + ':' + minutes + ':' + seconds
}

/**
 * get history typed date message.
 * @param {String} createdDate 
 * @returns {String}
 */
export const getHistoryTypedDateMessage = (createdDate) => {
    const createdMillTime = new Date(createdDate)
    const currentMillTime = getCurrentMillTime()
    const gapMillTime = currentMillTime - createdMillTime
    const gapDateTime = new Date(gapMillTime)

    let minutes = (gapDateTime.getMinutes() < 10 ? '0' : '') + gapDateTime.getMinutes()
    let seconds = (gapDateTime.getSeconds() < 10 ? '0' : '') + gapDateTime.getSeconds()

    const result = gapMillTime > MILLISECONDS_24_HOUR ? BEFORE_24_HOURS
        : gapMillTime > MILLISECONDS_1_HOUR ? BEFORE_1_HOURS
            : minutes + "분 " + seconds + "초 전"
    logDebug(LOG_TAG, ">>> historyTypedDateMessage: " + result)

    return result
}

/**
 * get current time as milliseconds.
 * @returns {long}
 */
export const getCurrentMillTime = () => {
    return new Date().getTime()
}