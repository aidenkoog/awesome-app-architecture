import UrlRepository from "../../data/repositories/UrlRepository"

function GetPhoneNumberFromUrlUseCase() {

    const { getWatchMobileNumber } = UrlRepository()

    /**
     * get phone number information from url.
     * @param {String} urlQueryString 
     * refs. urlQueryString format is like '?phoneNumber=01012341234'.
     * @returns 
     */
    function executeGetPhoneNumberFromUrlUseCase(urlQueryString) {
        return getWatchMobileNumber(urlQueryString)
    }

    return {
        executeGetPhoneNumberFromUrlUseCase
    }
}

export default GetPhoneNumberFromUrlUseCase