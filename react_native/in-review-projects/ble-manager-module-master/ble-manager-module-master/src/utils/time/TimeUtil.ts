import moment from "moment"
import _ from 'lodash'
import * as RNLocalize from "react-native-localize"
import momentTz from "moment-timezone"

/**
 * get current time with format, hours:minutes:seconds
 * @return {string}
 */
export const getCurrentTime = (): string => {
    let currentDate = new Date()
    let hours = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours();
    let minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    let seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
}

/**
 * format month + 1 / date.
 * @param {Date} dateObj 
 * @return {string}
 */
export const formatMonthDate = (dateObj: Date): string => {
    let month = dateObj.getMonth()
    let date = dateObj.getDate()
    return `${month + 1}/${date}`
}

/**
 * convert date to string.
 * @param {Date} date
 * @return {string}
 */
export const formatDateToString = (date: Date): string => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0].replace(/-/g, ".")
}

/**
 * get event time.
 * @return {string}
 */
export const formatEventTime = (): string => {
    return moment().format('yyyy-MM-DDTHH:mm:ss') + 'Z'
}

/**
 * get refreshed time. (HH:mm)
 * @return {string}
 */
export const formatRefreshTime = (): string => {
    return moment().format('HH:mm')
}

/**
 * get date string with format, YYYY-MM-DD.
 * @param {moment.Moment} date
 * @return {string}
 */
export const formatYYYYMMDD = (date: moment.Moment = moment()): string => {
    return moment(date).format("YYYY-MM-DD")
}

/**
 * get formatted Date object.
 * @param {any} date
 * @return {Date}
 */
export const formatDate = (date: any): Date => {
    if (moment(date, "YYYY.MM.DD").isValid()) {
        return new Date(date?.substr(0, 4), date?.substr(5, 2) - 1, date?.substr(8, 2))
    } else return new Date()
}

/**
 * refresh time format style.
 * @param {Date} date
 * @return {string}
 */
export const refreshTimeFormat = (date: Date): string => {
    let isSameDate = (moment().format('YYYY-MM-DD') === moment(date).format("YYYY-MM-DD"))
    let isSameYear = (moment().format('YYYY') === moment(date).format("YYYY"))
    if (isSameDate) {
        return moment(date).format('LT')

    } else if (isSameYear) {
        return moment(date).format('L') + ' ' + moment(date).format('LT')

    } else {
        return moment(date).format('LLL') + ' ' + moment(date).format('LT')
    }
}

/**
 * check if delivered date is today's.
 * @param {Date} date
 * @return {boolean}
 */
export const isToday = (date: Date): boolean => {
    if (_.isNil(date)) {
        return false
    }
    return (moment().format('YYYY-MM-DD') === moment(date).format("YYYY-MM-DD"))
}

/**
 * check if more than 1 minute has elapsed.
 * @param {Date} date
 * @returns {boolean}
 */
export const isOverOneMinute = (date: Date): boolean => {
    return ((Date.now() - moment(date).valueOf()) > 60 * 1000) || _.isNil(date)
}

/**
 * get local time.
 * @param {Date} date
 * @return {string} 
 */
export const localTime = (date: Date): string => {
    const deviceTimeZone = RNLocalize.getTimeZone()
    const today = momentTz().tz(deviceTimeZone)
    const currentTimeZoneOffsetInSeconds = today.utcOffset() * 60
    return moment.utc(date).add(currentTimeZoneOffsetInSeconds, "seconds").format('LT')
}