
const RequestMessage = () => {
    getVersion = () => {
        const version = "\x03"

        logDebug(LOG_TAG, ">>> version: " + version)
        return ""
    }

    getSequenceId = (bleSequenceId) => {
        const sequenceId = convertDecimalToHexString(bleSequenceId)

        logDebug(LOG_TAG, ">>> sequenceId: " + sequenceId)
        return ""
    }

    getStatus = () => {
        const status = "\x01"

        logDebug(LOG_TAG, ">>> status: " + status)
        return ""
    }

    getDeviceName = () => {
        const deviceName = getDeviceNameAsHexString("358303469901116")

        logDebug(LOG_TAG, ">>> deviceName: " + deviceName)
        return ""
    }

    getUserId = () => {
        const userId = "3B7750F5997B49DA856711DD841D0676"

        logDebug(LOG_TAG, ">>> userId: " + userId)
        return userId
    }

    /**
     * return ble authentication messages.
     * @param {number} bleSequenceId
     * @returns {string}
     */
    getAuthenticateMessage = (bleSequenceId) => {
        let fullMessage = this.getVersion() + this.getSequenceId(bleSequenceId) + this.getStatus()
            + this.getDeviceName() + this.getUserId()

        logDebug(LOG_TAG, ">>> full message: " + fullMessage)
        return fullMessage
    }
}