import UrlRepository from "../../../data/repositories/url/UrlRepository"
import { logDebug } from "../../../utils/logger/Logger"

const LOG_TAG = "GetPhoneNumberFromUrlUseCase"

function GetPhoneNumberFromUrlUseCase() {

    const { getDeviceMobileNumber } = UrlRepository()

    /**
     * Get phone number information from url.
     * @param {String} urlQueryString 
     * Refs. urlQueryString format is like '?phoneNumber=01012341234'.
     * @returns {String}
     */
    function executeGetPhoneNumberFromUrlUseCase(urlQueryString) {
        logDebug(LOG_TAG, ">>> START to get PHONE NUMBER from Url, urlQueryString param: " + urlQueryString)
        return getDeviceMobileNumber(urlQueryString)
    }

    return {
        executeGetPhoneNumberFromUrlUseCase
    }
}

export default GetPhoneNumberFromUrlUseCase