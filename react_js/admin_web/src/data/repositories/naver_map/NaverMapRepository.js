const DEFAULT_LATITUDE_AND_LONGITUDE = 0

export default function NaverMapRepository() {

    /**
     * Get reversed address corresponding to latitude and longitude.
     * @param {Number} latitude 
     * @param {Number} longitude 
     * @param {Number} onResult 
     * @returns {String}
     */
    function getReversedAddress(latitude, longitude, onResult) {

        if (latitude === DEFAULT_LATITUDE_AND_LONGITUDE || longitude === DEFAULT_LATITUDE_AND_LONGITUDE) {
            onResult(null)
            return
        }

        window.naver.maps.Service.reverseGeocode({
            location: new window.naver.maps.LatLng(latitude, longitude),

        }, function (status, response) {
            if (status !== window.naver.maps.Service.Status.OK) {
                onResult(null)
                return alert('FAILED to load naver geocode !!!')
            }
            let result = response.result
            let addressItems = result.items

            let currentAddressInfoList = []

            for (const item of addressItems) {
                currentAddressInfoList.push(item.address)
            }

            const addressInfoListLength = currentAddressInfoList.length
            if (addressInfoListLength > 1) {
                onResult(currentAddressInfoList[1])
            } else if (addressInfoListLength > 0) {
                onResult(currentAddressInfoList[0])
            } else {
                onResult(null)
            }
        })
    }

    return {
        getReversedAddress
    }
}