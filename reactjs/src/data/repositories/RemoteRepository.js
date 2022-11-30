import { logDebugWithLine } from "../../utils/logger/Logger"
import AxiosManager from "../sources/AxiosManager"

const LOG_TAG = "RemoteRepository"

function RemoteRepository() {

    const {
        getActivities,
        getActivitiesWithExtraData,
        sendSmsMessage
    } = AxiosManager()

    /**
     * get activities information.
     * @param {String} watchMobileNumber 
     * @param {Array} types
     * @returns {Promise}
     */
    function getActivitiesInfo(watchMobileNumber, types) {
        return new Promise((fulfill, reject) => {
            getActivities(watchMobileNumber, types).then((response) => {
                logDebugWithLine(LOG_TAG, "<<< response length: " + response.length + ", response: " + response)
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * get activities information with extra data.
     * @param {String} watchMobileNumber 
     * @param {String} types
     * @param {String} startDateTime
     * @returns {Promise}
     */
    function getActivitiesWithExtra(watchMobileNumber, types, startDateTime) {
        return new Promise((fulfill, reject) => {
            getActivitiesWithExtraData(watchMobileNumber, types, startDateTime).then((response) => {
                logDebugWithLine(LOG_TAG, "<<< response: " + response)
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * ask device to send SMS message.
     * @param {String} watchMobileNumber 
     * @returns {Promise}
     */
    function sendSms(watchMobileNumber) {
        return new Promise((fulfill, reject) => {
            sendSmsMessage(watchMobileNumber).then((response) => {
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
        sendSms
    }
}

export default RemoteRepository