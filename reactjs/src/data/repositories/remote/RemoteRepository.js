import { logDebug, logDebugWithLine } from "../../../utils/logger/Logger"
import AxiosManager from "../../sources/axios/AxiosManager"

const LOG_TAG = "RemoteRepository"

function RemoteRepository() {

    const {
        getActivities,
        getActivitiesWithExtraData,
        sendSmsMessage,
        setDomainUrl,
        getDomainUrl
    } = AxiosManager()

    /**
     * initialize domain url derived from web page url.
     * @param {String} domainUrl 
     * @returns {Promise}
     */
    function initializeDomainUrl(domainUrl) {
        logDebug(LOG_TAG, ">>> initializeDomainUrl::Domain URL: " + domainUrl)
        return new Promise((fulfill, reject) => {
            setDomainUrl(domainUrl).then(() => {
                fulfill()

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * get domain url.
     * @returns {String}
     */
    function getDomainUrlData() {
        return getDomainUrl()
    }

    /**
     * get activities information.
     * @param {String} deviceMobileNumber 
     * @param {Array} types
     * @returns {Promise}
     */
    function getActivitiesInfo(deviceMobileNumber, types) {
        return new Promise((fulfill, reject) => {
            getActivities(deviceMobileNumber, types).then((response) => {
                logDebugWithLine(LOG_TAG, "<<< response LENGTH: " + response.length + "\n, RESPONSE: \n" + response)
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
    function getActivitiesWithExtra(deviceMobileNumber, types, startDateTime) {
        return new Promise((fulfill, reject) => {
            getActivitiesWithExtraData(deviceMobileNumber, types, startDateTime).then((response) => {
                logDebugWithLine(LOG_TAG, "<<< RESPONSE: \n" + response)
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * ask device to send SMS message.
     * @param {String} deviceMobileNumber 
     * @returns {Promise}
     */
    function sendSms(deviceMobileNumber) {
        return new Promise((fulfill, reject) => {
            sendSmsMessage(deviceMobileNumber, deviceMobileNumber).then((response) => {
                logDebugWithLine(LOG_TAG, "<<< RESPONSE: \n" + response)
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