import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { randomBytes } from "crypto"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_MSG_ID
const DATA_LENGTH = 4

let data = null

const MessageId = () => {

    generateMessageId = () => {
        data = randomBytes(DATA_LENGTH)
        logDebug(LOG_TAG, "messageId: " + data)
        return data
    }

    getMessageIdAsString = () => {
        return convertByteArrayToNumeric(data).toString()
    }

    setMessageId = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = this.getMessageId()
    }, [])

    return {
        generateMessageId,
        getMessageIdAsString,
        setMessageId
    }
}