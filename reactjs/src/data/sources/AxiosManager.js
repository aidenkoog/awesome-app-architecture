import axios from 'axios'
import { logDebug, outputErrorLog } from '../../utils/logger/Logger'

const LOG_TAG = "AxiosManager"
const URL = "https://my-json-server.typicode.com/typicode/demo/posts"

const AxiosManager = () => {

    axiosGet = () => {
        return new Promise((fulfill, reject) => {
            axios.get(URL, {params: {id: 1}}).then(() => {
                logDebug(LOG_TAG, "<<< succeeded to get url")
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by axios.get()")
                reject(e)

            }).then(() => {
                logDebug(LOG_TAG, "<<< axiosGet completed")
            })
        })
    }

    axiosGetAsync = () => {
        let responseData = getData()
        responseData.then((data) => {
            logDebug(LOG_TAG, "<<< response data: " + data)
        })
    }

    getData = async () => {
        let response = await axios.get(URL)
        return response.data;
    }
}

export default AxiosManager