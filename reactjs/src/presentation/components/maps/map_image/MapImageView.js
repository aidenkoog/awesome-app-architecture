import customMarker from "../../../../assets/images/custom_naver_map_marker.png"
import circleImage from "../../../../assets/images/circle.png"
import { logDebug, logDebugWithLine } from "../../../../utils/logger/Logger"
import { DEFAULT_ZOOM } from "../../../../configs/Configs"
import {
    circleAndMarkerContainer, circleAreaImage, mapImage, mapRootContainer,
    markerContainer, markerImage, zoomButton, zoomInContainer, zoomOutContainer
} from "./MapImageViewStyles"

const LOG_TAG = "MapImageView"
const NAVER_OPEN_API_DOMAIN = "https://naveropenapi.apigw.ntruss.com"

/**
 * map image view component.
 * @param {Any} props 
 * @returns {JSX.Element} 
 */
export default function MapImageView(props) {

    /**
     * props delivered from MainView component.
     */
    const { latitude, longitude, onClickZoomIn, onClickZoomOut, additionalZoomValue, domainUrl } = props

    const IMAGE_DOMAIN = domainUrl.includes("localhost:") ? NAVER_OPEN_API_DOMAIN : domainUrl
    let zoomLevel = DEFAULT_ZOOM + additionalZoomValue

    logDebug(LOG_TAG, ">>> domainUrl: " + domainUrl)
    logDebug(LOG_TAG, ">>> "
        + "latitude: " + latitude
        + ", longitude: " + longitude
        + ", additionalZoomValue: " + additionalZoomValue)
    logDebug(LOG_TAG, ">>> zoomLevel: " + zoomLevel)

    /**
     * 5 -> 10 -> 20 -> 30 -> 50 -> 100 -> 300 -> 500 -> 1Km -> 3Km -> 5Km -> 10Km -> 20Km -> 30Km -> 50Km -> 100Km
     * Testing..
     * @returns {Number}
     */
    function getRadius() {
        if (zoomLevel == 13) {
            return 3

        } else if (zoomLevel == 14) {
            return 5

        } else if (zoomLevel == 15) {
            return 9

        } else if (zoomLevel == DEFAULT_ZOOM) {
            return 17

        } else if (zoomLevel === 17) {
            return 33

        } else if (zoomLevel === 18) {
            return 65

        } else if (zoomLevel === 19) {
            return 130

        } else if (zoomLevel === 20) {
            return 260
        }
    }

    let radius = getRadius()
    logDebugWithLine(LOG_TAG, ">>> radius: " + radius)

    const imageLink = ""
        + IMAGE_DOMAIN + "/map-static/v2/raster-cors?"
        + "w=1245&h=750&center="
        + longitude
        + ","
        + latitude
        + "&level=" + zoomLevel
        + "&X-NCP-APIGW-API-KEY-ID=9n7590898"

    logDebug(LOG_TAG, ">>> imageLink: " + imageLink)

    return (
        <div style={mapRootContainer}
            onWheel={event => {
                if (event.nativeEvent.wheelDelta > 0) {
                    onClickZoomIn()
                } else {
                    onClickZoomOut()
                }
            }}>
            {/* map image. */}
            <img
                style={mapImage}
                src={imageLink} />

            <div style={circleAndMarkerContainer}>
                {/* circle shape. */}
                <circle style={{
                    width: radius * 2, height: radius * 2,
                    position: "fixed", textAlign: "center",
                    alignItems: "center", alignContent: "center",
                    backgroundColor: "#1d70ec", borderRadius: "50%", opacity: 0.3,
                }} />

                {/* marker. */}
                <div style={markerContainer} >
                    <img
                        style={markerImage}
                        src={customMarker}
                        onClick={onClickZoomIn} />
                </div>

            </div>

            {/* zoom in. */}
            <div style={zoomInContainer}>
                <button style={zoomButton} onClick={onClickZoomIn}>+</button>
            </div>

            {/* zoom out. */}
            <div style={zoomOutContainer}>
                <button style={zoomButton} onClick={onClickZoomOut}>-</button>
            </div>
        </div >
    )
}