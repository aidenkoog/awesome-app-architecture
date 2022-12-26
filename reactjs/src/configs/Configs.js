import { logDebug } from '../utils/logger/Logger'

const LOG_TAG = "Configs"

/**
 * support function.
 */
export const DEBUGGING_MODE = false

/**
 * polling apis.
 * MAX: 120000
 */
export const POLLING_API_MAX_MILL_TIME = 120000
export const POLLING_API_INTERVAL_MILL_TIME = 3000
export const HOURS_24_MILL = 86400000

/**
 * file saver module for downloading the file on the webpage.
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
 * cryptojs module enable.
 */
export const CRYPTO_ENABLE = true

/**
 * Naver Map.
 */
export const NAVER_CLIENT_ID = "..."

/**
 * Map.
 */
export const DEFAULT_ZOOM_LEVEL = 20
export const MAX_ZOOM_LEVEL = 21
export const MIN_ZOOM_LEVEL = 11
export const NAVER_MAP_DOMAIN_URL = "https://naveropenapi.apigw.ntruss.com"

export const getMapImageLink = (mapImageDomainUrl, latitude, longitude, currentZoomLevel) => {
    return ""
        + mapImageDomainUrl + "/map-static/v2/raster-cors?"
        + "w=1245&h=750&center="
        + longitude
        + ","
        + latitude
        + "&level=" + currentZoomLevel
        + "&X-NCP-APIGW-API-KEY-ID=9n75mtfld2"
}

/**
 * Refs. Real distance information as naver map zoom level.
 * > 5 -> 10 -> 20 -> 30 -> 50 -> 100 -> 300 -> 500 -> 1Km -> 3Km -> 5Km -> 10Km -> 20Km -> 30Km -> 50Km -> 100Km
 * Refs. zoom: 16, 250: 300m
 * Refs. zoom: 20, 260: 20.8m 
 * Refs. A radius of 260 for the benchmark allows you to draw the largest circle the map can show.
 * @param {Number}
 * @returns {Number}
 */
export function getCircleRadius(currentZoomLevel, innerWidth) {
    let radiusForBenchmark = 0
    switch (currentZoomLevel) {
        case 11:
            radiusForBenchmark = 5
            break
        case 12:
            radiusForBenchmark = 6
            break
        case 13:
            radiusForBenchmark = 7
            break
        case 14:
            radiusForBenchmark = 8
            break
        case 15:
            radiusForBenchmark = 9
            break
        case 16:
            radiusForBenchmark = 17
            break
        case 17:
            radiusForBenchmark = 33
            break
        case 18:
            radiusForBenchmark = 65
            break
        case 19:
            radiusForBenchmark = 130
            break
        case 20:
            radiusForBenchmark = 260
            break
        case 21:
            radiusForBenchmark = 520
            break
        default:
            radiusForBenchmark = 260
    }
    logDebug(LOG_TAG, ">>> CURRENT ZoomLevel: " + currentZoomLevel + ", START to process RADIUS formula")
    return processRadiusFormula(radiusForBenchmark, innerWidth)
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
    logDebug(LOG_TAG, ">>> RADIUS for Benchmark: " + radiusForBenchmark)
    logDebug(LOG_TAG, ">>> SCRREN Size: " + innerWidth)
    logDebug(LOG_TAG, ">>> Formula Result: " + result)
    return result
}
