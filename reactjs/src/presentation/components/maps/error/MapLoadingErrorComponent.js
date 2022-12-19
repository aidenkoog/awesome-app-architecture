import mapLoadingErrorImage from "../../../../assets/images/wifi_alert.png"
import { MAIN_MAP_LOADING_FAILED_1, MAIN_MAP_LOADING_FAILED_2 } from "../../../../assets/strings/Strings"
import { logDebugWithLine } from "../../../../utils/logger/Logger"

const LOG_TAG = "MapLoadingErrorComponent"

/**
 * Map loading error component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function MapLoadingErrorComponent(props) {

    const { isReportExpired, hasError, currentAddress, errorMessage } = props

    let errorMessageTitle = ""
    let errorMessageSubTitle = ""

    if (errorMessage === undefined || errorMessage == null) {
        errorMessageTitle = ""
        errorMessageSubTitle = ""

    } else {
        if (errorMessage.includes("|")) {
            let errorMessageList = errorMessage.split("|")
            errorMessageTitle = errorMessageList[0]
            errorMessageSubTitle = errorMessageList[1]

        } else {
            errorMessageTitle = errorMessage
        }
    }

    logDebugWithLine(LOG_TAG, "errorMessage: " + errorMessage + ",\nerrorMessageSubTitle: " + errorMessageSubTitle)

    return (
        <div>
            <img
                style={{ width: 100, height: 100 }}
                src={mapLoadingErrorImage}
                alt="mapLoadingErrorUnplugged" />

            <br /><br /><br />
            {!isReportExpired && !hasError ?
                <h2>{currentAddress}</h2>
                :
                <div>
                    <h2>{errorMessageTitle}</h2>
                    <b>{errorMessageSubTitle}</b>
                </div>
            }

            {!isReportExpired ?
                <div>
                    <b style={{ fontSize: 20 }}>{MAIN_MAP_LOADING_FAILED_1}</b>
                    <br />
                    <b style={{ fontSize: 20 }}>{MAIN_MAP_LOADING_FAILED_2}</b>
                </div>
                :
                <b></b>
            }
        </div>
    )
}