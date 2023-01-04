import axios from 'axios'
import { USE_DYNAMIC_DOMAIN_URL } from '../../../configs/Configs'
import { logDebug, logDebugWithLine, outputErrorLog } from '../../../utils/logger/Logger'
import { API_GET_ACTIVITIES, API_GET_ACTIVITIES_EXTRAS, API_SMS_SEND } from '../apis/ApiUrl'

const LOG_TAG = "AxiosManager"

/**
 * Activities query item size.
 */
const ONLY_RECENT = 1

/**
 * Axios default setting.
 */
const HEADER_CONTENT_TYPE = "application/x-www-form-urlencoded"
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = HEADER_CONTENT_TYPE

/**
 * Domain url fectched from web page url.
 */
let apiDomainUrl = ""

/**
 * Axios manager for handling http get, post and etc.
 */
function AxiosManager() {

    /**
     * Call api which gets activities information.
     * @param {String} deviceMobileNumber 
     * @param {Array} types 
     * @returns {Promise}
     */
    function getActivities(deviceMobileNumber, types = null) {
        return new Promise((fulfill, reject) => {
            let params = {
                watchMobileNumber: deviceMobileNumber,
                types: types == null ? [] : types,
                size: ONLY_RECENT
            }
            axiosGet(API_GET_ACTIVITIES, params).then((response) => {
                fulfill(response)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by axiosGet")
                reject(e)
            })
        })
    }

    /**
     * Call api which gets activities information with extra data.
     * @param {String} deviceMobileNumber
     * @param {String} types
     * @param {String} startDateTime
     * @returns {Promise}
     */
    function getActivitiesWithExtraData(deviceMobileNumber, types, startDateTime) {
        return new Promise((fulfill, reject) => {
            let params = {
                watchMobileNumber: deviceMobileNumber,
                types: types,
                startDateTime: startDateTime
            }
            axiosPost(API_GET_ACTIVITIES_EXTRAS, params).then((response) => {
                fulfill(response)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by axiosPost")
                reject(e)
            })
        })
    }

    /**
     * Ask device to send SMS message.
     * @param {String} sendTo 
     * @param {String} sender 
     * @param {Any} type 
     * @returns {Promise}
     */
    function sendSmsMessage(sendTo, sender = "112", type = "ONDEMAND_EMERGENCY_REPORT") {
        return new Promise((fulfill, reject) => {
            let params = {
                sendTo: sendTo,
                sender: sender,
                type: type,
                extra: null
            }
            axiosPost(API_SMS_SEND, params).then((response) => {
                fulfill(response)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by axiosPost")
                reject(e)
            })
        })
    }

    /**
     * Execute HTTP GET.
     * @param {Any} params
     * @returns {Promise}
     */
    function axiosGet(apiUrl, params) {
        return new Promise((fulfill, reject) => {
            axios.get(
                USE_DYNAMIC_DOMAIN_URL ? apiDomainUrl + apiUrl : apiUrl,
                { params }, { withCredentials: true }).then((response) => {
                    fulfill(getResponse(apiUrl, response))

                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by axios.GET")
                    reject(e)
                })
        })
    }

    /**
     * Execute HTTP POST.
     * @param {Any} params 
     * @returns {Promise}
     */
    function axiosPost(apiUrl, params) {
        return new Promise((fulfill, reject) => {
            axios.post(
                USE_DYNAMIC_DOMAIN_URL ? apiDomainUrl + apiUrl : apiUrl, params, {
                headers: { "Content-Type": HEADER_CONTENT_TYPE }

            }).then((response) => {
                fulfill(getResponse(apiUrl, response))

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by axios.POST")
                reject(e)
            })
        })
    }

    /**
     * Get response data corresponding to each api with debugging log messages.
     * @param {String} apiUrl 
     * @param {Any} response 
     * @returns {Any}
     */
    function getResponse(apiUrl, response) {
        if (apiUrl === API_SMS_SEND) {
            const responseData = response.data

            logDebugWithLine(LOG_TAG, "response: " + JSON.stringify(response))
            logDebugWithLine(LOG_TAG, "response.data: " + JSON.stringify(responseData))
            return responseData

        } else {
            const responseData = response.data.data

            logDebugWithLine(LOG_TAG,
                "<<< RESPONSE \n[LENGTH]: " + responseData.length
                + ", \n[RESPONSE.DATA.DATA]: \n" + responseData
                + ", \n[RESPONSE]: \n" + JSON.stringify(response))

            return responseData
        }
    }

    /**
     * Set domain url derived from web page url.
     * @param {String} domainUrl 
     * @returns {Promise}
     */
    function setDomainUrl(domainUrl) {
        return new Promise((fulfill, reject) => {
            try {
                apiDomainUrl = domainUrl
                logDebug(LOG_TAG, "<<< Domain URL (SET): " + apiDomainUrl)
                fulfill(apiDomainUrl)
            } catch (e) {
                reject(e)
            }
        })
    }

    /**
     * Get domain url.
     * @returns {String}
     */
    function getDomainUrl() {
        logDebug(LOG_TAG, "<<< Domain URL (GET): " + apiDomainUrl)
        return apiDomainUrl
    }

    return {
        getActivities,
        getActivitiesWithExtraData,
        sendSmsMessage,
        setDomainUrl,
        getDomainUrl
    }
}

export default AxiosManager