import { getCachedLogMessages, logDebug, logDebugWithLine, outputErrorLog } from "../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"
import { useLayoutEffect, useState } from "react"
import GetActivitiesUseCase from "../../domain/usecases/activities/GetActivitiesUseCase"
import { getCurrentCustomDateTime, getCurrentMillTime, getHistoryTypedDateMessage } from "../../utils/time/TimeUtil"
import GetPhoneNumberFromUrlUseCase from "../../domain/usecases/url/GetPhoneNumberFromUrlUseCase"
import SendSmsUseCase from "../../domain/usecases/sms/SendSmsUseCase"
import { RESPONSE_OK } from "../../data/sources/responses/ResponseCode"
import { ONDEMAND_EMERGENCY_REPORT, EMERGENCY_REPORT } from "../../data/sources/event_types/EventType"
import {
    ERROR_MSG_NO_REPORT, ERROR_MSG_NO_EMERGENCY_REPORT_WITHIN_24_HOURS,
    ERROR_MSG_NO_VALID_LOCATION, ERROR_MSG_PHONE_NUMBER_ERROR, ERROR_MSG_FAILED_SMS,
    ERROR_MSG_WRONG_PHONE_NUMBER, ERROR_MSG_NO_RESPONSE, ERROR_MSG_NO_FOUND_ADDRESS,
    ERROR_MSG_FAILED_CURRENT_LOCATION
} from "../../assets/strings/Strings"
import { hasValidPhoneNumber } from "../../utils/regex/RegexUtil"
import { NOT_SUPPORT_FUNCTION, SEND_SMS_FAILED_ERROR_MESSAGE } from "../../assets/strings/Strings"
import SetDomainUrlUseCase from "../../domain/usecases/url/SetDomainUrlUseCase"
import GetDecryptedPhoneNumberUseCase from "../../domain/usecases/url/GetDecryptedPhoneNumberUseCase"
import {
    POLLING_API_MAX_MILL_TIME, POLLING_API_INTERVAL_MILL_TIME, HOURS_24_MILL, FileSaver, TEXT_TYPE,
    FILE_NAME_TO_SAVE, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL, FILE_NAME_FOR_LOG,
    updateCurrentZoomLevel, currentZoomLevel
} from "../../configs/Configs"
import GetDomainUrlUseCase from "../../domain/usecases/url/GetDomainUrlUseCase"
import HistoryInfo from "../../domain/entities/HistoryInfo"


const LOG_TAG = "HomeContainer"

let historyList = []
let recentHistory = ""
let currentAddress = ""
let shortAddress = ""
let domain = ""
let previousLatitude = 0
let previousLongitude = 0
let refreshValue = 0
let retryGetActivitiesCount = 0
let headerClickCountForExtractingLog = 0
let previousHeaderClickTime = 0
let selectedHistoryIndex = 0
let isSmsSent = false
let isZoomTriggered = false
let isZoomUpdated = false
let isLoadedZoomLevelUpdate = false

/**
 * Purpose to update component.
 */
const PURPOSE_QUERY_LOCATION_BY_BUTTON = "PURPOSE_QUERY_LOCATION_BY_BUTTON"
const PURPOSE_QUERY_LOCATION_SUCCESS = "PURPOSE_QUERY_LOCATION_SUCCESS"

const MAX_RETRY_COUNT = 5

/**
 * Purpose of determining whether the location inquiry update button was pressed.
 * Refs. why use: for controlling history list.
 */
let isRefreshing = false
let isRefreshingWithRealtime = false

/**
 * Variable represents if checking if there's Emergency2 report is being executed.
 * Refs. why use: for controlling history list.
 */
let isCheckingEmergency2Report = false

/**
 * Flag used to determine whether a page has been loaded at least once.
 */
let loaded = false

/**
 * Flag to store query start milliseconds time and retry-count needed when querying the current location.
 */
let queryStartMillTime = 0
let queryRetryCount = 0
let latestCachedEmergency2ReportMillTime = 0

