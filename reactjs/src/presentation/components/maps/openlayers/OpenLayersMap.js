import React, { useState, useEffect } from 'react'
import 'ol/ol.css'
import { Feature, Map as OlMap, View } from 'ol'
import { defaults as defaultControls } from 'ol/control'
import { fromLonLat, get as getProjection } from 'ol/proj'
import { Tile as TileLayer, Vector } from 'ol/layer'
import { Vector as SVector } from 'ol/source'
import XYZ from 'ol/source/XYZ'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import { Point } from 'ol/geom'
import customMarker from "../../../../assets/images/custom_naver_map_marker.png"
import LayerGroup from 'ol/layer/Group'

function OpenLayersMap(props) {

    let callCount = 0
    const { latitude, longitude, domainUrl } = props

    /**
     * Check if latitude and longitude are valid.
     * @returns {Boolean}
     */
    function hasValidLatitudeAndLongitude() {
        if (latitude === 0 || longitude === 0 || latitude === undefined || longitude === undefined) {
            return false
        }
        return true
    }

    useEffect(() => {
        /**
         * Check latitude and longitude.
         */
        if (!hasValidLatitudeAndLongitude()) {
            return
        }

        /**
         * In order to fix issue that duplicated map appeared, use callCount variable for workaround.
         */
        if (callCount > 1) {
            callCount = 0
            return
        }

        /**
         * Marker.
         */
        const markers = new Vector({
            source: new SVector(),
            style: new Style({
                image: new Icon({
                    src: customMarker,
                    scale: 0.03
                })
            })
        })

        /**
         * Map Tile
         */
        const tileLayer = new TileLayer({
            source: new XYZ({
                url: domainUrl.includes("localhost:") ?
                    'https://mt0.google.com/vt/lyrs=m&hl=ko&x={x}&y={y}&z={z}'
                    : domainUrl + '/vt/lyrs=m&hl=ko&x={x}&y={y}&z={z}'
            })
        })

        /**
         * Map Object.
         */
        const map = new OlMap({
            layers: [
                tileLayer,
                markers
            ],
            target: 'map',
            view: new View({
                projection: getProjection('EPSG:3857'),
                center: fromLonLat([longitude, latitude], getProjection('EPSG:3857')),
                zoom: 17,
                extent: [13818713.204891728, 3894450.071084645, 14760246.333559135, 4663048.543466202]
            }),
        })

        /**
         * Set Marker's position.
         */
        markers.getSource().addFeature(new Feature(
            new Point(fromLonLat([longitude, latitude]))
        ))

        return () => null

    }, [latitude, longitude])

    return <div>
        <div id="map"
            style={{ height: '30rem' }} />
    </div>
}

export default OpenLayersMap