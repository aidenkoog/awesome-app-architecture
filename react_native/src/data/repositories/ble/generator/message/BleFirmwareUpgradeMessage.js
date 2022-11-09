import Constants from "../../../../../utils/Constants"
import { logDebug } from "../../../../../utils/logger/Logger"
import BleHeaderMessage from "./header/BleHeaderMessage"
import BlePayloadMessage from "./payload/BlePayloadMessage"

const LOG_TAG = Constants.LOG.BT_COMMAND_GENERATOR

const BleFirmwareUpgradeMessage = () => {

    const { getHeaderMessage } = BleHeaderMessage()
    const { getPayloadMessage } = BlePayloadMessage()

    /**
     * return ble firmware upgrade messages.
     * this method is only exposed to outside.
     */
    getFirmwareUpgradeMessage = () => {
        return getHeader() + getPayload()
    }

    getHeader = () => {
        return getHeaderMessage()
    }

    getPayload = () => {
        return getPayloadMessage()
    }

    return {
        getFirmwareUpgradeMessage
    }
}

export default BleFirmwareUpgradeMessage