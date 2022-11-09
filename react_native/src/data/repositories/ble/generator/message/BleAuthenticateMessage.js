import { convertDecimalToHexString, getDeviceNameAsHexString } from "../../../../../utils/ble/BleUtil"
import Constants from "../../../../../utils/Constants"
import { logDebug } from "../../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_AUTHENTICATE_MESSAGE

const BleAuthenticateMessage = () => {

    getVersion = () => {
        const version = convertDecimalToHexString(3)

        logDebug(LOG_TAG, ">>> version: " + version)
        return version
    }

    getSequenceId = (bleSequenceId) => {
        const sequenceId = convertDecimalToHexString(bleSequenceId)

        logDebug(LOG_TAG, ">>> sequenceId: " + sequenceId)
        return sequenceId
    }

    getStatus = () => {
        const status = convertDecimalToHexString(1)

        logDebug(LOG_TAG, ">>> status: " + status)
        return status
    }

    getDeviceName = () => {
        const deviceName = getDeviceNameAsHexString("358303469901116")

        logDebug(LOG_TAG, ">>> deviceName: " + deviceName)
        return deviceName
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
        const fullMessage =
            this.getVersion()
            + this.getSequenceId(bleSequenceId)
            + this.getStatus()
            + this.getDeviceName()
            + this.getUserId()

        logDebug(LOG_TAG, ">>> full message: " + fullMessage)
        return fullMessage
    }

    return {
        getAuthenticateMessage
    }
}

export default BleAuthenticateMessage