import React from 'react'
import { NaverMap, Marker } from 'react-naver-maps'

const MARKER_KEY = 1
const MARKER_ANIMATION = 2
const DEFAULT_ZOOM = 17
const NAVER_MAP_WIDTH = '75%'
const NAVER_MAP_HEIGHT = '50vh'

/**
 * naver map compoent.
 * @param {Any} props 
 * @returns {JSX.Element} 
 */
export default function NaverMapComponent(props) {

    const { latitude, longitude } = props
    const navermaps = window.naver.maps

    return (
        <div className='map_sub_container'>
            <NaverMap
                mapDivId={"react-naver-map"}
                style={{
                    width: NAVER_MAP_WIDTH,
                    height: NAVER_MAP_HEIGHT,
                }}
                center={{ lat: latitude, lng: longitude }}
                defaultZoom={DEFAULT_ZOOM}
            >
                <Marker
                    key={MARKER_KEY}
                    position={new navermaps.LatLng(latitude, longitude)}
                    animation={MARKER_ANIMATION}
                    onClick={{}}
                />
            </NaverMap>
        </div>
    )
}