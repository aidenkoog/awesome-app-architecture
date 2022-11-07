import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.BT_REQ_MSG_MSG_ID
const DATA_LENGTH = 2

let data = null

const Height = () => {

    getHeightAsString = () => {
        return convertByteArrayToNumeric(data).toString()
    }

    setHeight = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = new ArrayBuffer(DATA_LENGTH)
    }, [])

    return {
        getHeightAsString,
        setHeight,
    }
}