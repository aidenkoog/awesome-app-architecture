import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToString, convertStringToByteArrayWithCount } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.BT_REQ_MSG_MSG_ID
const DATA_LENGTH = 8

let data = null

const FirmwareVersion = () => {

    getFirmwareVersionAsString = () => {
        return convertByteArrayToString(data).trim()
    }

    setFirmwareVersion = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = convertStringToByteArrayWithCount("0.0.2.37", DATA_LENGTH)
    }, [])

    return {
        getFirmwareVersionAsString,
        setFirmwareVersion,
    }
}