import Constants from "../../../../utils/Constants"
import { useEffect } from "react"

const LOG_TAG = Constants.LOG.BT_REQ_MSG_MSG_ID
const MSG_LENGTH = 4

let valueAsBytes = null

const MessageId = () => {

    getMessageId = () => {
        return ""
    }

    toString = () => {
        return ""
    }

    useEffect(() => {
        valueAsBytes = this.getMessageId()

    }, [])

    return {
        getMessageId,
    }
}