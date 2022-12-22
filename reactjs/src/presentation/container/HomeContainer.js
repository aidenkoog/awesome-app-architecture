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
    ERROR_MSG_WRONG_PHONE_NUMBER, ERROR_MSG_NO_RESPONSE, ERROR_MSG_NO_FOUND_ADDRESS, ERROR_MSG_FAILED_CURRENT_LOCATION
} from "../../assets/strings/Strings"
import { hasValidPhoneNumber } from "../../utils/regex/RegexUtil"
import { NOT_SUPPORT_FUNCTION, SEND_SMS_FAILED_ERROR_MESSAGE } from "../../assets/strings/Strings"
import SetDomainUrlUseCase from "../../domain/usecases/url/SetDomainUrlUseCase"
import GetDecryptedPhoneNumberUseCase from "../../domain/usecases/url/GetDecryptedPhoneNumberUseCase"
import {
    POLLING_API_MAX_MILL_TIME, POLLING_API_INTERVAL_MILL_TIME, HOURS_24_MILL, FileSaver, TEXT_TYPE,
    FILE_NAME_TO_SAVE, DEFAULT_ZOOM_LEVEL, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL, FILE_NAME_FOR_LOG
} from "../../configs/Configs"
import GetDomainUrlUseCase from "../../domain/usecases/url/GetDomainUrlUseCase"


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
let isSmsSent = false

/**
 * purpose to update component.
 */
const PURPOSE_QUERY_LOCATION_BY_BUTTON = "PURPOSE_QUERY_LOCATION_BY_BUTTON"
const PURPOSE_QUERY_LOCATION_SUCCESS = "PURPOSE_QUERY_LOCATION_SUCCESS"

const MAX_RETRY_COUNT = 5

/**
 * purpose of determining whether the location inquiry update button was pressed.
 * refs. why use: for controlling history list.
 */
let isRefreshing = false
let isRefreshingWithRealtime = false

/**
 * variable represents if checking if there's EMERGENCY report is being executed.
 * refs. why use: for controlling history list.
 */
let isCheckingEmergencyReport = false

/**
 * flag used to determine whether a page has been loaded at least once.
 */
let loaded = false

/**
 * flag to store query start milliseconds time and retry-count needed when querying the current location.
 */
let queryStartMillTime = 0
let queryRetryCount = 0
let latestEmergencyReportMillTime = 0

/**
 * home page.
 * @returns {JSX.Element}
 */
