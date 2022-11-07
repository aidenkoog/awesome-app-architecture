import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_HEIGHT
const DATA_LENGTH = 2

let data = null

const Weight = () => {

    getWeightAsString = () => {
        return convertByteArrayToNumeric(data).toString()
    }

    setWeight = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = new ArrayBuffer(DATA_LENGTH)
    }, [])

    return {
        getWeightAsString,
        setWeight,
    }
}