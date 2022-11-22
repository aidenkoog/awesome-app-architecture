import FetchApi from "../sources/FetchUrlManager"

const RemoteRepository = () => {

    const { fetchApi } = FetchUrlManager()

    fetchRemoteApi = () => {
        fetchApi()
    }

    return (
        fetchRemoteApi
    )
}

export default RemoteRepository