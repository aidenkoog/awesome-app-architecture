import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_PAYLOAD_LENGTH
const DATA_LENGTH = 2

let data = null

const PayloadLength = () => {

    getPayloadLengthAsString = () => {
        return convertByteArrayToNumeric(data).toString()
    }

    setPayloadLength = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        data = [(value & 0xFF00) >> 8, (value & 0x00FF) >> 0]
    }

    useEffect(() => {
        data = new ArrayBuffer(DATA_LENGTH)
    }, [])

    return {
        getCmdAsString,
        setCmd,
    }
}