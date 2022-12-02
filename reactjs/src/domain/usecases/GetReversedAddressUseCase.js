import NaverMapRepository from "../../data/repositories/NaverMapRepository"

function GetReversedAddressUseCase() {

    const { getReversedAddress } = NaverMapRepository()

    /**
     * get address information corresponding to latitude and longitude.
     * @param {Number} latitude 
     * @param {Number} longitude 
     * @returns {Promise}
     */
    function executeGetReversedAddressUseCase(latitude, longitude) {

        return new Promise((fulfill, reject) => {
            getReversedAddress(latitude, longitude, reversedAddressList => {
                if (reversedAddressList == null || reversedAddressList.length <= 0) {
                    reject(e)

                } else {
                    fulfill(reversedAddressList)
                }
            })
        })
    }

    return {
        executeGetReversedAddressUseCase
    }
}
export default GetReversedAddressUseCase