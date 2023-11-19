import {
    BATTERY_CHARACTERISTIC_UUID, FLOW_CONTROL_CHARACTERISTIC_UUID, TX_CHARACTERISTIC_UUID
} from "./BleConfig"

/**
 * convert byte to hex string.
 * @param {any} byte 
 * @return {string}
 */
export const byteToHex = (byte: any): string => {
    const key = '0123456789abcdef'
    let bytes = new Uint8Array(byte)
    let newHex = ''
    let currentChar = 0
    for (let i = 0; i < bytes.length; i++) {
        currentChar = (bytes[i] >> 4)
        newHex += key[currentChar]
        currentChar = (bytes[i] & 15)
        newHex += key[currentChar]
    }
    return newHex
}

/**
 * convert characteristic data to hex's.
 * @param {any} customData 
 * @return {Array}
 */
export const convertBleCustomToHexData = (customData: any): Array<any> => {
    let hexArray = []
    for (const item of customData) {
        hexArray.push(convertDecimalToHexString(item))
    }
    return hexArray
}

/**
 * convert decimal data to hex's.
 * @param {number} decimalData 
 * @return {string}
 */
export const convertDecimalToHexString = (decimalData: number): string => {
    if (decimalData < 0) {
        decimalData = 0xffffffff + decimalData + 1
    }
    return decimalData.toString(16).toUpperCase()
}


/**
 * Returns the notification feature name according to the uuid passed as an argument.
 * @param {string} uuid 
 * @return {string}
 */
export const getFeatureNameAsUuid = (uuid: string): string => {
    switch (uuid) {
        case TX_CHARACTERISTIC_UUID:
            return "TX notification"

        case FLOW_CONTROL_CHARACTERISTIC_UUID:
            return "Flow Control notification"

        case BATTERY_CHARACTERISTIC_UUID:
            return "Battery notification"

        default:
            return "Unknown notification"
    }
}