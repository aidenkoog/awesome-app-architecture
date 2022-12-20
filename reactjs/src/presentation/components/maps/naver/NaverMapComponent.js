import React from 'react'
import { NaverMap, Marker } from 'react-naver-maps'
import customMarker from "../../../../assets/images/custom_naver_map_marker.png"
import "./NaverMap.css"

const DEFAULT_ZOOM = 17

const NAVER_MAP_WIDTH = '100%'
const NAVER_MAP_HEIGHT = '60vh'

const MARKER_KEY = 1
const MARKER_ANIMATION = 2

const MARKER_SIZE_WIDTH = 50
const MARKER_SIZE_HEIGHT = 55

const MARKER_SCALED_SIZE_WIDTH = 50
const MARKER_SCALED_SIZE_HEIGHT = 55

const MARKER_ANCHOR_X = 12
const MARKER_ANCHOR_Y = 32

/**
 * NAVER map compoent.
 * @param {Any} props 
 * @returns {JSX.Element} 
 */
export default function NaverMapComponent(props) {

    const { latitude, longitude } = props
    const navermaps = window.naver.maps

    return (
        <div className='map_sub_container'>
            <div className='map_inner_container'>
                <NaverMap
                    mapDivId={'maps-getting-started-uncontrolled'}
                    className={"map-style"}
                    style={{
                        width: NAVER_MAP_WIDTH,
                        height: NAVER_MAP_HEIGHT,
                    }}
                    center={{ lat: latitude, lng: longitude }}
                    defaultCenter={{ lat: latitude, lng: longitude }}
                    defaultZoom={DEFAULT_ZOOM}
                    zoomControl={true}
                >
                    <Marker
                        key={MARKER_KEY}
                        position={new navermaps.LatLng(latitude, longitude)}
                        animation={MARKER_ANIMATION}
                        icon={{
                            url: customMarker,
                            size: { width: MARKER_SIZE_WIDTH, height: MARKER_SIZE_HEIGHT },
                            scaledSize: { width: MARKER_SCALED_SIZE_WIDTH, height: MARKER_SCALED_SIZE_HEIGHT },
                            anchor: { x: MARKER_ANCHOR_X, y: MARKER_ANCHOR_Y }
                        }}
                        onClick={{}}
                    />
                </NaverMap>
            </div>
        </div>
    )
}