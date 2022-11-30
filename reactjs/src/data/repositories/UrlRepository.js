import { logDebug } from "../../utils/logger/Logger"

const LOG_TAG = "UrlRepository"

const CryptoJS = require("crypto-js")

/**
 * cryptojs decryption secret key and iv.
 */
const CRYPTO_SECRET_KEY = ""
const CRYPTO_SECRET_IV = ""
const CRYPTO_PADDING_MODE = CryptoJS.pad.Pkcs7
const CRYPTO_MODE = CryptoJS.mode.CBC

/**
 * cryptojs module enable.
 */
const CRYPTO_ENABLE = false

/**
 * activities query parameter keys.
 */
const DEVICE_MOBILE_NUMBER = ["mobilePhoneNumber", "loadKey"]
const TYPES = "types"


export default function UrlRepository() {

    /**
     * parse url query parameters with delimeters and return array.
     * @param {String} urlQueryString
     * @returns {Array}
     */
    function getQueryParams(urlQueryString) {
        let hasQuestion = urlQueryString.includes("?")
        let hasAmpersand = urlQueryString.includes("&")
        let result = []

        if (hasQuestion) {
            let queryStrings = urlQueryString.replace("?", "")

            if (hasAmpersand) {
                let splitStrings = queryStrings.split("&")
                for (const item of splitStrings) {
                    result.push(item)
                }

            } else {
                result.push(queryStrings)
            }

        } else {
            result = []
        }
        return result
    }

    /**
     * parse mobile phone number information from query parameter array.
     * @param {String} urlQueryString
     * @returns {String}
     */
    function getDeviceMobileNumber(urlQueryString) {

        let urlQueryParams = getQueryParams(urlQueryString)
        if (urlQueryParams == null || urlQueryParams.length === 0) {
            return null
        }

        for (const item of urlQueryParams) {
            if (!item.includes("=")) {
                return null
            }
            let splitStrings = item.split("=")
            let paramKeyName = splitStrings[0]

            if (hasMatchedPhoneNumber(paramKeyName)) {
                let deviceMobileNumber = splitStrings[1]
                return decryptDeviceMobileNumber(deviceMobileNumber)
            }
        }
        return null
    }

    function hasMatchedPhoneNumber(paramKeyName) {
        for (const phoneNumberItem of DEVICE_MOBILE_NUMBER) {
            if (phoneNumberItem === paramKeyName) {
                return true
            }
        }
        return false
    }

    /**
     * parse event types information from query parameter array.
     * @param {String} urlQueryString
     * @returns {String}
     */
    function getTypes(urlQueryString) {

        let urlQueryParams = getQueryParams(urlQueryString)
        if (urlQueryParams == null || urlQueryParams.length === 0) {
            return null
        }

        for (const item of urlQueryParams) {
            if (!item.includes("=")) {
                return null
            }

            let splitStrings = item.split("=")
            let paramKeyName = splitStrings[0]

            if (TYPES === paramKeyName) {
                let eventTypes = splitStrings[1]
                if (eventTypes.includes(",")) {
                    let splitEventTypes = eventTypes.split(",")
                    return splitEventTypes

                } else {
                    return eventTypes
                }
            }
        }
        return null
    }

    /**
     * decrypt mobile phone number.
     * @param {String} deviceMobileNumber
     * @returns {String}
     */
    function decryptDeviceMobileNumber(deviceMobileNumber) {
        if (CRYPTO_ENABLE) {
            const cipher = CryptoJS.AES.decrypt(deviceMobileNumber, CryptoJS.enc.Utf8.parse(CRYPTO_SECRET_KEY), {
                iv: CryptoJS.enc.Utf8.parse(CRYPTO_SECRET_IV),
                padding: CRYPTO_PADDING_MODE,
                mode: CRYPTO_MODE
            })

            const utf8EncodedCiphertext = cipher.toString(CryptoJS.enc.Utf8)
            logDebug(LOG_TAG, ">>> utf8EncodedCiphertext: " + utf8EncodedCiphertext)
            return utf8EncodedCiphertext

        } else {
            return deviceMobileNumber
        }
    }

    return {
        getDeviceMobileNumber,
        getTypes
    }
}