import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertHexStringToByteArray } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_HEIGHT
const DATA_LENGTH = 8

export const EMERGENCY_STATUS_SHIFT = 32
export const EMERGENCY_STATUS_MASK = 0B111111

let data = null

const Version = () => {

    setVersion = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = new ArrayBuffer(DATA_LENGTH)
        data = convertHexStringToByteArray(parseInt("3", 16))
    }, [])

    return {
        setVersion,
    }
}