
/**
 * History information.
 */
class HistoryInfo {

    constructor(
        shortAddress, provider, date, fullAddress,
        measuredDateTime, measuredDate, eventType, accuracy,
        latitude, longitude) {

        this.shortAddress = shortAddress
        this.provider = provider
        this.date = date
        this.fullAddress = fullAddress
        this.measuredDateTime = measuredDateTime
        this.measuredDate = measuredDate
        this.eventType = eventType
        this.accuracy = accuracy
        this.latitude = latitude
        this.longitude = longitude
    }
}

export default HistoryInfo