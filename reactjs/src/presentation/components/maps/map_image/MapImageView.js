import customMarker from "../../../../assets/images/custom_naver_map_marker.png"
import customMarkerInHover from "../../../../assets/images/blue_marker.png"
import { logDebugWithLine } from "../../../../utils/logger/Logger"
import { DEBUGGING_MODE, getCircleRadius, getMapImageLink, NAVER_MAP_DOMAIN_URL } from "../../../../configs/Configs"
import {
    debuggingContainer, debuggingText, mapImage, mapRootContainer,
    markerImage, shortAddressContainer, zoomButton, zoomInContainer, zoomOutContainer
} from "./MapImageViewStyles"
import { useState, useEffect } from "react"

const LOG_TAG = "MapImageView"

/**
 * map image view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function MapImageView(props) {

    const {
        latitude, longitude, onClickZoomIn, onClickZoomOut, currentZoomLevel, domainUrl, currentAddress, shortAddress
    } = props

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [isHover, setIsHover] = useState(false)

    const mapImageDomainUrl = domainUrl.includes("localhost:") ? NAVER_MAP_DOMAIN_URL : domainUrl

    let circleRadius = getCircleRadius(currentZoomLevel, innerWidth)

    logDebugWithLine(LOG_TAG, "<<< \n"
        + "LATITUDE: " + latitude
        + "\n, LONGITUDE: " + longitude
        + "\n, CURRENT ZoomLevel: " + currentZoomLevel
        + "\n, MAP IMAGE DOMAIN URL: " + mapImageDomainUrl
        + "\n, RADIUS: " + circleRadius
        + "\n, SCRREN SIZE: " + innerWidth
        + "\n, SHORT Address: " + shortAddress
        + "\n, CURRENT Address: " + currentAddress)

    /**
     * it's called whenever ui rendering and paiting is executed.
     */
    useEffect(() => {
        const resizeListener = () => {
            setInnerWidth(window.innerWidth)
        }
        window.addEventListener("resize", resizeListener)
    })

    return (
        <>
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
                    src={getMapImageLink(mapImageDomainUrl, latitude, longitude, currentZoomLevel)}
                    alt="MapSnapShot" />

                {currentZoomLevel !== 21 ?
                    < div style={{
                        width: circleRadius * 2, height: circleRadius * 2,
                        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                        position: "absolute", backgroundColor: "#1d70ec", borderRadius: "50%", opacity: 0.3,
                    }} />
                    :
                    < div style={{
                        width: circleRadius * 1.75, height: circleRadius * 1.055,
                        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                        position: "absolute", backgroundColor: "#1d70ec", borderRadius: "2%", opacity: 0.3,
                    }} />
                }

                {/* marker image */}
                <img
                    style={markerImage}
                    src={isHover ? customMarkerInHover : customMarker}
                    onMouseOver={() => setIsHover(true)}
                    onMouseOut={() => setIsHover(false)}
                    onClick={onClickZoomIn}
                    alt="mapMarkerImage" />

                {/* short address. */}
                {isHover ?
                    <div style={shortAddressContainer}>
                        <h3>{shortAddress}</h3>
                    </div>
                    :
                    <div />
                }

                {/* zoom in. */}
                <div style={zoomInContainer}>
                    <button style={zoomButton} onClick={onClickZoomIn}>+</button>
                </div>

                {/* zoom out. */}
                <div style={zoomOutContainer}>
                    <button style={zoomButton} onClick={onClickZoomOut}>-</button>
                </div>
            </div >
            {/* screen size. */}
            {DEBUGGING_MODE ?
                <div style={debuggingContainer}>
                    <h2 style={debuggingText}>>>> Current Scrren Width: <b>{innerWidth}</b></h2>
                    <h2 style={debuggingText}>>>> Current Latitude: <b>{latitude}</b>, Current Longitude: <b>{longitude}</b></h2>
                    <h2 style={debuggingText}>>>> Current Address: <b>{currentAddress}</b></h2>
                    <h2 style={debuggingText}>>>> Current Zoom Level: <b>{currentZoomLevel}</b></h2>
                    {currentZoomLevel === 21 ?
                        <h2 style={debuggingText}>
                            >>> Current Rectangle Width: <b>{circleRadius * 1.75}</b>, Height: <b>{circleRadius * 1.055}</b>
                        </h2>
                        :
                        <div></div>
                    }
                    <h2 style={debuggingText}>>>> Current Circle Radius: <b>{circleRadius}</b></h2>
                    <h2 style={debuggingText}>>>> Current Map Image Domain URl: <b>{mapImageDomainUrl}</b></h2>
                </div>
                :
                <div />
            }
        </>
    )
}