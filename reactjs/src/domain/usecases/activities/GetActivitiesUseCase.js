import RemoteRepository from "../../../data/repositories/remote/RemoteRepository"

function GetActivitiesUseCase() {

    const { getActivitiesInfo, getActivitiesWithExtra } = RemoteRepository()

    /**
     * get activities information corresponding to parameter, that is, mobile phone number.
     * @param {String} deviceMobileNumber
     * @param {Array} types
     * @returns {Promise}
     */
    function executeGetActivitiesUseCase(deviceMobileNumber, types) {
        return new Promise((fulfill, reject) => {
            getActivitiesInfo(deviceMobileNumber, types).then((response) => {
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * get activities information with extra data.
     * @param {String} deviceMobileNumber
     * @param {String} types
     * @param {String} startDateTime
     * @returns {Promise}
     */
    function executeGetActivitiesWithExtraUseCase(deviceMobileNumber, types, startDateTime) {
        return new Promise((fulfill, reject) => {
            getActivitiesWithExtra(deviceMobileNumber, types, startDateTime).then((response) => {
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