import Constants from "../../../../../utils/Constants"
import { logDebug } from "../../../../../utils/logger/Logger"
import BleHeaderMessage from "./header/BleHeaderMessage"
import BlePayloadMessage from "./payload/BlePayloadMessage"

const LOG_TAG = Constants.LOG.BT_COMMAND_GENERATOR

const BleSyncMessage = (props) => {

    const { getHeaderMessage } = BleHeaderMessage()
    const { getPayloadMessage } = BlePayloadMessage()

    /**
     * return ble sync messages.
     * this method is only exposed to outside.
     */
    getSyncMessage = () => {
        return getHeader() + getPayload()
    }

    getHeader = () => {
        return getHeaderMessage()
    }

    getPayload = () => {
        return getPayloadMessage()
    }

    return {
        getSyncMessage
    }
}

export default BleSyncMessage