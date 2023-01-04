import RemoteRepository from "../../../data/repositories/remote/RemoteRepository"
import { logDebug } from "../../../utils/logger/Logger"

const LOG_TAG = "GetDomainUrlUseCase"

function GetDomainUrlUseCase() {

    const { getDomainUrlData } = RemoteRepository()

    /**
     * Execute usecase of getting domain url.
     * @returns {Promise}
     */
    function executeGetDomainUrlUseCase() {
        const domainUrlData = getDomainUrlData()
        logDebug(LOG_TAG, ">>> DOMAIN URL Data: " + domainUrlData)
        return domainUrlData
    }

    return {
        executeGetDomainUrlUseCase
    }
}

export default GetDomainUrlUseCase