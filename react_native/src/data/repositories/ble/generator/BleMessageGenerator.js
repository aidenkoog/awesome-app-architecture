import BleAuthenticateMessage from "./message/BleAuthenticateMessage"
import BleDisconnectMessage from "./message/BleDisconnectMessage"
import BleSyncMessage from "./message/BleSyncMessage"
import BleFirmwareUpgradeMessage from "./message/BleFirmwareUpgradeMessage"
import Constants from "../../../../utils/Constants"
import { logDebug } from "../../../../utils/logger/Logger"

const LOG_TAG = Constants.LOG.BT_COMMAND_GENERATOR

const BleMessageGenerator = (props) => {

    /**
     * sequence id.
     */
    const { bleSequenceId } = props

    /**
     * message manager for creating different data sets depending on the type of data to be sent.
     */
    const { getAuthenticateMessage } = BleAuthenticateMessage()
    const { getSyncMessage } = BleSyncMessage()
    const { getDisconnectMessage } = BleDisconnectMessage()
    const { getFirmwareUpgradeMessage } = BleFirmwareUpgradeMessage()

    /**
     * @returns {string}
     */
    getAuthenticatMessageResult = () => {
        const authenticateMessage = getAuthenticateMessage(bleSequenceId)

        logDebug(LOG_TAG, ">>> authenticateMessage: " + authenticateMessage)
        return authenticateMessage
    }

    /**
     * @returns {string}
     */
    getSyncMessageResult = () => {
        const syncMessage = getSyncMessage(bleSequenceId)

        logDebug(LOG_TAG, ">>> syncMessage: " + syncMessage)
        return syncMessage
    }

    /**
     * @returns {string}
     */
    getDisconnectMessageResult = () => {
        const disconnectMessage = getDisconnectMessage(bleSequenceId)

        logDebug(LOG_TAG, ">>> disconnectMessage: " + disconnectMessage)
        return disconnectMessage
    }

    /**
     * @returns {string}
     */
    getFirmwareUpgradeMessageResult = () => {
        const firmwareUpgradeMessage = getFirmwareUpgradeMessage(bleSequenceId)

        logDebug(LOG_TAG, ">>> firmwareUpgradeMessage: " + firmwareUpgradeMessage)
        return firmwareUpgradeMessage
    }

    return {
        getAuthenticatMessageResult,
        getSyncMessageResult,
        getDisconnectMessageResult,
        getFirmwareUpgradeMessageResult
    }
}

export default BleMessageGenerator