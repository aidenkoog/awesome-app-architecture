import { logDebugWithLine } from "../../utils/logger/Logger"
import RemoteRepository from "../../data/repositories/RemoteRepository"

const LOG_TAG = "GetLocationInfoUseCase"

function GetLocationInfoUseCase() {

    const { fetchRemoteApi } = RemoteRepository()

    function executeGetLocationInfoUseCase() {

        return new Promise((fulfill, reject) => {
            fetchRemoteApi().then((response) => {
                logDebugWithLine(LOG_TAG, "<<< response length: " + response.length + ", response: " + response)
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })

        })
    }

    return {
        executeGetLocationInfoUseCase
    }
}

export default GetLocationInfoUseCase