import moment from "moment"
import { logDebug } from "../logger/Logger"

const MILLISECONDS_1_HOUR = 3600000
const MILLISECONDS_24_HOUR = 86400000

const LOG_TAG = "TimeUtil"

/**
 * get current time string.
 * @returns {string}
 */
export const getCurrentTime = () => {
    let currentDate = new Date()
    let hours = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours()
    let minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
    let seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds()

    const result = hours + ':' + minutes + ':' + seconds
    logDebug(LOG_TAG, ">>> getCurrentTime(): " + result)
    return result
}

/**
 * get history typed date message.
 * @param {String} createdDate 
 * @returns {String}
 */
export const getHistoryTypedDateMessage = (createdDate) => {
    const createdMillTime = new Date(createdDate).getTime()
    const currentMillTime = getCurrentMillTimeForUi()
    logDebug(LOG_TAG, ">>> CREATED MillTime: " + createdMillTime)
    logDebug(LOG_TAG, ">>> CURRENT MillTime: " + currentMillTime)

    const gapMillTime = Math.abs(currentMillTime - createdMillTime)
    logDebug(LOG_TAG, ">>> GAP millTime: " + gapMillTime)

    const gapDateTime = new Date(gapMillTime)
    logDebug(LOG_TAG, ">>> GAP dateTime: " + gapDateTime)

    let minutes = (gapDateTime.getMinutes() < 10 ? '0' : '') + gapDateTime.getMinutes()
    let seconds = (gapDateTime.getSeconds() < 10 ? '0' : '') + gapDateTime.getSeconds()
    logDebug(LOG_TAG, ">>> GAP minutes: " + minutes + ", seconds: " + seconds)

    const expired24Hours = gapMillTime > MILLISECONDS_24_HOUR
    const expired1Hour = gapMillTime > MILLISECONDS_1_HOUR
    logDebug(LOG_TAG, ">>> EXPIRED 24 hours: " + expired24Hours + ", EXPIRED 1 hour: " + expired1Hour)

    const result = expired24Hours ? getElapsedDays(gapMillTime) : expired1Hour ? getElapsedHours(gapMillTime)
        : minutes + "분 " + seconds + "초 전"
    logDebug(LOG_TAG, ">>> DISPLAY String: " + result)

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
    const currentMillTime = Date.parse(currentDate.toISOString())
    return currentMillTime
}

export const getCurrentDateTime = () => {
    const currentDateTime = new Date().toString()
    return currentDateTime
}

export const getCurrentCustomDateTime = () => {
    const currentCustomDateTime = moment().format("YYYY_MM_DD_HH_mm_ss")
    return currentCustomDateTime
}

export const getCurrentMillTimeForUi = () => {
    let currentDate = new Date()
    const currentMillTime = currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)
    return currentMillTime
}