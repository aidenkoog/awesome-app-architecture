import moment from "moment"

/**
 * 1 hour millisecond.
 */
const MILLISECONDS_1_HOUR = 3600000

/**
 * 24 hours millisecond.
 */
export const MILLISECONDS_24_HOUR = 86400000

/**
 * get current time string.
 * @returns {string}
 */
export const getCurrentTime = () => {
    let currentDate = new Date()

    let hours =
        (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours()
    let minutes =
        (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
    let seconds =
        (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds()

    const result = hours + ':' + minutes + ':' + seconds
    return result
}

/**
 * get custom date message.
 * @param {String} measuredDate 
 * @returns {String}
 */
export const getCustomDateMessage = (measuredDate) => {
    const gapMillTime =
        Math.abs(getCurrentMillTimeForUi() - new Date(measuredDate).getTime())

    const gapDateTime = new Date(gapMillTime)

    let minutes = (gapDateTime.getMinutes() < 10 ? '0' : '') + gapDateTime.getMinutes()
    let seconds = (gapDateTime.getSeconds() < 10 ? '0' : '') + gapDateTime.getSeconds()

    const expired24Hours = gapMillTime > MILLISECONDS_24_HOUR
    const expired1Hour = gapMillTime > MILLISECONDS_1_HOUR

    return result = expired24Hours ?
        getElapsedDays(gapMillTime) : expired1Hour ? getElapsedHours(gapMillTime)
            : minutes + "min " + seconds + "sec ago"
}

/**
 * get elapsed hour string.
 * @param {number} gapMillTime 
 * @returns {string}
 */
const getElapsedHours = (gapMillTime) => {
    const elapsedHours = Math.floor(gapMillTime / MILLISECONDS_1_HOUR)
    return elapsedHours + "hour ago"
}

/**
 * get elapsed day string.
 * @param {number} gapMillTime 
 * @returns {string}
 */
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

/**
 * get current date string.
 * @returns {string}
 */
export const getCurrentDateTime = () => {
    const currentDateTime = new Date().toString()
    return currentDateTime
}

/**
 * get current date string with format, YYYY_MM_DD_HH_mm_ss.
 * @returns {string}
 */
export const getCurrentCustomDateTime = () => {
    const currentCustomDateTime = moment().format("YYYY_MM_DD_HH_mm_ss")
    return currentCustomDateTime
}

/**
 * get current time as millisecond.
 * @returns {number}
 */
export const getCurrentMillTimeForUi = () => {
    let currentDate = new Date()
    const currentMillTime =
        currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)
    return currentMillTime
}