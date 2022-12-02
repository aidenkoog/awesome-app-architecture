
/**
 * measured data information.
 */
class MeasureInfo {

    constructor(
        eventType, provider, lat, lng,
        altitude, accuracy, battery, locationType,
        wearing, idle, status, delay, measuredDate,
        createdDate) {

        this.eventType = eventType
        this.provider = provider
        this.latitude = lat
        this.longitude = lng
        this.altitude = altitude
        this.accuracy = accuracy
        this.battery = battery
        this.locationType = locationType
        this.wearing = wearing
        this.idle = idle
        this.status = status
        this.delay = delay
        this.measuredDate = measuredDate
        this.createdDate = createdDate
    }
}

export default MeasureInfo