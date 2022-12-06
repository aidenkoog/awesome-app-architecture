import { logDebugWithLine } from "../../../utils/logger/Logger"
import AxiosManager from "../../sources/axios/AxiosManager"

const LOG_TAG = "RemoteRepository"

function RemoteRepository() {

    const {
        getActivities,
        getActivitiesWithExtraData,
        sendSmsMessage,
        setDomainUrl
    } = AxiosManager()

    /**
     * initialize domain url derived from web page url.
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
     * get activities information.
     * @param {String} deviceMobileNumber 
     * @param {Array} types
     * @returns {Promise}
     */
    function getActivitiesInfo(deviceMobileNumber, types) {
        return new Promise((fulfill, reject) => {
            getActivities(deviceMobileNumber, types).then((response) => {
                logDebugWithLine(LOG_TAG, "<<< response length: " + response.length + ", response: " + response)
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
                logDebugWithLine(LOG_TAG, "<<< response: " + response)
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
            sendSmsMessage(deviceMobileNumber).then((response) => {
                logDebugWithLine(LOG_TAG, "<<< response: " + response)
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
        initializeDomainUrl
    }
}

export default RemoteRepository