import { stringToBytes } from "convert-string"
import { bleDeviceNameAtom, bleSequenceIdAtom } from "../../../adapters"
import { useRecoilValue } from "recoil"
import { logDebug } from "../../../../utils/logger/Logger"
import Constants from "../../../../utils/Constants"

const LOG_TAG = Constants.LOG.BT_MESSAGE

const RequestMessage = () => {

    const bleDeviceName = useRecoilValue(bleDeviceNameAtom)
    const bleSequenceId = useRecoilValue(bleSequenceIdAtom)

    getVersion = () => {
        this.version = stringToBytes("\x03")
        logDebug(LOG_TAG, ">>> version (byte): " + version)
        return version
    }

    getSequenceId = () => {
        logDebug(LOG_TAG, ">>> bleSequenceId (from recoil): " + bleSequenceId)
        //this.sequenceId = (bleSequenceId >>> 0).toString(2)
        this.sequenceId = bleSequenceId.toString(16)
        logDebug(LOG_TAG, ">>> sequenceId (hex): " + sequenceId)
        logDebug(LOG_TAG, ">>> sequencId (byte): " + stringToBytes(sequenceId))
        return stringToBytes(sequenceId)
    }

    getStatus = () => {
        this.status = stringToBytes("\x01")
        logDebug(LOG_TAG, ">>> status (byte): " + status)
        return status
    }

    getDeviceName = () => {
        logDebug(LOG_TAG, ">>> bleDeviceName (from recoil): " + bleDeviceName)
        this.deviceName = ""
        for (let i = 0; i < bleDeviceName.length; i++) {
            deviceName += bleDeviceName.substring(i, i + 1).toString(16)
        }
        logDebug(LOG_TAG, ">>> deviceName: " + deviceName)
        logDebug(LOG_TAG, ">>> deviceName (byte): " + stringToBytes(deviceName))
        return stringToBytes(deviceName)
    }

    getUserId = () => {
        const deviceUniqueId = "3B7750F5997B49DA856711DD841D0676"
        this.userId = ""
        for (let i = 0; i < deviceUniqueId.length; i++) {
            userId += deviceUniqueId.substring(i, i + 1).toString(16)
        }
        logDebug(LOG_TAG, ">>> userId: " + userId)
        logDebug(LOG_TAG, ">>> userId (byte): " + stringToBytes(userId))
        return stringToBytes(userId)
    }

    /**
     * return ble authentication messages.
     * @returns {string}
     */
    getAuthenticateMessage = () => {
        this.fullMessage =
            this.getVersion()
            + this.getSequenceId()
            + this.getStatus()
            + this.getDeviceName()
            + this.getUserId()

        logDebug(LOG_TAG, ">>> full BLE authentication message: " + fullMessage)
        return fullMessage
    }

    return {
        getAuthenticateMessage
    }
}

export default RequestMessage