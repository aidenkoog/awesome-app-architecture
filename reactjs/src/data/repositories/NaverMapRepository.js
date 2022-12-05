import { logDebug, outputErrorLog } from "../../utils/logger/Logger"

const DEFAULT_LATITUDE_AND_LONGITUDE = 0

const LOG_TAG = "NaverMapRepository"

export default function NaverMapRepository() {

    /**
     * get reversed address corresponding to latitude and longitude.
     * @param {Number} latitude 
     * @param {Number} longitude 
     * @param {Number} onResult 
     * @returns {String}
     */
    function getReversedAddress(latitude, longitude, onResult) {

        if (latitude === DEFAULT_LATITUDE_AND_LONGITUDE || longitude === DEFAULT_LATITUDE_AND_LONGITUDE) {
            outputErrorLog(LOG_TAG, "latitude or longitude is zero")
            onResult(null)
            return
        }

        window.naver.maps.Service.reverseGeocode({
            location: new window.naver.maps.LatLng(latitude, longitude),

        }, function (status, response) {
            if (status !== window.naver.maps.Service.Status.OK) {
                onResult(null)
                return alert('Failed to load naver geocode !!!')
            }
            let result = response.result
            let addressItems = result.items

            currentAddressInfoList = []
            for (const item of addressItems) {
                currentAddressInfoList.push(item.address)
            }

            logDebug(LOG_TAG, "<<< reversed address info list: " + currentAddressInfoList)

            const addressInfoListLength = currentAddressInfoList.length
            logDebug(LOG_TAG, "<<< addressInfoListLength: " + addressInfoListLength)

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