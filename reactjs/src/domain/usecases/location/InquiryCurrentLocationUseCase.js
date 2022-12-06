import RemoteRepository from "../../../data/repositories/remote/RemoteRepository"

function InquiryCurrentLocationUseCase() {

    const { getActivitiesInfo, getActivitiesWithExtra, sendSms } = RemoteRepository()

    /**
     * inquiry location data.
     * @param {String} deviceMobileNumber
     * @returns {Promise}
     * @deprecated
     */
    function executeInquiryCurrentLocationUseCase(deviceMobileNumber) {
        return new Promise((fulfill, reject) => {
            getActivitiesInfo(deviceMobileNumber, types).then((response) => {
                fulfill(response)

                sendSms(deviceMobileNumber).then((response) => {
                    fulfill(response)

                    getActivitiesWithExtra(watchMobileNumber, types, startDateTime).then((response) => {
                        fulfill(response)

                    }).catch((e) => {
                        reject(e)
                    })

                }).catch((e) => {
                    reject(e)
                })

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        executeInquiryCurrentLocationUseCase
    }
}

export default InquiryCurrentLocationUseCase