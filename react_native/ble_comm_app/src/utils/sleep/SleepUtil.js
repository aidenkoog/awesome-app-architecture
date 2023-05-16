import { Metrics, Strings } from "../theme"
import { HEALTH_GRAPH_TYPE } from "../Constants"
import moment from "moment"
import { formatYYYYMMDD } from "../time"

const strings = Strings.chart

function getBarWidth(type) {
    let graphViewWidth = Metrics.screenWidth - 40 - 40 - 50
    let divideNumber = type === HEALTH_GRAPH_TYPE.DAY ? 8.5 :
        type === HEALTH_GRAPH_TYPE.WEEK ? 12 : type === HEALTH_GRAPH_TYPE.MONTH ? 50 : 21
    return Math.floor(graphViewWidth / divideNumber)
}

function getTickValues(arrayChart) {
    return [...Array(arrayChart.motion.length).keys()]
}

function getTickFormat(t, type) {
    return type === HEALTH_GRAPH_TYPE.DAY
        ? (t % 4 === 0 ? strings.dayAxis[t] : "")
        : type === HEALTH_GRAPH_TYPE.WEEK
            ? ((t < 0 || t > 6 || t % 1 !== 0) ? '' : Strings.repeat.daysOfWeekShort[t])
            : type === HEALTH_GRAPH_TYPE.MONTH
                ? ((t === 0 || (t + 1) % 10 === 0) ? t + 1 : '') : t + 1
}

function getTickSize(t, type) {
    return type === HEALTH_GRAPH_TYPE.DAY
        ? (t % 2 === 0 ? 8 : 0)
        : type === HEALTH_GRAPH_TYPE.WEEK
            ? ((t < 0 || t > 6 || t % 1 !== 0) ? 0 : 8)
            : type === HEALTH_GRAPH_TYPE.MONTH
                ? ((t === 0 || (t + 1) % 10 === 0) ? 8 : 0) : 8
}

function fromByteArray(bytes) {
    return ((bytes[0] & 0xFF) << 24) |
        ((bytes[1] & 0xFF) << 16) |
        ((bytes[2] & 0xFF) << 8) |
        ((bytes[3] & 0xFF) << 0)
}

function handleSleepDataDaily(data, startDate) {
    let sleep = [], sleepTime = 0, awakeTime = 0, motionTime = 0, noMotionTime = 0
    data.forEach((i) => {
        sleep.push(parseSleepDataDaily(i, startDate))
    })
    if (sleep.length > 0) {
        sleep.sort(function (a, b) {
            return a.startTime - b.startTime
        })
        let sleepData = []
        for (let i = 0; i < sleep.length; i++) {
            console.log('Sleep period time',
                moment(sleep[i].startTime * 1000).utc(), moment(sleep[i].endTime * 1000).utc(), sleep[i].sleepTime)
            sleepData.push(...sleep[i].sleepData)
            sleepTime += sleep[i].sleepTime
            awakeTime += sleep[i].awakeTime
            motionTime += sleep[i].motionTime
            noMotionTime += sleep[i].noMotionTime
            if (i < (sleep.length - 1)) {
                if (sleep[i + 1].startTime !== sleep[i].endTime) {
                    // push -1 value to not draw the line in chart
                    sleepData.push({
                        duration: sleep[i + 1].startTime - sleep[i].endTime,
                        value: -1,
                        startTime: sleep[i].endTime,
                        endTime: sleep[i + 1].startTime
                    })
                } else {
                    // try to merge two item with same value level
                    let firstDataInNextSegment = sleep[i + 1].sleepData[0]
                    if (firstDataInNextSegment.value === sleepData[sleepData.length - 1].value) {
                        sleepData[sleepData.length - 1].endTime = firstDataInNextSegment.endTime
                        sleepData[sleepData.length - 1].duration += firstDataInNextSegment.duration
                        sleep[i + 1].sleepData.shift()
                    }
                }
            }
        }
        let totalTime = sleepData.reduce((total, current) => total = total + current.duration, 0)

        return {
            duration: totalTime, // + 60*60,
            startTime: sleep[0].startTime,
            endTime: sleep[sleep.length - 1].endTime,
            sleepTime,
            awakeTime,
            motionTime,
            noMotionTime,
            sleepData
        }
    }
    return []
}

function parseSleepDataDaily(input, startDate) {
    let data = [], sleepData = [], sleepTime = 0, awakeTime = 0, motionTime = 0, noMotionTime = 0
    for (let i = 0; i < input?.sleepData?.length; i += 2) {
        data.push(parseInt(input?.sleepData?.slice(i, i + 2), 16))
    }
    let startTime = fromByteArray(data.splice(0, 4)) + input.sleepTimezoneOffset
    let endTime = fromByteArray(data.splice(0, 4)) + input.sleepTimezoneOffset
    let stageNumber = fromByteArray(data.splice(0, 4))

    let startEpocTime = moment(formatYYYYMMDD(moment(startDate).subtract(1, 'd')) + "T12:00:00.000Z").valueOf() / 1000
    let endEpocTime = startEpocTime + 86400

    for (let i = 0; i < stageNumber; i++) {
        let startShiftTime, endShiftTime, stage
        startShiftTime = fromByteArray(data.splice(0, 4)) + input.sleepTimezoneOffset
        endShiftTime = fromByteArray(data.splice(0, 4)) + input.sleepTimezoneOffset
        stage = String.fromCharCode(data.splice(0, 1))
        if ((endShiftTime < startEpocTime && startShiftTime < startEpocTime) || (startShiftTime > endEpocTime)) {
            continue
        }
        if (startEpocTime > startShiftTime) {
            startShiftTime = startEpocTime
            startTime = startEpocTime
        }
        if (endShiftTime > endEpocTime) {
            endShiftTime = endEpocTime
            endTime = endEpocTime
        }
        let value = -1
        let duration = endShiftTime - startShiftTime
        switch (stage) {
            case 'A':
                awakeTime += duration
                value = 2
                break
            case 'M':
                value = 1
                motionTime += duration
                sleepTime += duration
                break
            case 'N':
                value = 0
                noMotionTime += duration
                sleepTime += duration
                break
        }
        if (i > 0 && sleepData.length > 0 && sleepData[sleepData.length - 1].value === value) {
            sleepData[sleepData.length - 1].endTime = endShiftTime
            sleepData[sleepData.length - 1].duration += duration
            continue
        }

        sleepData.push({
            duration: duration,
            value: value,
            startTime: startShiftTime,
            endTime: endShiftTime
        })
    }

    return {
        duration: endTime - startTime,
        startTime,
        endTime,
        sleepTime,
        awakeTime,
        motionTime,
        noMotionTime,
        sleepData
    }
}

export { getBarWidth, getTickFormat, getTickValues, getTickSize, fromByteArray, handleSleepDataDaily }