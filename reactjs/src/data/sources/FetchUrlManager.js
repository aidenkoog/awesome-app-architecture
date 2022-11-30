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
     * @param {string} watchMobileNumber
     * @param {Array} types
     * @param {string} startDateTime
     * @returns {Promise}
     */
    function fetchActivitiesWhenRetry(watchMobileNumber, types, startDateTime) {
        logDebugWithLine(LOG_TAG,
            ">>> watchMobileNumber: " + watchMobileNumber
            + ", types: " + types
            + ", startDateTime: " + startDateTime)

        return new Promise((fulfill, reject) => {
            let params = {
                watchMobileNumber: watchMobileNumber,
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

    function fetchPost(params) {
        return new Promise((fulfill, reject) => {

            fetch(API_GET_ACTIVITIES_EXTRAS, {
                method: "POST", body: JSON.stringify({
                    watchMobileNumber: params.watchMobileNumber,
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