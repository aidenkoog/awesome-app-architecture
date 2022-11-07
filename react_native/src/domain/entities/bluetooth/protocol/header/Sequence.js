import Constants from "../../../../../utils/Constants"
import { useEffect } from "react"
import { logDebug } from "../../../../../utils/logger/Logger"
import { convertByteArrayToNumeric, convertIntToByteArray, convertLongToByteArray } from "../../../../../utils/ble/BleUtil"

const LOG_TAG = Constants.LOG.HEADER_BT_REQ_HEIGHT
const DATA_LENGTH = 2

let data = null
let sequenceId = 0

const Sequence = () => {

    getSequenceAsString = () => {
        return convertByteArrayToNumeric(data).toString()
    }

    setSequence = (buffer) => {
        logDebug(LOG_TAG, "buffer: " + buffer)
        data = ArrayBuffer(DATA_LENGTH)
        //
    }

    useEffect(() => {
        data = convertIntToByteArray(sequenceId++)
    }, [])

    return {
        getSequenceAsString,
        setSequence,
    }
}