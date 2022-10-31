import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertIntToByteArray, convertStringToByteArray } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_HEIGHT
const DATA_LENGTH = 15

let data = null

const Serial = () => {

    getSerialAsString = () => {
        return convertStringToByteArray(data).toString()
    }

    setSerial = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = new ArrayBuffer(DATA_LENGTH)
        data = convertStringToByteArray(buffer)
    }

    useEffect(() => {
        data = convertIntToByteArray(sequenceId++)
    }, [])

    return {
        getSerialAsString,
        setSerial,
    }
}