/**
 * Home page.
 * @returns {JSX.Element}
 */
export default function HomeContainer() {

    /**
     * Use state for ui interacting.
     */
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [isReportExpired, setIsReportExpired] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(refreshValue)

    /**
     * Usecases.
     */
    const {
        executeGetActivitiesUseCase,
        executeGetActivitiesWithExtraUseCase
    } = GetActivitiesUseCase()

    const { executeGetDecryptedPhoneNumberUseCase } = GetDecryptedPhoneNumberUseCase()
    const { executeGetPhoneNumberFromUrlUseCase } = GetPhoneNumberFromUrlUseCase()
    const { executeSetDomainUrlUseCase } = SetDomainUrlUseCase()
    const { executeSendSmsUseCase } = SendSmsUseCase()
    const { executeGetDomainUrlUseCase } = GetDomainUrlUseCase()

    /**
     * Called before ui rendering and painting.
     */
    useLayoutEffect(() => {
        if (!loaded) {
            loaded = true
            isZoomTriggered = false
            initializeWebPage()
        }
    }, [initializeWebPage])

    /**
     * Get the latest measured date mill time.
     * @param {Any} response 
     * @returns {Number}
     */
    function getLatestMeasuredMillTime(response) {
        return new Date(response[0].measuredDate).getTime()
    }

    /**
     * Clear error related states.
     */
    function clearErrorState() {
        setIsReportExpired(false)
        setErrorMessage("")
        setHasError(false)
    }

    /**
     * Enable error state with error message.
     * @param {String} errorMessage 
     */
    function enableErrorState(errorMessage) {
        outputErrorLog(LOG_TAG, "enable error state, ERROR Message: " + errorMessage)
        createErrorAddress()
        setHasError(true)
        setErrorMessage(errorMessage === undefined || errorMessage == null ? "" : errorMessage)
        setLoading(false)
    }

    /**
     * Update Emergency 24hours expiration state.
     */
    function update24HoursExpiration() {
        outputErrorLog(LOG_TAG, "Emergency report is EXPIRED (24 hours)")
        createErrorAddress()
        setIsReportExpired(true)
        setLocationInformation(0, 0)
        setErrorMessage(ERROR_MSG_NO_EMERGENCY_REPORT_WITHIN_24_HOURS)
        setLoading(false)
    }

    /**
     * Update ui components.
     * @param {Any} response 
     */
    function updateComponents(response, extraErrorMessage = "", purposeToUpdate = "") {
        if (response == null || response.length < 1) {
            if (purposeToUpdate === PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                return true
            }
            enableErrorState(extraErrorMessage)
            outputErrorLog(LOG_TAG, "response is NOT valid")
            return false

        }
        const currentMillTime = getCurrentMillTime()
        if (currentMillTime - getLatestMeasuredMillTime(response) > HOURS_24_MILL) {
            if (purposeToUpdate === PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                updateComponentWithNormalCase(response, purposeToUpdate, currentMillTime)
                return true
            } else {
                update24HoursExpiration()
                return false
            }

        } else {
            updateComponentWithNormalCase(response, purposeToUpdate, currentMillTime)
            return true
        }
    }

    /**
     * Refresh history list.
     */
    function refreshHistoryList() {
        let updatedHistoryList = []

        for (const history of historyList) {
            const shortAddress = history.shortAddress
            const provider = history.provider
            const timeInfo = getHistoryTypedDateMessage(history.measuredDate)
            const address = history.fullAddress
            const date = history.measuredDateTime
            const rawDate = history.measuredDate
            const eventType = history.eventType
            const accuracy = history.accuracy
            const latitude = history.latitude
            const longitude = history.longitude

            logDebugWithLine(LOG_TAG, "[UPDATED HISTORY]\n"
                + "Short Address: " + shortAddress + "\n"
                + "Provider: " + provider + "\n"
                + "Time Info: " + timeInfo + "\n"
                + "Address: " + address + "\n"
                + "Date: " + date + "\n"
                + "Raw Date: " + rawDate + "\n"
                + "Event Type: " + eventType + "\n"
                + "Accuracy: " + accuracy + "\n"
                + "Latitude: " + latitude + "\n"
                + "Longitude: " + longitude)

            let historyMessage = new HistoryInfo(
                shortAddress,
                provider,
                timeInfo,
                address,
                date,
                rawDate,
                eventType,
                accuracy,
                latitude,
                longitude
            )
            updatedHistoryList.push(historyMessage)
        }
        historyList = []
        for (const history of updatedHistoryList) {
            historyList.push(history)
        }
    }

    /**
     * Update ui component in case of normal.
     * @param {Any} response 
     * @param {String} purposeToUpdate 
     * @param {Number} currentMillTime
     */
    function updateComponentWithNormalCase(response, purposeToUpdate, currentMillTime) {
        logDebug(LOG_TAG, "response LENGTH: " + response.length)

        clearErrorState()
        const recentResponse = response[0]
        const responseLatitude = recentResponse.lat
        const responseLongitude = recentResponse.lng

        if (!hasValidLatAndLng(responseLatitude, responseLongitude)) {
            enableErrorState(ERROR_MSG_NO_VALID_LOCATION)
        } else {

            createCurrentAddress(response)
            if (purposeToUpdate !== PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                for (const responseItem of response) {
                    const measuredDateMillTime = new Date(responseItem.measuredDate).getTime()
                    if (currentMillTime - measuredDateMillTime > HOURS_24_MILL) {
                        continue
                    }
                    createHistoryList(
                        purposeToUpdate,
                        responseItem.shortAddress,
                        responseItem.provider,
                        getHistoryTypedDateMessage(responseItem.measuredDate),
                        responseItem.address == null ? ERROR_MSG_NO_FOUND_ADDRESS : responseItem.address,
                        responseItem.measuredDate,
                        responseItem.eventType,
                        responseItem.accuracy,
                        responseItem.lat,
                        responseItem.lng)
                }
                refreshHistoryList()
                latestCachedEmergency2ReportMillTime = getLatestMeasuredMillTime(response)
            }
            recentHistory = historyList != null && historyList.length > 0 ? historyList[0] : ""
            logDebug(LOG_TAG, ">>> RECENT history: " + recentHistory)

            if (purposeToUpdate !== PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                setLocationInformation(responseLatitude, responseLongitude)
            }
        }
    }

    /**
     * Set location infomation (latitude, longitude)
     * @param {Number} latitude 
     * @param {Number} longitude 
     */
    function setLocationInformation(latitude, longitude) {
        if (previousLatitude === 0 && previousLongitude === 0) {
            previousLatitude = latitude
            previousLongitude = longitude

        } else {
            if (previousLatitude === latitude && previousLongitude === longitude) {
                outputErrorLog(LOG_TAG, "NO need to update location information")
                setRefresh(++refreshValue)
                return
            }
        }
        logDebug(LOG_TAG, ">>> SET location information: LATITUDE: " + latitude + ", LONGITUDE: " + longitude)
        previousLatitude = latitude
        previousLongitude = longitude
        setLatitude(latitude)
        setLongitude(longitude)
    }

    /**
     * Get response's extra error message used when response is not valid.
     * @param {Any} response 
     * @returns {String}
     */
    function getResponseExtraErrorMessage(response) {
        return response == null || response.length < 1 ? ERROR_MSG_NO_RESPONSE : null
    }

    /**
     * Initialize web page.
     */
    function initializeWebPage() {
        executeSetDomainUrlUseCase(window.location).then(() => {
            domain = executeGetDomainUrlUseCase()
            initializeActivitiesInformation()

        }).catch((e) => {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to set domain")
            enableErrorState(e)
        })
    }

    /**
     * Get device phone number.
     * @returns {String}
     */
    function getDevicePhoneNumber() {
        const deviceMobileNumber =
            executeGetDecryptedPhoneNumberUseCase(
                executeGetPhoneNumberFromUrlUseCase(window.location.search))
        return deviceMobileNumber
    }

    /**
     * Initialize activities information.
     */
    function initializeActivitiesInformation() {
        const deviceMobileNumber = getDevicePhoneNumber()

        if (!hasValidPhoneNumber(deviceMobileNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }

        logDebug(LOG_TAG, ">>> REQUEST Emergency and Emergency2 report")
        executeGetActivitiesWithExtraUseCase(deviceMobileNumber,
            EMERGENCY_REPORT + "," + ONDEMAND_EMERGENCY_REPORT, "").then((response) => {
                retryGetActivitiesCount = 0

                isCheckingEmergency2Report = true
                if (!updateComponents(response, getResponseExtraErrorMessage(response))) {
                    isCheckingEmergency2Report = false
                    return
                }

            }).catch((_e) => {
                outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to get activities (Emergency, Emergency2)")
                isCheckingEmergency2Report = false
                enableErrorState(deviceMobileNumber == null ?
                    ERROR_MSG_NO_VALID_LOCATION + "|" + ERROR_MSG_PHONE_NUMBER_ERROR : ERROR_MSG_NO_VALID_LOCATION)

                if (deviceMobileNumber != null) { retryGetActivities() }
            })
    }

    /**
     * Retry to getting activities.
     */
    function retryGetActivities() {
        if (++retryGetActivitiesCount >= MAX_RETRY_COUNT) {
            outputErrorLog(LOG_TAG, "NO succeeded to get activities (Emergency, Emergency2) even retry it")
            enableErrorState(ERROR_MSG_NO_VALID_LOCATION)
            retryGetActivitiesCount = 0
            return
        }
        logDebugWithLine(LOG_TAG, "RETRY to get activities (Emergency, Emergency2)")
        initializeWebPage()
    }

    /**
     * Check if latitude and longitude is valid.
     */
    function hasValidLatAndLng(latitude, longitude) {
        return (latitude === 0 || latitude < 0)
            || (longitude === 0 || longitude < 0) ? false : true
    }

    /**
     * Get string corresponding to event type.
     * @param {String} eventTypeData 
     * @returns {String}
     */
    function getEventTypeString(eventTypeData) {
        if (eventTypeData.includes("Emergency")) {
            return "Emergency Location"
        } else {
            return "Current Location"
        }
    }

    /**
     * Create history list.
     */
    function createHistoryList(
        purposeToUpdate, responseShortAddress, provider, date,
        responseAddress, measuredDate, eventType, accuracy, latitude, longitude
    ) {
        const address = responseAddress === ERROR_MSG_NO_FOUND_ADDRESS ? "--" : responseAddress
        const shortAddress = responseShortAddress === ERROR_MSG_NO_FOUND_ADDRESS ? "--" : responseShortAddress
        const measuredDateTime = measuredDate.replace("T", " ").replace("Z", " ")
        const providerData = provider === undefined || provider == null ? "--" : provider.toUpperCase()
        const eventTypeData = eventType === undefined || eventType == null || eventType === "" ? "--" : eventType
        const accuracyData = accuracy === undefined || accuracy == null || accuracy === "" ? "--" : accuracy

        let historyMessage = new HistoryInfo(
            shortAddress,
            providerData,
            date,
            address,
            measuredDateTime,
            measuredDate,
            getEventTypeString(eventTypeData),
            accuracyData,
            latitude,
            longitude
        )

        logDebug(LOG_TAG, ">>> HISTORY Message to be SET: " + historyMessage)

        if (!isRefreshing && !isCheckingEmergency2Report) {
            historyList = []
            historyList.push(historyMessage)

        } else {
            if (purposeToUpdate === PURPOSE_QUERY_LOCATION_SUCCESS) {
                historyList.unshift(historyMessage)
            } else {
                historyList.push(historyMessage)
            }
        }
        logDebugWithLine(LOG_TAG, ">>> HISTORY Length: " + historyList.length)
    }

    /**
     * Create current address information.
     * @param {Any} response
     */
    function createCurrentAddress(response) {
        if (response == null || response === undefined || response.length <= 0) {
            outputErrorLog(LOG_TAG, "CANNOT create current address because of invalid response")
            currentAddress = ERROR_MSG_NO_FOUND_ADDRESS
            shortAddress = ""
            return
        }
        const latestResponse = response[0]
        const responseAddress = latestResponse.address
        currentAddress = responseAddress == null ? ERROR_MSG_NO_FOUND_ADDRESS : responseAddress

        const responseShortAddress = latestResponse.shortAddress
        shortAddress = responseShortAddress == null ? "" : responseShortAddress
        logDebug(LOG_TAG, ">>> CURRENT Address: " + currentAddress + ", CURRENT SHORT Address: " + shortAddress)
    }

    /**
     * Create address for error.
     */
    function createErrorAddress() {
        currentAddress = ERROR_MSG_NO_FOUND_ADDRESS
    }

    /**
     * Handle event occurred when collect data button is pressed.
     */
    function onPressCollectData() {
        if (isRefreshing) {
            outputErrorLog(LOG_TAG, "NOW, refreshing current location")
            return
        }
        isRefreshing = true
        isZoomTriggered = false
        isZoomUpdated = false
        queryStartMillTime = getCurrentMillTime()

        logDebugWithLine(LOG_TAG, ""
            + "queryStartMillTime: " + queryStartMillTime
            + ", queryRetryCount: " + queryRetryCount)

        sendSms(getDevicePhoneNumber()).then(() => {
            setLoading(true)
            queryCurrentLocation()

        }).catch((_e) => {
            clearRetryQueryCurrentLocationStates()
            enableErrorState(ERROR_MSG_FAILED_SMS)
        })
    }

    /**
     * Handle event occurred when real-time collect data button is pressed.
     */
    function onPressRealtimeCollectData() {
        if (isRefreshing) {
            outputErrorLog(LOG_TAG, "NOW, refreshing current location")
            return
        }
        logDebug(LOG_TAG, "<<< current isRefreshingWithRealtime before pressing button: " + isRefreshingWithRealtime)

        isRefreshingWithRealtime = !isRefreshingWithRealtime
        logDebug(LOG_TAG, "<<< current isRefreshingWithRealtime: " + isRefreshingWithRealtime)

        alert(NOT_SUPPORT_FUNCTION)
    }

    /**
     * Query current location (triggered when the button, query current location is pressed)
     */
    function queryCurrentLocation() {
        const deviceMobileNumber = getDevicePhoneNumber()
        logDebug(LOG_TAG, ">>> START to query current location, PHONE NUMBER: " + deviceMobileNumber)

        if (!hasValidPhoneNumber(deviceMobileNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }

        executeGetActivitiesUseCase(deviceMobileNumber).then((response) => {
            if (!updateComponents(response, getResponseExtraErrorMessage(response), PURPOSE_QUERY_LOCATION_BY_BUTTON)) {
                isRefreshing = false
                return
            }

            const latestAcitivityMeasuredDate = response[0].measuredDate
            logDebug(LOG_TAG, ">>> request Emergency2 report with " + latestAcitivityMeasuredDate)

            executeGetActivitiesWithExtraUseCase(
                deviceMobileNumber,
                ONDEMAND_EMERGENCY_REPORT,
                latestAcitivityMeasuredDate).then((response) => {

                    if (response.length <= 0) {
                        retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)

                    } else {
                        const foundLatestMeasuredTime = getLatestMeasuredMillTime(response)
                        logDebug(LOG_TAG, "<<< "
                            + "LATEST CachedEmergency2ReportMillTime: " + latestCachedEmergency2ReportMillTime
                            + ", foundLatestMeasuredTime: " + foundLatestMeasuredTime
                            + ", queryStartMillTime: " + queryStartMillTime)

                        if (latestCachedEmergency2ReportMillTime < foundLatestMeasuredTime
                            && queryStartMillTime < foundLatestMeasuredTime) {

                            createCurrentAddress(response)
                            selectedHistoryIndex = 0
                            updateComponents(response, "", PURPOSE_QUERY_LOCATION_SUCCESS)

                            latestCachedEmergency2ReportMillTime = foundLatestMeasuredTime
                            logDebug(LOG_TAG, "<<< "
                                + "RE-SET LATEST CachedEmergency2ReportMillTime (" + latestCachedEmergency2ReportMillTime + ")")

                            clearRetryQueryCurrentLocationStates()
                            setLoading(false)
                            setRefresh(++refreshValue)

                        } else {
                            outputErrorLog(LOG_TAG, "NO found the recent Emergency2 report")
                            retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)
                        }
                    }

                }).catch((_e) => {
                    outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to get Emergency2 report")
                    retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)
                })

        }).catch((_e) => {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to get ALL report")
            retryQueryCurrentLocation(ERROR_MSG_FAILED_CURRENT_LOCATION)
        })
    }

    /**
     * Call apis every 3 seconds for 2 minutes until the latest current location information is received.
     * @param {String} errorMessage 
     */
    function retryQueryCurrentLocation(errorMessage) {
        let consumedTime = getCurrentMillTime() - queryStartMillTime
        logDebug(LOG_TAG, ">>> consumedTime (RETRY): " + consumedTime)

        if (consumedTime >= POLLING_API_MAX_MILL_TIME) {
            logDebug(LOG_TAG, ">>> API had been called for 2 minutes, "
                + "but NO data came in (retryCount: " + queryRetryCount + ")")

            clearRetryQueryCurrentLocationStates()
            enableErrorState(errorMessage)

        } else {
            setTimeout(() => {
                queryRetryCount++
                logDebugWithLine(LOG_TAG, "<<< RETRY to call queryCurrentLocation with query" + queryRetryCount)
                queryCurrentLocation()

            }, POLLING_API_INTERVAL_MILL_TIME)
        }
    }

    /**
     * Initialize state variables related to retrying the current location lookup operation.
     */
    function clearRetryQueryCurrentLocationStates() {
        queryRetryCount = 0
        queryStartMillTime = 0
        isRefreshing = false
        isSmsSent = false
    }

    /**
     * Ask device to send sms message.
     * @param {String} deviceMobileNumber 
     * @returns {Promise}
     */
    function sendSms(deviceMobileNumber) {
        return new Promise((fulfill, reject) => {
            if (isSmsSent) {
                outputErrorLog(LOG_TAG, "SMS is already sent, no need to send SMS again")
                fulfill()
            }
            executeSendSmsUseCase(deviceMobileNumber).then((response) => {
                if (RESPONSE_OK.code === response.code) {
                    isSmsSent = true
                    logDebugWithLine(LOG_TAG, "<<< SUCCEEDED to send SMS, responseCode: " + response.code)
                    fulfill()

                } else {
                    outputErrorLog(LOG_TAG, "FAILED to send SMS")
                    reject(SEND_SMS_FAILED_ERROR_MESSAGE)
                }

            }).catch((e) => {
                outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to send SMS")
                reject(e)
            })
        })
    }

    /**
     * Handle event occurred when clicking the save history button.
     */
    function onClickSaveHistory() {
        let historyListToBeSaved = []
        for (const item of historyList) {
            historyListToBeSaved.push(item + "\n")
        }
        if (historyListToBeSaved.length <= 0) {
            return
        } else {
            FileSaver.saveAs(new Blob(historyListToBeSaved, { type: TEXT_TYPE }), FILE_NAME_TO_SAVE)
        }
    }

    /**
     * Handle event occurs when pressing zoom in.
     */
    function onClickZoomIn() {
        if (currentZoomLevel === MAX_ZOOM_LEVEL) {
            outputErrorLog(LOG_TAG, "CANNOT zoom-in anymore")
            return
        }
        const zoomLevelToBeSet = currentZoomLevel + 1
        logDebug(LOG_TAG, "<<< (ZOOM-IN) zoomLevel to be set: " + zoomLevelToBeSet)
        isZoomTriggered = true
        updateCurrentZoomLevel(zoomLevelToBeSet)
        setRefresh(++refreshValue)
    }

    /**
     * Handle event occurs when pressing zoom out.
     */
    function onClickZoomOut() {
        if (currentZoomLevel === MIN_ZOOM_LEVEL) {
            outputErrorLog(LOG_TAG, "CANNOT zoom-out anymore")
            return
        }
        const zoomLevelToBeSet = currentZoomLevel - 1
        logDebug(LOG_TAG, "<<< (ZOOM-OUT) zoomLevel to be set: " + zoomLevelToBeSet)
        isZoomTriggered = true
        updateCurrentZoomLevel(zoomLevelToBeSet)
        setRefresh(++refreshValue)
    }

    /**
     * Update zoom level use state.
     */
    function updateZoomLevel(zoomLevel) {
        if (!isLoadedZoomLevelUpdate) {
            isLoadedZoomLevelUpdate = true
            return
        }
        isZoomUpdated = true
        updateCurrentZoomLevel(zoomLevel)
    }

    /**
     * Handle event occurred when pressing history item.
     * @param {String} itemInfo 
     * @param {Number} index 
     */
    function onClickHistoryItem(itemInfo, index) {
        const latitude = itemInfo.latitude
        const longitude = itemInfo.longitude

        selectedHistoryIndex = index
        recentHistory = historyList[index]
        currentAddress = itemInfo.fullAddress
        shortAddress = itemInfo.shortAddress
        isZoomUpdated = isZoomTriggered = false

        setLocationInformation(latitude, longitude)
    }

    /**
     * Handle event occurs when pressing header area.
     */
    function onClickHeaderArea() {
        if (previousHeaderClickTime === 0) {
            headerClickCountForExtractingLog = 0
            previousHeaderClickTime = getCurrentMillTime()

        } else {
            if (getCurrentMillTime() - previousHeaderClickTime >= 300) {
                previousHeaderClickTime = headerClickCountForExtractingLog = 0

            } else {
                previousHeaderClickTime = getCurrentMillTime()
                if (++headerClickCountForExtractingLog > 10) {
                    const cachedLogMessages = getCachedLogMessages()
                    if (cachedLogMessages.length <= 0) {
                        return
                    }
                    let logMessageList = []
                    for (const item of cachedLogMessages) {
                        logMessageList.push(item + "\n")
                    }
                    if (logMessageList.length <= 0) {
                        return
                    } else {
                        FileSaver.saveAs(
                            new Blob(logMessageList, { type: TEXT_TYPE }),
                            getCurrentCustomDateTime() + "_" + FILE_NAME_FOR_LOG
                        )
                    }
                    previousHeaderClickTime = headerClickCountForExtractingLog = 0
                }
            }
        }
    }

    return (
        <>
            <HomeComponent
                onPressCollectData={onPressCollectData}
                onClickSaveHistory={onClickSaveHistory}
                onPressRealtimeCollectData={onPressRealtimeCollectData}
                onClickZoomIn={onClickZoomIn}
                onClickZoomOut={onClickZoomOut}
                isReportExpired={isReportExpired}
                errorMessage={errorMessage}
                hasError={hasError}
                latitude={latitude}
                longitude={longitude}
                historyList={historyList}
                currentAddress={currentAddress}
                loading={loading}
                domainUrl={domain}
                refresh={refresh}
                shortAddress={shortAddress}
                recentHistory={recentHistory}
                isZoomTriggered={isZoomTriggered}
                isZoomUpdated={isZoomUpdated}
                updateZoomLevel={updateZoomLevel}
                currentZoomLevel={currentZoomLevel}
                onClickHeaderArea={onClickHeaderArea}
                onClickHistoryItem={onClickHistoryItem}
                selectedHistoryIndex={selectedHistoryIndex}
            />
        </>
    )
}
