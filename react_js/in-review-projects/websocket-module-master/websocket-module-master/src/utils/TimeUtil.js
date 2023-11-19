export const MILLISECONDS_24_HOUR = 86400000

export const getCurrentMillTime = () => {
    let currentDate = new Date()
    const currentMillTime = Date.parse(currentDate.toISOString())
    return currentMillTime
}

export const getCurrentDateTime = () => {
    const currentDateTime = new Date().toString()
    return currentDateTime
}