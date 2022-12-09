import { logDebug, logDebugWithLine, outputErrorLog } from "../../../utils/logger/Logger"
import base64 from 'base-64'

const LOG_TAG = "UrlRepository"

const CryptoJS = require("crypto-js")

/**
 * cryptojs decryption secret key and iv.
 */
const CRYPTO_SECRET_KEY = "pol112__smartwat"
const CRYPTO_SECRET_IV = "#smart__project#"
const CRYPTO_PADDING_MODE = CryptoJS.pad.Pkcs7
const CRYPTO_MODE = CryptoJS.mode.CBC

/**
 * cryptojs module enable.
 */
const CRYPTO_ENABLE = true

/**
 * domain prefix list.
 */
const DOMAIN_PREFIX_LIST = ["http://", "https://"]

/**
 * activities query parameter keys.
 */
const WATCH_MOBILE_NUMBER = ["loadKey"]
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
                logDebug(LOG_TAG, "[TEST] encrypted: " + encryptDeviceMobileNumber(splitStrings[1]))
                return splitStrings[1]
            }
        }
        return null
    }

    /**
     * check if there's matched parameter key corresponding to mobile number key array.
     * @param {String} paramKeyName 
     * @returns {Boolean}
     */
    function hasMatchedPhoneNumber(paramKeyName) {
        for (const phoneNumberItem of WATCH_MOBILE_NUMBER) {
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
     * parse domain url from web url.
     * @param {String} urlLocationString 
     * @returns {String}
     */
    function getDomain(urlLocationString) {
        if (urlLocationString == null || urlLocationString === "") {
            outputErrorLog(LOG_TAG, "invalid urlLocationString (" + urlLocationString + ")")
            return null
        }

        let hasDomainPrefix = false
        let locationWithoutPrefix = ""
        let domainPrefix = ""

        for (const item of DOMAIN_PREFIX_LIST) {
            if (urlLocationString.includes(item)) {
                hasDomainPrefix = true
                domainPrefix = item
                locationWithoutPrefix = urlLocationString.replace(item, "")
                break
            }
        }

        if (!hasDomainPrefix) {
            outputErrorLog(LOG_TAG, "there's no any domain prefix such as http:// or https://")
            return null
        }

        if (locationWithoutPrefix.includes("/")) {
            let urlItemListBySlash = locationWithoutPrefix.split("/")
            const domainUrl = urlItemListBySlash[0]
            if (domainUrl == null || domainUrl === "") {
                outputErrorLog(LOG_TAG, "domainUrl is null or empty")
                return null

            } else {
                const result = domainPrefix + domainUrl
                logDebug(LOG_TAG, ">>> domain url: " + result)
                return result
            }

        } else {
            if (urlLocationString == null || urlLocationString === "") {
                outputErrorLog(LOG_TAG, "domainUrl is null or empty (refs. with no any queries)")
                return null

            } else {
                const result = domainPrefix + urlLocationString
                logDebug(LOG_TAG, ">>> domain url (refs. with no any queries): " + result)
                return result
            }
        }
    }

    /**
     * decrypt mobile phone number.
     * @param {String} encryptedDevicePhoneNumber
     * @returns {String}
     */
    function decryptDeviceMobileNumber(encryptedDevicePhoneNumber) {
        logDebugWithLine(LOG_TAG, "decryption start: encrypted phone number: " + encryptedDevicePhoneNumber)

        const secretKeyWordArray = CryptoJS.enc.Utf8.parse(CRYPTO_SECRET_KEY)
        const ivKeyWordArray = CryptoJS.enc.Utf8.parse(CRYPTO_SECRET_IV)

        if (CRYPTO_ENABLE) {
            try {
                const base64Decoded = base64.decode(encryptedDevicePhoneNumber)
                const cipher = CryptoJS.AES.decrypt(base64Decoded, secretKeyWordArray, {
                    iv: ivKeyWordArray,
                    padding: CRYPTO_PADDING_MODE,
                    mode: CRYPTO_MODE
                })
                logDebug(LOG_TAG, ">>> cipher: " + cipher)
                return cipher.toString(CryptoJS.enc.Utf8)

            } catch (e) {
                outputErrorLog(LOG_TAG, e + " occurred by decrypting / decoding")
                return null
            }

        } else {
            return encryptedDevicePhoneNumber
        }
    }

    /**
     * encrypt mobile phone number.
     * @param {String} deviceMobileNumber 
     * @returns {String}
     */
    function encryptDeviceMobileNumber(deviceMobileNumber) {
        logDebugWithLine(LOG_TAG, "encryption start: phone number: " + deviceMobileNumber)

        const secretKeyWordArray = CryptoJS.enc.Utf8.parse(CRYPTO_SECRET_KEY)
        const ivKeyWordArray = CryptoJS.enc.Utf8.parse(CRYPTO_SECRET_IV)

        if (CRYPTO_ENABLE) {
            try {
                const cipher = CryptoJS.AES.encrypt(deviceMobileNumber, secretKeyWordArray, {
                    iv: ivKeyWordArray,
                    padding: CRYPTO_PADDING_MODE,
                    mode: CRYPTO_MODE
                })
                return base64.encode(cipher)

            } catch (e) {
                outputErrorLog(LOG_TAG, e + " occurred by encrypting / encoding")
                return null
            }

        } else {
            return deviceMobileNumber
        }
    }

    return {
        getDeviceMobileNumber,
        decryptDeviceMobileNumber,
        getTypes,
        getDomain
    }
}