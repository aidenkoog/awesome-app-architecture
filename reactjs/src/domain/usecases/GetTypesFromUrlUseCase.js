import UrlRepository from "../../data/repositories/UrlRepository"

function GetTypesFromUrlUseCase() {

    const { getTypes } = UrlRepository()

    /**
     * get type information from url.
     * @param {string} urlQueryString 
     * refs. urlQueryString format is like '?phoneNumber=01012341234&types=EVENT_TYPE1,EVENT_TYPE2'.
     * @returns 
     */
    function executeGetTypesFromUrlUseCase(urlQueryString) {
        return getTypes(urlQueryString)
    }

    return {
        executeGetTypesFromUrlUseCase
    }
}

export default GetTypesFromUrlUseCase