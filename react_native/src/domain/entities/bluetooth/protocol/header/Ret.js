import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_HEIGHT
const DATA_LENGTH = 1

export const REQUEST = 0x01
export const RESPONSE = 0x02
export const ERROR = 0x03

let data = null

const Ret = () => {

    getRetAsString = () => {
        return convertByteArrayToNumeric(data).toString()
    }

    setRet = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = new ArrayBuffer(DATA_LENGTH)
    }, [])

    return {
        getRetAsString,
        setRet,
    }
}