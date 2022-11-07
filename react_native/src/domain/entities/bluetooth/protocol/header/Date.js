import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric, convertLongToByteArray } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.BT_REQ_MSG_MSG_ID
const DATA_LENGTH = 4

let date = null

const Date = () => {

    getDateAsString = () => {
        return convertByteArrayToNumeric(date).toString()
    }

    setDate = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        date = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        date = convertLongToByteArray(new Date() / 1000)
    }, [])

    return {
        getDateAsString,
        setDate,
    }
}