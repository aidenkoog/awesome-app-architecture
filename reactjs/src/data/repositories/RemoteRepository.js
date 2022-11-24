import { logDebugWithLine } from "../../utils/logger/Logger"
import AxiosManager from "../sources/AxiosManager"

const LOG_TAG = "RemoteRepository"

function RemoteRepository() {

    const { axiosGet } = AxiosManager()

    function fetchRemoteApi() {
        return new Promise((fulfill, reject) => {
            axiosGet().then((response) => {
                logDebugWithLine(LOG_TAG, "<<< response length: " + response.length + ", response: " + response)
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        fetchRemoteApi
    }
}

export default RemoteRepository