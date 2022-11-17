import { stringToBytes } from "convert-string"
import { bleDeviceNameAtom, bleSequenceIdAtom } from "../../../adapters"
import { useRecoilValue } from "recoil"
import Constants from "../../../../utils/Constants"
import { convertIntToBytes, convertIntToOneByte, toUtf8Bytes } from "../../../../utils/ble/BleUtil"
import { logDebug } from "../../../../utils/logger/Logger"

/**
 * 
 * 
 * This code will be refactored soon.
 * Under construction...
 * 
 * 
 */
const LOG_TAG = Constants.LOG.BT_MESSAGE

const PREFIX = "\x00"
const TYPE = "\x04"

const PAIRING = "PAIRING"
const DIALOGUE = "DIALOGUE"
const PAIRING_VERSION = "\x01"
const DIALOGUE_VERSION = "\x03"

const STATUS = "\x01"
const DUMMY_USER_ID = "3B7750F5997B49DA856711DD841D0676"
const MESSAGE_ID = "\x12" + "\x34" + "\x56" + "\x78"
const DIALOGUE_STATUS = "\x00" + "\x00" + "\x00" + "\x00" + "\x00" + "\x00" + "\x04" + "\x10"
const CMD = "\x02"
const REQUEST_TYPE = "\x01"
const SOURCE_IP = "\x00" + "\x00" + "\x00" + "\x00"
const HEIGHT = "\x00" + "\xAF"
const WEIGHT = "\x00" + "\x78"
const GENDER = "\x00"
const AGE = "\x43"
const REMINDER = "\x00" + "\x00" + "\x00" + "\x00"
const DATE = "\x60" + "\x5A" + "\xEA" + "\x07"
const FW_VERSION = "\x41" + "\x42" + "\x43" + "\x44" + "\x45" + "\x46" + "\x47" + "\x48"

const SYNC_PAYLOAD = "\xC0" + "\x00" + "\x01" + "\xC1"
const DISCONNECT_PAYLOAD = "\xC0" + "\x00" + "\x01" + "\xC2"

/**
 * 0x00
 */
let prefixBytes = null
let dataLengthBytes = null

/**
 * 0x04
 */
let typeBytes = null

let versionBytes = null
let sequenceIdBytes = null
let statusBytes = null
let deviceNameBytes = null
let userIdBytes = null
let dataBytesLength = null

let messageIdBytes = null
let dialogueStatusBytes = null
let cmdBytes = null
let requestTypeBytes = null
let sourceIpBytes = null
let heightBytes = null
let weightBytes = null
let genderBytes = null
let ageBytes = null
let reminderBytes = null
let dateBytes = null
let fwVersionBytes = null
let payloadLengthBytes = null
let syncPayloadBytes = null

