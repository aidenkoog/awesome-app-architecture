import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.BT_REQ_MSG_MSG_ID
const DATA_LENGTH = 1

let data = null

const Cmd = () => {

    getCmdAsString = () => {
        return convertByteArrayToNumeric(data).toString()
    }

    setCmd = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = new ArrayBuffer(DATA_LENGTH)
    }, [])

    return {
        getCmdAsString,
        setCmd,
    }
}