import Constants from "../../../../../../utils/Constants"

const LOG_TAG = Constants.LOG.BT_COMMAND_GENERATOR

const BlePayloadMessage = (props) => {

    /**
     * return payload message.
     * [ elements needed to construct a message ]
     * 1. payload type.
     * 2. payload data's length.
     * 3. payload data.
     */
    getPayloadMessage = () => {
        return getPayloadType() + getPayloadDataLength() + getPayloadData()
    }

    getPayloadType = () => {
        return ""
    }

    getPayloadDataLength = () => {
        return ""
    }

    getPayloadData = () => {
        return ""
    }

    return {
        getPayloadMessage
    }
}

export default BlePayloadMessage