const RequestMessage = () => {

    const bleDeviceName = useRecoilValue(bleDeviceNameAtom)
    const bleSequenceId = useRecoilValue(bleSequenceIdAtom)

    getPrefixBytes = () => {
        return stringToBytes(PREFIX)
    }

    getDataLengthBytes = () => {
        return convertIntToOneByte(dataBytesLength)
    }

    getTypeBytes = () => {
        return stringToBytes(TYPE)
    }

    getVersionBytes = (versionType) => {
        return stringToBytes(versionType == PAIRING ? PAIRING_VERSION : DIALOGUE_VERSION)
    }

    getSequenceIdBytes = () => {
        return convertIntToBytes(bleSequenceId)
    }

    getStatusBytes = () => {
        return stringToBytes(STATUS)
    }

    getDeviceNameBytes = () => {
        return toUtf8Bytes(bleDeviceName)
    }

    getUserIdBytes = () => {
        return toUtf8Bytes(DUMMY_USER_ID)
    }

    getMessageIdBytes = () => {
        return stringToBytes(MESSAGE_ID)
    }

    getDialogueStatusBytes = () => {
        return stringToBytes(DIALOGUE_STATUS)
    }

    getCmdBytes = () => {
        return stringToBytes(CMD)
    }

    getRequestTypeBytes = () => {
        return stringToBytes(REQUEST_TYPE)
    }

    getSourceIpBytes = () => {
        return stringToBytes(SOURCE_IP)
    }

    getHeightBytes = () => {
        return stringToBytes(HEIGHT)
    }

    getWeightBytes = () => {
        return stringToBytes(WEIGHT)
    }

    getGenderBytes = () => {
        return stringToBytes(GENDER)
    }

    getAgeBytes = () => {
        return stringToBytes(AGE)
    }

    getReminderBytes = () => {
        return stringToBytes(REMINDER)
    }

    getDateBytes = () => {
        return stringToBytes(DATE)
    }

    getFwVersionBytes = () => {
        return stringToBytes(FW_VERSION)
    }

    getPayloadLengthBytes = (action) => {
        switch (action) {
            case 'sync':
                return convertIntToBytes(syncPayloadBytes.length)

            case 'disconnect':
                return convertIntToBytes(disconnectPayloadBytes.length)
        }
    }

    getSyncPayloadBytes = () => {
        return stringToBytes(SYNC_PAYLOAD)
    }

    getDisconnectPayloadBytes = () => {
        return stringToBytes(DISCONNECT_PAYLOAD)
    }


    initializeAutenticateMessages = () => {
        versionBytes = this.getVersionBytes(PAIRING)
        sequenceIdBytes = this.getSequenceIdBytes()
        statusBytes = this.getStatusBytes()
        deviceNameBytes = this.getDeviceNameBytes()
        userIdBytes = this.getUserIdBytes()

        dataBytesLength =
            versionBytes.length
            + sequenceIdBytes.length
            + statusBytes.length
            + deviceNameBytes.length
            + userIdBytes.length

        prefixBytes = this.getPrefixBytes()
        dataLengthBytes = this.getDataLengthBytes()
        typeBytes = this.getTypeBytes()

        logDebug(LOG_TAG, ">>> data bytes length: " + dataBytesLength)
    }

    getAuthenticateMessageBytes = () => {
        this.initializeAutenticateMessages()

        let authenticateMessageBytes = []

        copyBytes(authenticateMessageBytes, prefixBytes)
        copyBytes(authenticateMessageBytes, dataLengthBytes)
        copyBytes(authenticateMessageBytes, typeBytes)
        copyBytes(authenticateMessageBytes, versionBytes)
        copyBytes(authenticateMessageBytes, sequenceIdBytes)
        copyBytes(authenticateMessageBytes, statusBytes)
        copyBytes(authenticateMessageBytes, deviceNameBytes)
        copyBytes(authenticateMessageBytes, userIdBytes)

        logDebug(LOG_TAG, ">>> copied authentication message: " + authenticateMessageBytes)
        logDebug(LOG_TAG, ">>> copied authentication message length: " + authenticateMessageBytes.length)

        return authenticateMessageBytes
    }

    initializeSyncMessages = () => {
        versionBytes = this.getVersionBytes(DIALOGUE)
        deviceNameBytes = this.getDeviceNameBytes()
        messageIdBytes = this.getMessageIdBytes()
        sequenceIdBytes = this.getSequenceIdBytes()
        dialogueStatusBytes = this.getDialogueStatusBytes()
        cmdBytes = this.getCmdBytes()
        requestTypeBytes = this.getRequestTypeBytes()
        sourceIpBytes = this.getSourceIpBytes()
        heightBytes = this.getHeightBytes()
        weightBytes = this.getWeightBytes()
        genderBytes = this.getGenderBytes()
        ageBytes = this.getAgeBytes()
        reminderBytes = this.getReminderBytes()
        dateBytes = this.getDateBytes()
        fwVersionBytes = this.getFwVersionBytes()

        syncPayloadBytes = this.getSyncPayloadBytes()
        payloadLengthBytes = this.getPayloadLengthBytes('sync')

        dataBytesLength =
            versionBytes.length
            + deviceNameBytes.length
            + messageIdBytes.length
            + sequenceIdBytes.length
            + dialogueStatusBytes.length
            + cmdBytes.length
            + requestTypeBytes.length
            + sourceIpBytes.length
            + heightBytes.length
            + weightBytes.length
            + genderBytes.length
            + ageBytes.length
            + reminderBytes.length
            + dateBytes.length
            + fwVersionBytes.length
            + payloadLengthBytes.length
            + syncPayloadBytes.length

        prefixBytes = this.getPrefixBytes()
        dataLengthBytes = this.getDataLengthBytes()
        typeBytes = this.getTypeBytes()

        logDebug(LOG_TAG, ">>> data bytes length: " + dataBytesLength)
    }

    getSyncMessageBytes = () => {
        this.initializeSyncMessages()

        let syncMessageBytes = []

        copyBytes(syncMessageBytes, prefixBytes)
        copyBytes(syncMessageBytes, dataLengthBytes)
        copyBytes(syncMessageBytes, typeBytes)
        copyBytes(syncMessageBytes, versionBytes)
        copyBytes(syncMessageBytes, deviceNameBytes)
        copyBytes(syncMessageBytes, messageIdBytes)
        copyBytes(syncMessageBytes, sequenceIdBytes)
        copyBytes(syncMessageBytes, dialogueStatusBytes)
        copyBytes(syncMessageBytes, cmdBytes)
        copyBytes(syncMessageBytes, requestTypeBytes)
        copyBytes(syncMessageBytes, sourceIpBytes)
        copyBytes(syncMessageBytes, heightBytes)
        copyBytes(syncMessageBytes, weightBytes)
        copyBytes(syncMessageBytes, genderBytes)
        copyBytes(syncMessageBytes, ageBytes)
        copyBytes(syncMessageBytes, reminderBytes)
        copyBytes(syncMessageBytes, dateBytes)
        copyBytes(syncMessageBytes, fwVersionBytes)
        copyBytes(syncMessageBytes, payloadLengthBytes)
        copyBytes(syncMessageBytes, syncPayloadBytes)

        logDebug(LOG_TAG, ">>> copied sync message: " + syncMessageBytes)
        logDebug(LOG_TAG, ">>> copied sync message length: " + syncMessageBytes.length)

        return syncMessageBytes
    }

    initializeDisconnectMessages = () => {
        versionBytes = this.getVersionBytes(DIALOGUE)
        deviceNameBytes = this.getDeviceNameBytes()
        messageIdBytes = this.getMessageIdBytes()
        sequenceIdBytes = this.getSequenceIdBytes()
        dialogueStatusBytes = this.getDialogueStatusBytes()
        cmdBytes = this.getCmdBytes()
        requestTypeBytes = this.getRequestTypeBytes()
        sourceIpBytes = this.getSourceIpBytes()
        heightBytes = this.getHeightBytes()
        weightBytes = this.getWeightBytes()
        genderBytes = this.getGenderBytes()
        ageBytes = this.getAgeBytes()
        reminderBytes = this.getReminderBytes()
        dateBytes = this.getDateBytes()
        fwVersionBytes = this.getFwVersionBytes()

        disconnectPayloadBytes = this.getDisconnectPayloadBytes()
        payloadLengthBytes = this.getPayloadLengthBytes('disconnect')

        dataBytesLength =
            versionBytes.length
            + deviceNameBytes.length
            + messageIdBytes.length
            + sequenceIdBytes.length
            + dialogueStatusBytes.length
            + cmdBytes.length
            + requestTypeBytes.length
            + sourceIpBytes.length
            + heightBytes.length
            + weightBytes.length
            + genderBytes.length
            + ageBytes.length
            + reminderBytes.length
            + dateBytes.length
            + fwVersionBytes.length
            + payloadLengthBytes.length
            + disconnectPayloadBytes.length

        prefixBytes = this.getPrefixBytes()
        dataLengthBytes = this.getDataLengthBytes()
        typeBytes = this.getTypeBytes()

        logDebug(LOG_TAG, ">>> data bytes length: " + dataBytesLength)
    }

    getDisconnectMessageBytes = () => {
        this.initializeDisconnectMessages()

        let disconnectMessageBytes = []

        copyBytes(disconnectMessageBytes, prefixBytes)
        copyBytes(disconnectMessageBytes, dataLengthBytes)
        copyBytes(disconnectMessageBytes, typeBytes)
        copyBytes(disconnectMessageBytes, versionBytes)
        copyBytes(disconnectMessageBytes, deviceNameBytes)
        copyBytes(disconnectMessageBytes, messageIdBytes)
        copyBytes(disconnectMessageBytes, sequenceIdBytes)
        copyBytes(disconnectMessageBytes, dialogueStatusBytes)
        copyBytes(disconnectMessageBytes, cmdBytes)
        copyBytes(disconnectMessageBytes, requestTypeBytes)
        copyBytes(disconnectMessageBytes, sourceIpBytes)
        copyBytes(disconnectMessageBytes, heightBytes)
        copyBytes(disconnectMessageBytes, weightBytes)
        copyBytes(disconnectMessageBytes, genderBytes)
        copyBytes(disconnectMessageBytes, ageBytes)
        copyBytes(disconnectMessageBytes, reminderBytes)
        copyBytes(disconnectMessageBytes, dateBytes)
        copyBytes(disconnectMessageBytes, fwVersionBytes)
        copyBytes(disconnectMessageBytes, payloadLengthBytes)
        copyBytes(disconnectMessageBytes, disconnectPayloadBytes)

        logDebug(LOG_TAG, ">>> copied disconnect message: " + disconnectMessageBytes)
        logDebug(LOG_TAG, ">>> copied disconnect message length: " + disconnectMessageBytes.length)

        return disconnectMessageBytes
    }

    copyBytes = (destinationBytes, sourceBytes) => {
        for (const item of sourceBytes) {
            destinationBytes.push(item)
        }
        logDebug(LOG_TAG, ">>> copied bytes: " + sourceBytes)
    }

    return {
        getAuthenticateMessageBytes,
        getSyncMessageBytes,
        getDisconnectMessageBytes
    }
}

export default RequestMessage