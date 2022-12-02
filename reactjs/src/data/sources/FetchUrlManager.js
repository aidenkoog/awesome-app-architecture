import { logDebugWithLine, outputErrorLog } from "../../utils/logger/Logger"
import { API_GET_ACTIVITIES, API_GET_ACTIVITIES_EXTRAS } from "./ApiUrl"

const LOG_TAG = "FetchManager"

/**
 * default fetch manager for handling http get, post and etc. 
 * @Deprecated
 */
const FetchManager = () => {

    /**
     * call api which gets activities information with types and startDateTime.
     * @param {String} deviceMobileNumber
     * @param {Array} types
     * @param {String} startDateTime
     * @returns {Promise}
     */
    function fetchActivitiesWhenRetry(deviceMobileNumber, types, startDateTime) {
        logDebugWithLine(LOG_TAG,
            ">>> deviceMobileNumber: " + deviceMobileNumber
            + ", types: " + types
            + ", startDateTime: " + startDateTime)

        return new Promise((fulfill, reject) => {
            let params = {
                deviceMobileNumber: deviceMobileNumber,
                types: types == null ? [] : types,
                startDateTime: ""
            }
            fetchPost(params).then((response) => {
                fulfill(response)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by axiosPost")
                reject(e)
            })
        })
    }

    /**
     * execute fetch's get.
     * @returns {Promise}
     */
    function fetchGet() {
        return new Promise((fulfill, reject) => {
            fetch(API_GET_ACTIVITIES).then(response => response.json()).then(response => {
                fulfill(response)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by fetch")
                reject(e)
            })
        })
    }

    /**
     * execute fetch's post.
     * @param {Any} params 
     * @returns {Promise}
     */
    function fetchPost(params) {
        return new Promise((fulfill, reject) => {

            fetch(API_GET_ACTIVITIES_EXTRAS, {
                method: "POST", body: JSON.stringify({
                    deviceMobileNumber: params.deviceMobileNumber,
                    types: params.types,
                    startDateTime: params.startDateTime
                })
            }).then(
                response => response.json()).then(response => {
                    logDebugWithLine(LOG_TAG, "<<< response: " + response)
                    fulfill(response)

                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by fetch")
                    reject(e)
                })
        })
    }

    return {
        fetchActivitiesWhenRetry
    }
}

export default FetchManager