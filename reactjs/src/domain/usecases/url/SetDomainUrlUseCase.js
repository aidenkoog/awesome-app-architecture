import { ERROR_MSG_INVALID_DOMAIN } from "../../../assets/strings/Strings"
import UrlRepository from "../../../data/repositories/url/UrlRepository"
import RemoteRepository from "../../../data/repositories/remote/RemoteRepository"
import { logDebug, outputErrorLog } from "../../../utils/logger/Logger"

const LOG_TAG = "SetDomainUrlUseCase"

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
            logDebug(LOG_TAG, "<<< Domain URL: " + domainUrl)

            if (domainUrl == null) {
                outputErrorLog(LOG_TAG, "<<< Domain URL is NULL")
                reject(ERROR_MSG_INVALID_DOMAIN)

            } else {
                initializeDomainUrl(domainUrl).then(() => {
                    fulfill(domainUrl)

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