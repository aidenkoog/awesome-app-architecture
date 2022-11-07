import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.BT_REQ_MSG_MSG_ID
const DATA_LENGTH = 1

let age = null

const Age = () => {

    getAgeAsString = () => {
        return convertByteArrayToNumeric(age).toString()
    }

    setAge = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        age = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        age = new ArrayBuffer(DATA_LENGTH)
        age[0] = 0x00
    }, [])

    return {
        getAgeAsString,
        setAge,
        setMessageId
    }
}