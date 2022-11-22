import RemoteRepository from "../../data/repositories/RemoteRepository"

const GetLocationInfoUseCase = () => {

    const { fetchRemoteApi } = RemoteRepository()

    executeGetLocationInfoUseCase = () => {
        fetchRemoteApi()
    }

    return (
        executeGetLocationInfoUseCase
    )

}

export default GetLocationInfoUseCase