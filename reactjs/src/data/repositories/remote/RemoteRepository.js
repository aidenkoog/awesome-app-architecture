import AxiosManager from "../../sources/axios/AxiosManager"

function RemoteRepository() {

    const {
        getActivities,
        getActivitiesWithExtraData,
        sendSmsMessage,
        setDomainUrl,
        getDomainUrl
    } = AxiosManager()

    /**
     * Initialize domain url derived from web page url.
     * @param {String} domainUrl 
     * @returns {Promise}
     */
    function initializeDomainUrl(domainUrl) {
        return new Promise((fulfill, reject) => {
            setDomainUrl(domainUrl).then(() => {
                fulfill()

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * Get domain url.
     * @returns {String}
     */
    function getDomainUrlData() {
        return getDomainUrl()
    }

    /**
     * Get activities information.
     * @param {String} deviceMobileNumber 
     * @param {Array} types
     * @returns {Promise}
     */
    function getActivitiesInfo(deviceMobileNumber, types) {
        return new Promise((fulfill, reject) => {
            getActivities(deviceMobileNumber, types).then((response) => {
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * Get activities information with extra data.
     * @param {String} deviceMobileNumber 
     * @param {String} types
     * @param {String} startDateTime
     * @returns {Promise}
     */
    function getActivitiesWithExtra(deviceMobileNumber, types, startDateTime) {
        return new Promise((fulfill, reject) => {
            getActivitiesWithExtraData(deviceMobileNumber, types, startDateTime).then((response) => {
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * Ask device to send SMS message.
     * @param {String} deviceMobileNumber 
     * @returns {Promise}
     */
    function sendSms(deviceMobileNumber) {
        return new Promise((fulfill, reject) => {
            sendSmsMessage(deviceMobileNumber, deviceMobileNumber).then((response) => {
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        getActivitiesInfo,
        getActivitiesWithExtra,
        sendSms,
        initializeDomainUrl,
        getDomainUrlData
    }
}

export default RemoteRepository