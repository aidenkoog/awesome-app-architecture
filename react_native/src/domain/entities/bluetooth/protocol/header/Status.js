import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToBinaryString, convertByteArrayToNumeric, convertIntToByteArray, convertLongToByteArray } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_HEIGHT
const DATA_LENGTH = 8

export const EMERGENCY_STATUS_SHIFT = 32
export const EMERGENCY_STATUS_MASK = 0B111111

let data = null

const Status = () => {

    getStatusAsString = () => {
        return convertByteArrayToBinaryString(data[0]) + " " + convertByteArrayToBinaryString(data[1])
            + " " + convertByteArrayToBinaryString(data[2]) + " " + convertByteArrayToBinaryString(data[3])
            + " " + convertByteArrayToBinaryString(data[4]) + " " + convertByteArrayToBinaryString(data[5])
            + " " + convertByteArrayToBinaryString(data[6]) + " " + convertByteArrayToBinaryString(data[7])
    }

    setStatus = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = new ArrayBuffer(DATA_LENGTH)
    }, [])

    return {
        getSourceIpAsString,
        setSourceIp,
    }
}