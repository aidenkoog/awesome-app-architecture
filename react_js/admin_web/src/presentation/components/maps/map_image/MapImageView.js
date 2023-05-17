import customMarker from "../../../../assets/images/custom_naver_map_marker.png"
import customMarkerInHover from "../../../../assets/images/blue_marker.png"
import { logDebug, logDebugWithLine, outputErrorLog } from "../../../../utils/logger/Logger"
import {
    DEBUGGING_MODE, getCircleRadius, getMapImageLink, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL,
    NAVER_MAP_DOMAIN_URL, updateCurrentZoomLevel
} from "../../../../configs/Configs"
import {
    debuggingContainer, debuggingText, mapImage, mapRootContainer,
    markerImage, shortAddressContainer, zoomButton, zoomInContainer, zoomOutContainer
} from "./MapImageViewStyles"
import { useState, useEffect } from "react"

const LOG_TAG = "MapImageView"

/**
 * Map image view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function MapImageView(props) {

    const {
        latitude, longitude, onClickZoomIn, onClickZoomOut,
        currentZoomLevel, domainUrl, currentAddress, shortAddress,
        recentHistory, isZoomTriggered, isZoomUpdated
    } = props

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [isHover, setIsHover] = useState(false)

    const mapImageDomainUrl = domainUrl.includes("localhost:") ? NAVER_MAP_DOMAIN_URL : domainUrl

    function getAccuracy() {
        const accuracy = recentHistory.accuracy
        try {
            return accuracy != null && accuracy !== "" ? accuracy : "--"
        } catch (_e) {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs while getting ACCURACY, return --")
            return "--"
        }
    }
    let circleRadius = getCircleRadius(currentZoomLevel, innerWidth, getAccuracy())
    let zoomLevel = currentZoomLevel

    if (!isZoomTriggered && !isZoomUpdated) {

        let divideCount = 0
        let dividedRadius = circleRadius
        let ratio = innerWidth / dividedRadius

        if (ratio > 9.5) {
            logDebug(LOG_TAG, ">>> ratio > 9.5")
            let multiplyCount = 0
            let multipliedRadius = circleRadius

            if (innerWidth / multipliedRadius >= 14.2) {
                for (let i = 0; innerWidth / multipliedRadius > 9.5; i++) {
                    multipliedRadius = multipliedRadius * 2
                    multiplyCount++
                    if (innerWidth / multipliedRadius <= 9.5) {
                        break
                    }
                }
                zoomLevel = currentZoomLevel + multiplyCount
                if (zoomLevel > MAX_ZOOM_LEVEL) {
                    logDebug(LOG_TAG, ">>> zoomLevel > MAX Zoom Level")
                    const gap = zoomLevel - MAX_ZOOM_LEVEL
                    zoomLevel = zoomLevel - gap
                    circleRadius = multipliedRadius / Math.pow(2, gap)
                    multiplyCount = 0

                } else {
                    if (multiplyCount !== 0) {
                        circleRadius = multipliedRadius
                    }
                }
                updateCurrentZoomLevel(zoomLevel)
            }
        }

        if (innerWidth / circleRadius < 7) {
            circleRadius /= 2
            zoomLevel -= 1
            updateCurrentZoomLevel(zoomLevel)
        }

        if (ratio < 7) {
            logDebug(LOG_TAG, ">>> ratio < 7")
            if (innerWidth / dividedRadius <= 6.4) {
                for (let i = 0; innerWidth / dividedRadius < 7; i++) {
                    dividedRadius = dividedRadius / 2
                    if (innerWidth / dividedRadius >= 7) {
                        divideCount = i + 1
                        break
                    }
                }
                zoomLevel = currentZoomLevel - divideCount
                if (zoomLevel < MIN_ZOOM_LEVEL) {
                    logDebug(LOG_TAG, ">>> zoomLevel < MIN Zoom Level")
                    zoomLevel = currentZoomLevel
                    dividedRadius = circleRadius
                    divideCount = 0

                } else {
                    if (divideCount !== 0) {
                        circleRadius = dividedRadius
                    }
                }
                updateCurrentZoomLevel(zoomLevel)
            }
        }
    }

    logDebugWithLine(LOG_TAG, "<<< \n"
        + "LATITUDE: " + latitude
        + "\n, LONGITUDE: " + longitude
        + "\n, CURRENT ZoomLevel: " + currentZoomLevel
        + "\n, Artifacted ZoomLevel: " + zoomLevel
        + "\n, MAP IMAGE DOMAIN URL: " + mapImageDomainUrl
        + "\n, RADIUS: " + circleRadius
        + "\n, SCRREN SIZE: " + innerWidth
        + "\n, SHORT Address: " + shortAddress
        + "\n, CURRENT Address: " + currentAddress)

    /**
     * It's called whenever ui rendering and paiting is executed.
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
                {/* Map image. */}
                <img
                    style={mapImage}
                    src={getMapImageLink(mapImageDomainUrl, latitude, longitude, zoomLevel)}
                    alt="MapSnapShot" />

                {/* Circle image. */}
                < div style={{
                    width: circleRadius * 2, height: circleRadius * 2,
                    top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    position: "absolute", backgroundColor: "#1d70ec", borderRadius: "50%", opacity: 0.2,
                }} />

                {/* Marker image */}
                <img
                    style={markerImage}
                    src={isHover ? customMarkerInHover : customMarker}
                    onMouseOver={() => setIsHover(true)}
                    onMouseOut={() => setIsHover(false)}
                    onClick={onClickZoomIn}
                    alt="mapMarkerImage" />

                {/* Short address. */}
                {isHover ?
                    <div style={shortAddressContainer}>
                        <h3>{shortAddress}</h3>
                    </div>
                    :
                    <div />
                }

                {/* Zoom in. */}
                <div style={zoomInContainer}>
                    <button style={zoomButton} onClick={onClickZoomIn}>+</button>
                </div>

                {/* Zoom out. */}
                <div style={zoomOutContainer}>
                    <button style={zoomButton} onClick={onClickZoomOut}>-</button>
                </div>
            </div >
            {/* Screen size. */}
            {DEBUGGING_MODE ?
                <div style={debuggingContainer}>
                    <h2 style={debuggingText}>>>> Current Scrren Width: <b>{innerWidth}</b></h2>
                    <h2 style={debuggingText}>>>> Current Latitude: <b>{latitude}</b>, Current Longitude: <b>{longitude}</b></h2>
                    <h2 style={debuggingText}>>>> Current Address: <b>{currentAddress}</b></h2>
                    <h2 style={debuggingText}>>>> Current Zoom Level: <b>{currentZoomLevel}</b></h2>
                    <h2 style={debuggingText}>>>> Artifacted Zoom Level: <b>{zoomLevel}</b></h2>
                    <h2 style={debuggingText}>>>> Current Circle Radius: <b>{circleRadius}</b></h2>
                    <h2 style={debuggingText}>>>> Current Map Image Domain URl: <b>{mapImageDomainUrl}</b></h2>
                </div>
                :
                <div />
            }
        </>
    )
}