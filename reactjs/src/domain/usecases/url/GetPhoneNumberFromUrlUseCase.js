import UrlRepository from "../../../data/repositories/url/UrlRepository"

function GetPhoneNumberFromUrlUseCase() {

    const { getDeviceMobileNumber } = UrlRepository()

    /**
     * get phone number information from url.
     * @param {String} urlQueryString 
     * refs. urlQueryString format is like '?phoneNumber=01012341234'.
     * @returns {String}
     */
    function executeGetPhoneNumberFromUrlUseCase(urlQueryString) {
        return getDeviceMobileNumber(urlQueryString)
    }

    return {
        executeGetPhoneNumberFromUrlUseCase
    }
}

export default GetPhoneNumberFromUrlUseCase