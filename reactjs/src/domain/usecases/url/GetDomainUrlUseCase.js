import { ERROR_MSG_INVALID_DOMAIN } from "../../../assets/strings/Strings"
import UrlRepository from "../../../data/repositories/url/UrlRepository"
import RemoteRepository from "../../../data/repositories/remote/RemoteRepository"

function GetDomainUrlUseCase() {

    const { getDomainUrlData } = RemoteRepository()

    /**
     * execute usecase of getting domain url.
     * @returns {Promise}
     */
    function executeGetDomainUrlUseCase() {
        return getDomainUrlData()
    }

    return {
        executeGetDomainUrlUseCase
    }
}

export default GetDomainUrlUseCase