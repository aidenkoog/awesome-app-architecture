import NaverMapRepository from "../../../data/repositories/naver_map/NaverMapRepository"

function GetReversedAddressUseCase() {

    const { getReversedAddress } = NaverMapRepository()

    /**
     * get address information corresponding to latitude and longitude.
     * @param {double} latitude 
     * @param {double} longitude 
     * @returns {Promise}
     */
    function executeGetReversedAddressUseCase(latitude, longitude) {

        return new Promise((fulfill, reject) => {
            getReversedAddress(latitude, longitude, reversedAddress => {
                if (reversedAddress == null) {
                    reject(null)

                } else {
                    fulfill(reversedAddress)
                }
            })
        })
    }

    return {
        executeGetReversedAddressUseCase
    }
}
export default GetReversedAddressUseCase