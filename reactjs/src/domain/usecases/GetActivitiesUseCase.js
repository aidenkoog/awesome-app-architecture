import RemoteRepository from "../../data/repositories/RemoteRepository"
import { logDebug } from "../../utils/logger/Logger"

const LOG_TAG = "GetActivitiesUseCase"

function GetActivitiesUseCase() {

    const { getActivitiesInfo, getActivitiesWithExtra } = RemoteRepository()

    /**
     * get activities information corresponding to parameter, that is, mobile phone number.
     * @param {string} watchMobileNumber
     * @param {Array} types
     * @returns {Promise}
     */
    function executeGetActivitiesUseCase(watchMobileNumber, types) {
        return new Promise((fulfill, reject) => {
            getActivitiesInfo(watchMobileNumber, types).then((response) => {
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * get activities information with extra data.
     * @param {string} watchMobileNumber
     * @param {string} types
     * @param {string} startDateTime
     * @returns {Promise}
     */
    function executeGetActivitiesWithExtraUseCase(watchMobileNumber, types, startDateTime) {
        logDebug(LOG_TAG, ">>> types: " + types)

        return new Promise((fulfill, reject) => {
            getActivitiesWithExtra(watchMobileNumber, types, startDateTime).then((response) => {
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        executeGetActivitiesUseCase,
        executeGetActivitiesWithExtraUseCase
    }
}

export default GetActivitiesUseCase