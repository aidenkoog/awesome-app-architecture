import RemoteRepository from "../../data/repositories/RemoteRepository"
import UrlRepository from "../../data/repositories/UrlRepository"
import { ERROR_MSG_INVALID_DOMAIN } from "../../utils/error/ErrorMessages"

function SetDomainUrlUseCase() {

    const { initializeDomainUrl } = RemoteRepository()
    const { getDomain } = UrlRepository()

    /**
     * execute usecase of setting domain url derived from web page url.
     * @param {Location} urlLocation 
     * @returns {Promise}
     */
    function executeSetDomainUrlUseCase(urlLocation) {
        return new Promise((fulfill, reject) => {
            const domainUrl = getDomain(urlLocation.toString())
            if (domainUrl == null) {
                reject(ERROR_MSG_INVALID_DOMAIN)

            } else {
                initializeDomainUrl(domainUrl).then(() => {
                    fulfill()

                }).catch((e) => {
                    reject(e)
                })
            }
        })
    }

    return {
        executeSetDomainUrlUseCase
    }
}

export default SetDomainUrlUseCase