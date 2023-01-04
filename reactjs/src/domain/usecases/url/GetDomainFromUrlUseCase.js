import UrlRepository from "../../../data/repositories/url/UrlRepository"

function GetDomainFromUrlUseCase() {

    const { getDomain } = UrlRepository()

    /**
     * Get type information from url.
     * @param {String} urlLocation 
     * @returns {String}
     * @deprecated
     */
    function executeGetDomainFromUrlUseCase(urlLocation) {
        return getDomain(urlLocation)
    }

    return {
        executeGetDomainFromUrlUseCase
    }
}

export default GetDomainFromUrlUseCase