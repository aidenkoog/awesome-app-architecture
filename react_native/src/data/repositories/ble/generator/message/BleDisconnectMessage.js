import Constants from "../../../../../utils/Constants"
import { logDebug } from "../../../../../utils/logger/Logger"
import BleHeaderMessage from "./header/BleHeaderMessage"
import BlePayloadMessage from "./payload/BlePayloadMessage"

const LOG_TAG = Constants.LOG.BT_COMMAND_GENERATOR

const BleDisconnectMessage = (props) => {

    const { getHeaderMessage } = BleHeaderMessage()
    const { getPayloadMessage } = BlePayloadMessage()

    /**
     * return ble disconnect messages.
     * this method is only exposed to outside.
     */
    getDisconnectMessage = () => {
        return getHeader() + getPayload()
    }

    getHeader = () => {
        return getHeaderMessage()
    }

    getPayload = () => {
        return getPayloadMessage()
    }

    return {
        getDisconnectMessage
    }
}

export default BleDisconnectMessage