export default function HomeContainer() {

    /**
     * use state for ui interacting.
     */
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [isReportExpired, setIsReportExpired] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(refreshValue)
    const [currentZoomLevel, setCurrentZoomLevel] = useState(DEFAULT_ZOOM_LEVEL)

    /**
     * usecases.
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
     * called before ui rendering and painting.
     */
    useLayoutEffect(() => {
        if (!loaded) {
            loaded = true
            logDebugWithLine(LOG_TAG, "<<< WebPage is LOADED: " + loaded)
            initializeWebPage()
        }
    }, [initializeWebPage])

    /**
     * print activities response information.
     */
    function printResponse(response) {
        if (response == null) {
            outputErrorLog(LOG_TAG, "response is NULL, CANNOT print response information")
            return
        }
        const responseJsonString = JSON.stringify(response)
        const responseJsonParsedObject = JSON.parse(responseJsonString)

        logDebug(LOG_TAG, "<<< response \n[LENGTH]: " + response.length)
        logDebug(LOG_TAG, "<<< response \n[JSON-STRING]: \n" + responseJsonString)
        logDebug(LOG_TAG, "<<< response \n[JSON-PARSED-OBJECT]: \n" + responseJsonParsedObject)
    }

    /**
     * get the latest created date mill time.
     * @param {Any} response 
     * @returns {Number}
     */
    function getLatestCreatedMillTime(response) {
        return new Date(response[0].createdDate).getTime()
    }

    /**
     * clear error related states.
     */
    function clearErrorState() {
        setIsReportExpired(false)
        setErrorMessage("")
        setHasError(false)
    }

    /**
     * enable error state with error message.
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
     * update sos 24hours expiration state.
     */
    function update24HoursExpiration() {
        outputErrorLog(LOG_TAG, "SOS report is EXPIRED (24 hours)")
        createErrorAddress()
        setIsReportExpired(true)
        setLocationInformation(0, 0)
        setErrorMessage(ERROR_MSG_NO_EMERGENCY_REPORT_WITHIN_24_HOURS)
        setLoading(false)
    }

    /**
     * update ui components.
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

        const responseCreatedDateAsMill = getLatestCreatedMillTime(response)
        const currentMillTime = getCurrentMillTime()

        if (currentMillTime - responseCreatedDateAsMill > HOURS_24_MILL) {
            if (purposeToUpdate === PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                updateComponentWithNormalCase(response, purposeToUpdate)
                return true

            } else {
                update24HoursExpiration()
                return false
            }

        } else {
            updateComponentWithNormalCase(response, purposeToUpdate)
            return true
        }
    }

    /**
     * update ui component in case of normal.
     * @param {Any} response 
     * @param {String} purposeToUpdate 
     */
    function updateComponentWithNormalCase(response, purposeToUpdate) {
        clearErrorState()
        const recentResponse = response[0]
        const responseLatitude = recentResponse.lat
        const responseLongitude = recentResponse.lng

        if (!hasValidLatAndLng(responseLatitude, responseLongitude)) {
            enableErrorState(ERROR_MSG_NO_VALID_LOCATION)

        } else {
            createCurrentAddress(response)

            if (purposeToUpdate !== PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                let responseItemList = []
                for (const item of response) {
                    responseItemList.push(item)
                }

                for (const responseItem of responseItemList.reverse()) {
                    createHistoryList(
                        responseItem.shortAddress,
                        responseItem.provider,
                        getHistoryTypedDateMessage(responseItem.measuredDate),
                        responseItem.address == null ? ERROR_MSG_NO_FOUND_ADDRESS : responseItem.address,
                        responseItem.measuredDate)
                }
                latestEmergencyReportMillTime = getLatestCreatedMillTime(response)
            }
            recentHistory = historyList != null && historyList.length > 0 ? historyList[historyList.length - 1] : ""
            logDebug(LOG_TAG, ">>> RECENT history: " + recentHistory)

            if (purposeToUpdate !== PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                setLocationInformation(responseLatitude, responseLongitude)
            }
        }
    }

    /**
     * set location infomation (latitude, longitude)
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
        setLatitude(latitude)
        setLongitude(longitude)
    }

    /**
     * get response's extra error message used when response is not valid.
     * @param {Any} response 
     * @returns {String}
     */
    function getResponseExtraErrorMessage(response) {
        return response == null || response.length < 1 ? ERROR_MSG_NO_RESPONSE : null
    }

    /**
     * initialize web page.
     */
    function initializeWebPage() {
        executeSetDomainUrlUseCase(window.location).then(() => {
            domain = executeGetDomainUrlUseCase()
            logDebug(LOG_TAG, "<<< SUCCEEDED to set domain url, current domain: " + domain)
            initializeActivitiesInformation()

        }).catch((e) => {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to set domain")
            enableErrorState(e)
        })
    }

    /**
     * get device phone number.
     * @returns {String}
     */
    function getDevicePhoneNumber() {
        const deviceMobileNumber =
            executeGetDecryptedPhoneNumberUseCase(
                executeGetPhoneNumberFromUrlUseCase(window.location.search))
        return deviceMobileNumber
    }

    /**
     * initialize activities information.
     */
    function initializeActivitiesInformation() {
        const deviceMobileNumber = getDevicePhoneNumber()
        logDebug(LOG_TAG, ">>> START to initialize activities, PHONE NUMBER: " + deviceMobileNumber)

        if (!hasValidPhoneNumber(deviceMobileNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }

        logDebug(LOG_TAG, ">>> REQUEST SOS and EMERGENCY report")
        executeGetActivitiesWithExtraUseCase(deviceMobileNumber,
            EMERGENCY_REPORT + "," + ONDEMAND_EMERGENCY_REPORT, "").then((response) => {
                printResponse(response)
                retryGetActivitiesCount = 0

                isCheckingEmergencyReport = true
                if (!updateComponents(response, getResponseExtraErrorMessage(response))) {
                    isCheckingEmergencyReport = false
                    return
                }

            }).catch((_e) => {
                outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to get activities (SOS, EMERGENCY)")
                isCheckingEmergencyReport = false
                enableErrorState(deviceMobileNumber == null ?
                    ERROR_MSG_NO_VALID_LOCATION + "|" + ERROR_MSG_PHONE_NUMBER_ERROR : ERROR_MSG_NO_VALID_LOCATION)

                if (deviceMobileNumber != null) { retryGetActivities() }
            })
    }

    /**
     * retry to getting activities.
     */
    function retryGetActivities() {
        if (++retryGetActivitiesCount >= MAX_RETRY_COUNT) {
            outputErrorLog(LOG_TAG, "NO succeeded to get activities (SOS, EMERGENCY) even retry it")
            enableErrorState(ERROR_MSG_NO_VALID_LOCATION)
            retryGetActivitiesCount = 0
            return
        }
        logDebugWithLine(LOG_TAG, "RETRY to get activities (SOS, EMERGENCY)")
        initializeWebPage()
    }

    /**
     * check if latitude and longitude is valid.
     */
    function hasValidLatAndLng(latitude, longitude) {
        return (latitude === 0 || latitude < 0)
            || (longitude === 0 || longitude < 0) ? false : true
    }

    /**
     * create history list.
     */
    function createHistoryList(responseShortAddress, provider, date, responseAddress, createdDate) {
        const address = responseAddress === ERROR_MSG_NO_FOUND_ADDRESS ? "--" : responseAddress
        const shortAddress = responseShortAddress === ERROR_MSG_NO_FOUND_ADDRESS ? "--" : responseShortAddress
        const createDateTime = createdDate.replace("T", " ").replace("Z", " ")
        const providerData = provider === undefined || provider == null ? "--" : provider

        let historyMessage =
            shortAddress + "|" + providerData + "|"
            + date + "|" + address + "|"
            + createDateTime + "|" + createdDate

        logDebug(LOG_TAG, ">>> HISTORY Message to be SET: " + historyMessage)

        if (!isRefreshing && !isCheckingEmergencyReport) {
            historyList = []
            historyList.push(historyMessage)

        } else {
            historyList.push(historyMessage)
        }

        logDebugWithLine(LOG_TAG, ">>> HISTORY Length: " + historyList.length)

        let historyListForDebugging = []
        for (const item of historyList) {
            historyListForDebugging.push("\n" + item)
        }
        logDebugWithLine(LOG_TAG, ">>> HISTORY List: " + historyListForDebugging)
    }

    /**
     * create current address information.
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
     * create address for error.
     */
    function createErrorAddress() {
        currentAddress = ERROR_MSG_NO_FOUND_ADDRESS
    }

    /**
     * handle event occurred when collect data button is pressed.
     */
    function onPressCollectData() {
        if (isRefreshing) {
            outputErrorLog(LOG_TAG, "NOW, refreshing current location")
            return
        }
        isRefreshing = true
        queryStartMillTime = getCurrentMillTime()

        logDebugWithLine(LOG_TAG, ""
            + "queryStartMillTime: " + queryStartMillTime
            + ", queryRetryCount: " + queryRetryCount)

        sendSms(getDevicePhoneNumber()).then(() => {
            logDebug(LOG_TAG, "<<< SUCCEEDED to send SMS, START to query the current location")
            setLoading(true)
            queryCurrentLocation()

        }).catch((_e) => {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to send SMS")
            clearRetryQueryCurrentLocationStates()
            enableErrorState(ERROR_MSG_FAILED_SMS)
        })
    }

    /**
     * handle event occurred when real-time collect data button is pressed.
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
     * query current location (triggered when the button, query current location is pressed)
     */
    function queryCurrentLocation() {
        const deviceMobileNumber = getDevicePhoneNumber()
        logDebug(LOG_TAG, ">>> START to query current location, PHONE NUMBER: " + deviceMobileNumber)

        if (!hasValidPhoneNumber(deviceMobileNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }

        logDebug(LOG_TAG, ">>> request ALL report")
        executeGetActivitiesUseCase(deviceMobileNumber).then((response) => {
            printResponse(response)

            if (!updateComponents(response, getResponseExtraErrorMessage(response), PURPOSE_QUERY_LOCATION_BY_BUTTON)) {
                isRefreshing = false
                return
            }

            const latestAcitivityCreateDate = response[0].createdDate
            logDebug(LOG_TAG, ">>> request EMERGENCY report with " + latestAcitivityCreateDate)

            executeGetActivitiesWithExtraUseCase(
                deviceMobileNumber,
                ONDEMAND_EMERGENCY_REPORT,
                latestAcitivityCreateDate).then((response) => {

                    printResponse(response)
                    if (response.length <= 0) {
                        retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)

                    } else {
                        const foundLatestCreatedTime = getLatestCreatedMillTime(response)
                        logDebug(LOG_TAG, "<<< "
                            + "LATEST CachedEmergencyReportMillTime: " + latestEmergencyReportMillTime
                            + ", foundLatestCreatedTime: " + foundLatestCreatedTime
                            + ", queryStartMillTime: " + queryStartMillTime)

                        if (latestEmergencyReportMillTime < foundLatestCreatedTime
                            && queryStartMillTime < foundLatestCreatedTime) {

                            createCurrentAddress(response)
                            updateComponents(response, "", PURPOSE_QUERY_LOCATION_SUCCESS)

                            latestEmergencyReportMillTime = foundLatestCreatedTime
                            logDebug(LOG_TAG, "<<< "
                                + "RE-SET LATEST CachedEmergencyReportMillTime (" + latestEmergencyReportMillTime + ")")

                            clearRetryQueryCurrentLocationStates()
                            setLoading(false)
                            setRefresh(++refreshValue)

                        } else {
                            outputErrorLog(LOG_TAG, "NO found the recent EMERGENCY report")
                            retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)
                        }
                    }

                }).catch((_e) => {
                    outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to get EMERGENCY report")
                    retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)
                })

        }).catch((_e) => {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs when trying to get ALL report")
            retryQueryCurrentLocation(ERROR_MSG_FAILED_CURRENT_LOCATION)
        })
    }

    /**
     * call apis every 3 seconds for 2 minutes until the latest current location information is received.
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
     * initialize state variables related to retrying the current location lookup operation.
     */
    function clearRetryQueryCurrentLocationStates() {
        queryRetryCount = 0
        queryStartMillTime = 0
        isRefreshing = false
        isSmsSent = false
    }

    /**
     * ask device to send sms message.
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
     * handle event occurred when clicking the save history button.
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
     * handle event occurs when pressing zoom in.
     */
    function onClickZoomIn() {
        if (currentZoomLevel === MAX_ZOOM_LEVEL) {
            outputErrorLog(LOG_TAG, "CANNOT zoom-in anymore")
            return
        }
        const zoomLevelToBeSet = currentZoomLevel + 1
        logDebug(LOG_TAG, "<<< (ZOOM-IN) zoomLevel to be set: " + zoomLevelToBeSet)

        setCurrentZoomLevel(zoomLevelToBeSet)
    }

    /**
     * handle event occurs when pressing zoom out.
     */
    function onClickZoomOut() {
        if (currentZoomLevel === MIN_ZOOM_LEVEL) {
            outputErrorLog(LOG_TAG, "CANNOT zoom-out anymore")
            return
        }
        const zoomLevelToBeSet = currentZoomLevel - 1
        logDebug(LOG_TAG, "<<< (ZOOM-OUT) zoomLevel to be set: " + zoomLevelToBeSet)

        setCurrentZoomLevel(zoomLevelToBeSet)
    }

    /**
     * handle event occurs when pressing header area.
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
                currentZoomLevel={currentZoomLevel}
                onClickHeaderArea={onClickHeaderArea}
            />
        </>
    )
}
