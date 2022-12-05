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
    const createdMillTime = new Date(createdDate).getTime()
    const currentMillTime = getCurrentMillTime()
    logDebug(LOG_TAG, ">>> createdDate: " + createdDate
        + ", createdMillTime: " + createdMillTime + ", currentMillTime: " + currentMillTime)

    const gapMillTime = Math.abs(currentMillTime - createdMillTime)
    const gapDateTime = new Date(gapMillTime)
    logDebug(LOG_TAG, ">>> gapMillTime: " + gapMillTime + ", gapDateTime: " + gapDateTime)

    let minutes = (gapDateTime.getMinutes() < 10 ? '0' : '') + gapDateTime.getMinutes()
    let seconds = (gapDateTime.getSeconds() < 10 ? '0' : '') + gapDateTime.getSeconds()

    const expired24Hours = gapMillTime > MILLISECONDS_24_HOUR
    const expired1Hour = gapMillTime > MILLISECONDS_1_HOUR
    logDebug(LOG_TAG, ">>> expired24Hours: " + expired24Hours + ", expired1Hour: " + expired1Hour)

    const result = expired24Hours ? getElapsedDays(gapMillTime) : expired1Hour ? getElapsedHours(gapMillTime)
        : minutes + "분 " + seconds + "초 전"
    logDebug(LOG_TAG, ">>> historyTypedDateMessage: " + result)

    return result
}

const getElapsedHours = (gapMillTime) => {
    const elapsedHours = Math.floor(gapMillTime / MILLISECONDS_1_HOUR)
    return elapsedHours + "시간 전"
}

const getElapsedDays = (gapMillTime) => {
    const elapsedDays = Math.floor(gapMillTime / MILLISECONDS_24_HOUR)
    return elapsedDays + "일 전"
}

/**
 * get current time as milliseconds.
 * @returns {long}
 */
export const getCurrentMillTime = () => {
    let currentDate = new Date()
    return currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)
}