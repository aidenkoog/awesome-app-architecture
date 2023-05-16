import RemoteRepository from "../../../data/repositories/remote/RemoteRepository"
import UrlRepository from "../../../data/repositories/url/UrlRepository"
import { logDebug } from "../../../utils/logger/Logger"
import { hasValidPhoneNumber } from "../../../utils/regex/RegexUtil"

const LOG_TAG = "GetDecryptedPhoneNumberUseCase"

function GetDecryptedPhoneNumberUseCase() {

    const { decryptDeviceMobileNumber } = UrlRepository()
    const { getDomainUrlData } = RemoteRepository()

    /**
     * Get decrypted mobile phone number.
     * @param {String} deviceMobileNumber 
     * @returns {String}
     */
    function executeGetDecryptedPhoneNumberUseCase(deviceMobileNumber) {
        if (hasValidPhoneNumber(deviceMobileNumber)) {
            if (hasDomainForDebug()) {
                logDebug(LOG_TAG, "<<< PHONE NUMBER is NOT ENCRYPTED and already VALID, return ITSELF")
                return deviceMobileNumber
            }
        }
        return decryptDeviceMobileNumber(deviceMobileNumber)
    }

    /**
     * Check if domain is for debugging.
     * @returns {Boolean}
     */
    function hasDomainForDebug() {
        const domainUrl = getDomainUrlData()
        logDebug(LOG_TAG, ">>> DOMAIN: " + domainUrl)
        if (domainUrl == null || domainUrl === undefined || domainUrl === "") {
            return false
        }
        if (domainUrl.includes("localhost") || domainUrl.includes("develop") || domainUrl.includes("test")) {
            return true
        } else {
            return false
        }
    }

    return {
        executeGetDecryptedPhoneNumberUseCase
    }
}

export default GetDecryptedPhoneNumberUseCase