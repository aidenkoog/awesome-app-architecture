import moment from "moment"
import _ from 'lodash'
import * as RNLocalize from "react-native-localize"
import momentTz from "moment-timezone"

export const formatMonthDate = (dateObj) => {
    let month = dateObj.getMonth()
    let date = dateObj.getDate()
    return `${month + 1}/${date}`
}

export const formatDateToString = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0].replace(/-/g, ".")
}

export const formatEventTime = () => {
    return moment().format('yyyy-MM-DDTHH:mm:ss') + 'Z'
}

export const formatYYYYMMDD = (date = moment()) => {
    return moment(date).format("YYYY-MM-DD")
}

export const formatDate = (date) => {
    if (moment(date, "YYYY.MM.DD").isValid()) {
        return new Date(date?.substr(0, 4), date?.substr(5, 2) - 1, date?.substr(8, 2))
    } else return new Date()
}

export const sosTimeFormat = (date) => {
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

export const formatBirthdayDate = (date) => {
    return moment(date, 'YYYY.MM.DD').format('LL')
}

export const isToday = (date) => {
    if (_.isNil(date)) return false
    return (moment().format('YYYY-MM-DD') === moment(date).format("YYYY-MM-DD"))
}

export const isOverOneMinute = (date) => {
    return ((Date.now() - moment(date).valueOf()) > 60 * 1000) || _.isNil(date)
}

export const localTime = (date) => {
    const deviceTimeZone = RNLocalize.getTimeZone()
    const today = momentTz().tz(deviceTimeZone)
    const currentTimeZoneOffsetInSeconds = today.utcOffset() * 60
    return moment.utc(date).add(currentTimeZoneOffsetInSeconds, "seconds").format('LT')
}