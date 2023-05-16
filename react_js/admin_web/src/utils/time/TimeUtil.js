import moment from "moment"

const MILLISECONDS_1_HOUR = 3600000
export const MILLISECONDS_24_HOUR = 86400000

/**
 * Get current time string.
 * @returns {string}
 */
export const getCurrentTime = () => {
    let currentDate = new Date()
    let hours = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours()
    let minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
    let seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds()

    const result = hours + ':' + minutes + ':' + seconds
    return result
}

/**
 * Get history typed date message.
 * @param {String} measuredDate 
 * @returns {String}
 */
export const getHistoryTypedDateMessage = (measuredDate) => {
    const measuredMillTime = new Date(measuredDate).getTime()
    const currentMillTime = getCurrentMillTimeForUi()

    const gapMillTime = Math.abs(currentMillTime - measuredMillTime)
    const gapDateTime = new Date(gapMillTime)

    let minutes = (gapDateTime.getMinutes() < 10 ? '0' : '') + gapDateTime.getMinutes()
    let seconds = (gapDateTime.getSeconds() < 10 ? '0' : '') + gapDateTime.getSeconds()

    const expired24Hours = gapMillTime > MILLISECONDS_24_HOUR
    const expired1Hour = gapMillTime > MILLISECONDS_1_HOUR

    const result = expired24Hours ? getElapsedDays(gapMillTime) : expired1Hour ? getElapsedHours(gapMillTime)
        : minutes + "분 " + seconds + "초 전"
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
 * Get current time as milliseconds.
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