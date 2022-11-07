import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric, convertIntToByteArray, convertLongToByteArray } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_HEIGHT
const DATA_LENGTH = 4

let data = null
let sourceIp = 0

const SourceIp = () => {

    getSourceIpAsString = () => {
        return convertByteArrayToNumeric(data).toString()
    }

    setSourceIp = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = convertLongToByteArray(sourceIp)
    }, [])

    return {
        getSourceIpAsString,
        setSourceIp,
    }
}