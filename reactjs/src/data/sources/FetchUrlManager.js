import { API_GET_ACTIVITIES } from "./api/Api"

const FetchApi = () => {

    fetchApi = () => {
        return new Promise((fulfill, reject) => {
            fetch(API_GET_ACTIVITIES)
                .then(response => response.json()).then(response => {
                    fulfill(response)

                }).catch((e) => {
                    reject(e)
                })
        })
    }

    return {
        fetchApi
    }
}

export default FetchApi