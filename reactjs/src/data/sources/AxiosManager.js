import axios from 'axios'
import { logDebugWithLine, outputErrorLog } from '../../utils/logger/Logger'
import { API_GET_ACTIVITIES } from './api/Api'

const LOG_TAG = "AxiosManager"

function AxiosManager() {

    function axiosGet() {
        return new Promise((fulfill, reject) => {
            axios.get(API_GET_ACTIVITIES, {
                params: { watchMobileNumber: "01091400001", size: "100" }

            }).then((response) => {
                const responseData = response.data.data
                logDebugWithLine(LOG_TAG, "<<< response length: " + responseData.length + ", response: " + responseData)
                fulfill(responseData)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by axios.get")
                reject(e)
            })
        })
    }

    function axiosGetAsync() {
        let responseData = getData()
        responseData.then((data) => {
            logDebugWithLine(LOG_TAG, "<<< response data: " + data)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by responseData.then")
        })
    }

    async function getData() {
        let response = await axios.get(URL)
        return response.data;
    }

    return {
        axiosGet,
        axiosGetAsync
    }
}

export default AxiosManager