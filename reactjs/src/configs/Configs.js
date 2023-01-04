import { logDebug } from '../utils/logger/Logger'

const LOG_TAG = "Configs"

/**
 * Support function.
 */
export const DEBUGGING_MODE = false

/**
 * Polling apis.
 * MAX: 120000
 */
export const POLLING_API_MAX_MILL_TIME = 120000
export const POLLING_API_INTERVAL_MILL_TIME = 3000
export const HOURS_24_MILL = 86400000

/**
 * File saver module for downloading the file on the webpage.
 */
export const FileSaver = require('file-saver')
export const TEXT_TYPE = "text/plain;charset=utf-8"
export const FILE_NAME_TO_SAVE = "history.txt"
export const FILE_NAME_FOR_LOG = "logs.txt"

/**
 * HTTP configuration.
 */
export const USE_DYNAMIC_DOMAIN_URL = false

/**
 * Cryptojs module enable.
 */
export const CRYPTO_ENABLE = true

/**
 * Map.
 */
export const DEFAULT_ZOOM_LEVEL = 20
export const MAX_ZOOM_LEVEL = 21
export const MIN_ZOOM_LEVEL = 11
export const NAVER_MAP_DOMAIN_URL = "https://naveropenapi.apigw.ntruss.com"

/**
 * Current zoom level.
 */
export let currentZoomLevel = DEFAULT_ZOOM_LEVEL
export function updateCurrentZoomLevel(zoomLevel) {
    currentZoomLevel = zoomLevel
}

export const getMapImageLink = (mapImageDomainUrl, latitude, longitude, currentZoomLevel) => {
    return ""
        + mapImageDomainUrl + "/map-static/v2/raster-cors?"
        + "w=1245&h=750&center="
        + longitude
        + ","
        + latitude
        + "&level=" + currentZoomLevel
        + "&X-NCP-APIGW-API-KEY-ID=..."
}

/**
 * Refs. Real distance information as naver map zoom level.
 * > 5 -> 10 -> 20 -> 30 -> 50 -> 100 -> 300 -> 500 -> 1Km -> 3Km -> 5Km -> 10Km -> 20Km -> 30Km -> 50Km -> 100Km
 * Refs. zoom: 16, 250: 300m
 * Refs. zoom: 20, 260: 20.8m 
 * Refs. A radius of 260 for the benchmark allows you to draw the largest circle the map can show.
 * @param {Number} currentZoomLevel
 * @param {Number} innerWidth
 * @param {Number} errorRadius
 * @returns {Number}
 */
export function getCircleRadius(currentZoomLevel, innerWidth, errorRadius) {
    let radiusForBenchmark = 0
    switch (currentZoomLevel) {
        case 11:
            radiusForBenchmark = getRadiusForBenchmark(0.5078125, errorRadius)
            break
        case 12:
            radiusForBenchmark = getRadiusForBenchmark(1.015625, errorRadius)
            break
        case 13:
            radiusForBenchmark = getRadiusForBenchmark(2.03125, errorRadius)
            break
        case 14:
            radiusForBenchmark = getRadiusForBenchmark(4.0625, errorRadius)
            break
        case 15:
            radiusForBenchmark = getRadiusForBenchmark(8.125, errorRadius)
            break
        case 16:
            radiusForBenchmark = getRadiusForBenchmark(16.25, errorRadius)
            break
        case 17:
            radiusForBenchmark = getRadiusForBenchmark(32.5, errorRadius)
            break
        case 18:
            radiusForBenchmark = getRadiusForBenchmark(65, errorRadius)
            break
        case 19:
            radiusForBenchmark = getRadiusForBenchmark(130, errorRadius)
            break
        case 20:
            radiusForBenchmark = getRadiusForBenchmark(260, errorRadius)
            break
        case 21:
            radiusForBenchmark = getRadiusForBenchmark(520, errorRadius)
            break
        default:
            radiusForBenchmark = getRadiusForBenchmark(260, errorRadius)
    }
    return processRadiusFormula(radiusForBenchmark, innerWidth)
}

/**
 * Get radius for benchmark.
 * @param {Number} radiusForBenchmark 
 * @param {Number} errorRadius 
 * @returns {Number}
 */
function getRadiusForBenchmark(radiusForBenchmark, errorRadius) {
    if (errorRadius == null || errorRadius === undefined || errorRadius === "" || isNaN(errorRadius)) {
        return radiusForBenchmark
    }
    return radiusForBenchmark * errorRadius / 20.8
}

/**
 * Process formula about calculating dynamic radius.
 * Refs.
 * For the initial reference point setting and dynamic size change, the screen size was set to 1760 as a standard.
 * @param {Number} radiusForBenchmark 
 * @param {Number} innerWidth
 * @returns {Number}
 */
function processRadiusFormula(radiusForBenchmark, innerWidth) {
    const result = (innerWidth * radiusForBenchmark) / 1760
    logDebug(LOG_TAG, ">>> Formula Result (Circle Radius): " + result)
    return result
}
