import mapLoadingErrorImage from "../../assets/images/loading_error_unplugged.png"
import { logDebug } from "../../utils/logger/Logger"

const LOG_TAG = "MapLoadingErrorComponent"

/**
 * map loading error component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function MapLoadingErrorComponent(props) {

    const { isReportExpired, hasError, currentAddress, errorMessage } = props

    let errorMessageTitle = ""
    let errorMessageSubTitle = ""

    logDebug(LOG_TAG, "<<< errorMessage: " + errorMessage)
    if (errorMessage.includes("|")) {
        let errorMessageList = errorMessage.split("|")
        errorMessageTitle = errorMessageList[0]
        errorMessageSubTitle = errorMessageList[1]

    } else {
        errorMessageTitle = errorMessage
    }

    return (
        <div>
            <img
                style={{ width: 450, height: 450 }}
                src={mapLoadingErrorImage}
                alt="mapLoadingErrorUnplugged" />

            <br /><br /><br />
            <text>
                <b>[Location]</b>
            </text>
            {!isReportExpired && !hasError ?
                <text>
                    <h2>{currentAddress}</h2>
                </text>
                :
                <text>
                    <h2>{errorMessageTitle}</h2>
                    <b>{errorMessageSubTitle}</b>
                </text>
            }

            <br /><br /><br /><br />

            {!isReportExpired ?
                <text>
                    <b>Failed to measure location</b>
                </text>
                :
                <text></text>
            }


        </div>
    )
}