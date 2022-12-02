import { logDebug, logDebugWithLine, outputErrorLog } from "../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"
import { useLayoutEffect, useState } from "react"
import GetActivitiesUseCase from "../../domain/usecases/GetActivitiesUseCase"
import { getCurrentMillTime, getHistoryTypedDateMessage } from "../../utils/time/TimeUtil"
import GetPhoneNumberFromUrlUseCase from "../../domain/usecases/GetPhoneNumberFromUrlUseCase"
import SendSmsUseCase from "../../domain/usecases/SendSmsUseCase"
import { RESPONSE_OK } from "../../data/sources/response_code/ResponseCode"
import { ONDEMAND_XXX_REPORT, XXX_REPORT } from "../../data/sources/types/EventType"
import {
    ERROR_MSG_NO_XXX_REPORT, ERROR_MSG_NO_XXX_REPORT_WITHIN_24_HOURS,
    ERROR_MSG_NO_VALID_LOCATION, ERROR_MSG_PHONE_NUMBER_ERROR, ERROR_MSG_FAILED_SMS,
    ERROR_MSG_WRONG_PHONE_NUMBER, ERROR_MSG_NO_RESPONSE, ERROR_MSG_NO_FOUND_ADDRESS, ERROR_MSG_FAILED_CURRENT_LOCATION
} from "../../utils/error/ErrorMessages"
import { REGEX_PHONE_NUMBER } from "../../utils/regex/RegexUtil"
import SetDomainUrlUseCase from "../../domain/usecases/SetDomainUrlUseCase"
import { NOT_SUPPORT_FUNCTION } from "../../assets/strings/Strings"

/**
 * file saver module for downloading the file on the webpage.
 */
var FileSaver = require('file-saver')

/**
 * default constants.
 */
const RECENT_RESPONSE_INDEX = 0
const DEFAULT_LATITUDE_AND_LONGITUDE = 0
const DEFAULT_STRING_VALUE = ""
const DEFAULT_BOOLEAN_VALUE = false
const LOG_TAG = "HomeContainer"
const TEXT_TYPE = "text/plain;charset=utf-8"
const FILE_NAME_TO_SAVE = "history.txt"
const HOURS_24_MILL = 86400000
const SEND_SMS_FAILED_ERROR_MESSAGE = "NOT_OK"
const HISTORY_SAVE_SUPPORT = false
const POLLING_API_MAX_MILL_TIME = 120000
const POLLING_API_INTERVAL_MILL_TIME = 3000
const FOOTER_SUPPORT = false

/**
 * If the value is the same as before, useState does not work, 
 * so, use this variable to increase the value and render the UI.
 */
let refreshValue = 0

/**
 * history list of searching location.
 */
let historyList = []

/**
 * the latest address information
 */
let currentAddress = ""
let recentHistory = ""

/**
 * purpose of determining whether the location inquiry update button was pressed.
 * refs. why use: for controlling history list.
 */
let isRefreshing = false
let isRefreshingWithRealtime = false

/**
 * variable represents if checking if there's XXX report is being executed.
 * refs. why use: for controlling history list.
 */
let isCheckingXxxReport = false

/**
 * flag used to determine whether a page has been loaded at least once.
 */
let loaded = false

/**
 * previous location information (latitude, longitude)
 */
let previousLatitude = 0
let previousLongitude = 0

/**
 * flag set to reload the page if the activity information is not properly fetched when first entering the page.
 */
let retryGetActivitiesCount = 0
const MAX_RETRY_COUNT = 5

/**
 * flag to store query start milliseconds time and retry-count needed when querying the current location.
 */
let queryStartMillTime = 0
let queryRetryCount = 0
let latestXxxReportMillTime = 0

/**
 * purpose to update component.
 */
let PURPOSE_QUERY_LOCATION_BY_BUTTON = "PURPOSE_QUERY_LOCATION_BY_BUTTON"


/**
 * home page.
 * @returns {JSX.Element}
 */
export default function HomeContainer() {

    /**
     * use state for ui interacting.
     */
    const [latitude, setLatitude] = useState(DEFAULT_LATITUDE_AND_LONGITUDE)
    const [longitude, setLongitude] = useState(DEFAULT_LATITUDE_AND_LONGITUDE)
    const [isReportExpired, setIsReportExpired] = useState(DEFAULT_BOOLEAN_VALUE)
    const [errorMessage, setErrorMessage] = useState(DEFAULT_STRING_VALUE)
    const [hasError, setHasError] = useState(DEFAULT_BOOLEAN_VALUE)
    const [loading, setLoading] = useState(DEFAULT_BOOLEAN_VALUE)
    const [refresh, setRefresh] = useState(refreshValue)

    /**
     * usecases.
     */
    const {
        executeGetActivitiesUseCase,
        executeGetActivitiesWithExtraUseCase
    } = GetActivitiesUseCase()

    const { executeGetPhoneNumberFromUrlUseCase } = GetPhoneNumberFromUrlUseCase()
    const { executeSetDomainUrlUseCase } = SetDomainUrlUseCase()
    const { executeSendSmsUseCase } = SendSmsUseCase()

    /**
     * called before ui rendering and painting.
     */
    useLayoutEffect(() => {
        if (!loaded) {
            loaded = true
            printDefaultSettings()
            initializeWebPage()
        }

    }, [initializeWebPage])

    /**
     * print activities response information.
     */
    function printResponse(response) {
        if (response == null) {
            outputErrorLog(LOG_TAG, "response is null, cannot print response information")
            return
        }
        const responseJsonString = JSON.stringify(response)
        const responseJsonParsed = JSON.parse(responseJsonString)

        logDebug(LOG_TAG, "<<< responseJsonString: " + responseJsonString)
        logDebug(LOG_TAG, "<<< responseJsonParsed: " + responseJsonParsed)
        logDebug(LOG_TAG, "<<< response length: " + response.length)
    }

    /**
     * get the latest created date time from response.
     * @param {Any} response 
     * @returns {string}
     */
    function getLatestCreatedDateTime(response) {
        return response[RECENT_RESPONSE_INDEX].createdDate
    }

    /**
     * get the latest created date mill time.
     * @param {Any} response 
     * @returns {Number}
     */
    function getLatestCreatedMillTime(response) {
        return new Date(response[RECENT_RESPONSE_INDEX].createdDate).getTime()
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
     * @param {string} errorMessage 
     */
    function enableErrorState(errorMessage) {
        setHasError(true)
        setErrorMessage(errorMessage)
        setLoading(false)
    }

    /**
     * update xxx 24hours expiration state.
     */
    function update24HoursExpiration() {
        setIsReportExpired(true)
        setLocationInformation(DEFAULT_LATITUDE_AND_LONGITUDE, DEFAULT_LATITUDE_AND_LONGITUDE)
        setErrorMessage(ERROR_MSG_NO_XXX_REPORT_WITHIN_24_HOURS)
        setLoading(false)
    }

    /**
     * check if phone number is valid or not.
     * @param {string} watchMobileNumber 
     * @returns 
     */
    function hasValidPhoneNumber(watchMobileNumber) {
        return REGEX_PHONE_NUMBER.test(watchMobileNumber)
    }

    /**
     * update ui components.
     * @param {Any} response 
     */
    function updateComponents(response, extraErrorMessage = "", purposeToUpdate = "") {
        if (response == null || response.length < 1) {
            enableErrorState(extraErrorMessage)
            return false
        }

        const responseCreatedDateAsMill = getLatestCreatedMillTime(response)
        const currentMillTime = getCurrentMillTime()

        if (currentMillTime - responseCreatedDateAsMill > HOURS_24_MILL) {
            update24HoursExpiration()
            return false

        } else {
            clearErrorState()
            const recentResponse = response[RECENT_RESPONSE_INDEX]
            const responseLat = recentResponse.lat
            const responseLng = recentResponse.lng

            if (!hasValidLatAndLng(responseLat, responseLng)) {
                enableErrorState(ERROR_MSG_NO_VALID_LOCATION)

            } else {
                if (purposeToUpdate != PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                    createHistoryList(
                        recentResponse.provider,
                        getHistoryTypedDateMessage(recentResponse.createdDate),
                        recentResponse.address == null ? ERROR_MSG_NO_FOUND_ADDRESS : recentResponse.address,
                        recentResponse.createdDate)
                }
                recentHistory = historyList != null && historyList.length > 0 ? historyList[historyList.length - 1] : ""
                setLocationInformation(responseLat, responseLng)
            }
            return true
        }
    }

    /**
     * set location infomation (latitude, longitude)
     * @param {double} latitude 
     * @param {double} longitude 
     */
    function setLocationInformation(latitude, longitude) {
        if (previousLatitude === 0 && previousLongitude === 0) {
            previousLatitude = latitude
            previousLongitude = longitude

        } else {
            if (previousLatitude === latitude && previousLongitude === longitude) {
                logDebug(LOG_TAG, ">>> no need to update location information")
                setRefresh(++refreshValue)
                return
            }
        }
        logDebug(LOG_TAG, ">>> set location information: latitude: " + latitude + ", longitude: " + longitude)
        setLatitude(latitude)
        setLongitude(longitude)
    }

    /**
     * get response's extra error message used when response is not valid.
     * @param {Any} response 
     * @returns {string}
     */
    function getResponseExtraErrorMessage(response) {
        return response == null || response.length < 1 ? ERROR_MSG_NO_RESPONSE : null
    }

    /**
     * initialize web page.
     */
    function initializeWebPage() {
        const urlLocation = window.location
        executeSetDomainUrlUseCase(urlLocation).then(() => {
            initializeActivitiesInformation(urlLocation)

        }).catch((e) => {
            enableErrorState(e)
        })
    }

    /**
     * initialize activities information.
     * @param {Location} urlLocation 
     */
    function initializeActivitiesInformation(urlLocation) {
        const searchParam = urlLocation.search
        const watchMobileNumber = executeGetPhoneNumberFromUrlUseCase(searchParam)

        if (!hasValidPhoneNumber(watchMobileNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }

        executeGetActivitiesWithExtraUseCase(watchMobileNumber, XXX_REPORT, "").then((response) => {
            printResponse(response)
            retryGetActivitiesCount = 0

            if (!updateComponents(response, getResponseExtraErrorMessage(response))) {
                return
            }
            isCheckingXxxReport = true

            executeGetActivitiesWithExtraUseCase(
                watchMobileNumber, ONDEMAND_XXX_REPORT, getLatestCreatedDateTime(response)).then((response) => {
                    printResponse(response)

                    if (response.length > 0) {
                        latestXxxReportMillTime = getLatestCreatedMillTime(response)
                        createCurrentAddress(response)

                        let responseAddressItemList = []
                        for (const item of response) {
                            responseAddressItemList.push(item)
                        }

                        for (const item of responseAddressItemList.reverse()) {
                            createHistoryList(
                                item.provider,
                                getHistoryTypedDateMessage(item.createdDate),
                                item.address == null ? ERROR_MSG_NO_FOUND_ADDRESS : item.address,
                                item.createdDate)
                        }
                        recentHistory =
                            historyList != null && historyList.length > 0 ? historyList[historyList.length - 1] : ""

                        setLocationInformation(
                            response[RECENT_RESPONSE_INDEX].lat,
                            response[RECENT_RESPONSE_INDEX].lng
                        )
                    }
                    isCheckingXxxReport = false

                }).catch((_e) => {
                    isCheckingXxxReport = false
                })

        }).catch((_e) => {
            enableErrorState(watchMobileNumber == null ?
                ERROR_MSG_NO_VALID_LOCATION + "|" + ERROR_MSG_PHONE_NUMBER_ERROR : ERROR_MSG_NO_VALID_LOCATION)

            if (watchMobileNumber != null) { retryGetActivities() }
        })
    }

    /**
     * retry to getting activities.
     */
    function retryGetActivities() {
        if (++retryGetActivitiesCount >= MAX_RETRY_COUNT) {
            enableErrorState(ERROR_MSG_NO_VALID_LOCATION)
            retryGetActivitiesCount = 0
            return
        }
        logDebugWithLine(LOG_TAG, "retry to get activities")
        initializeWebPage()
    }

    /**
     * check if latitude and longitude is valid.
     */
    function hasValidLatAndLng(latitude, longitude) {
        return (latitude === DEFAULT_LATITUDE_AND_LONGITUDE || latitude < 0)
            || (longitude === DEFAULT_LATITUDE_AND_LONGITUDE || longitude < 0) ? false : true
    }

    /**
     * create history list.
     */
    function createHistoryList(provider, date, responseAddress, createdDate) {
        const address = responseAddress === ERROR_MSG_NO_FOUND_ADDRESS ? "--" : responseAddress
        const createDateTime = createdDate.replace("T", " ").replace("Z", " ")
        let historyMessage = provider + "|" + date + "|" + address + "|" + createDateTime

        if (!isRefreshing && !isCheckingXxxReport) {
            historyList = []
            historyList.push(historyMessage)

        } else {
            historyList.push(historyMessage)
        }
        logDebugWithLine(LOG_TAG, ">>> history length: " + historyList.length + ", history list: " + historyList)
    }

    /**
     * create current address information.
     * @param {Any} response
     */
    function createCurrentAddress(response) {
        const responseAddress = response[RECENT_RESPONSE_INDEX].address
        currentAddress = responseAddress == null ? ERROR_MSG_NO_FOUND_ADDRESS : responseAddress
    }

    /**
     * print default setting information.
     */
    function printDefaultSettings() {
        logDebugWithLine(LOG_TAG,
            "history save support: " + HISTORY_SAVE_SUPPORT + "\n"
            + ", file name to save: " + FILE_NAME_TO_SAVE + "\n"
            + ", text type: " + TEXT_TYPE + "\n"
            + ", default latitude: " + DEFAULT_LATITUDE_AND_LONGITUDE + "\n"
            + ", default longitude: " + DEFAULT_LATITUDE_AND_LONGITUDE)
    }

    /**
     * handle event occurred when collect data button is pressed.
     */
    function onPressCollectData() {
        if (isRefreshing) {
            outputErrorLog(LOG_TAG, "refreshing current location now")
            return
        }
        isRefreshing = true

        queryStartMillTime = getCurrentMillTime()
        logDebugWithLine(LOG_TAG, "queryStartMillTime: " + queryStartMillTime + ", queryRetryCount: " + queryRetryCount)

        setLoading(true)
        queryCurrentLocation()
    }

    /**
     * handle event occurred when real-time collect data button is pressed.
     */
    function onPressRealtimeCollectData() {
        if (isRefreshing) {
            outputErrorLog(LOG_TAG, "refreshing current location now")
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
        const watchMobileNumber = executeGetPhoneNumberFromUrlUseCase(window.location.search)
        executeGetActivitiesUseCase(watchMobileNumber).then((response) => {
            printResponse(response)

            if (!updateComponents(response, getResponseExtraErrorMessage(response), PURPOSE_QUERY_LOCATION_BY_BUTTON)) {
                isRefreshing = false
                return
            }

            sendSms(watchMobileNumber).then(() => {
                executeGetActivitiesWithExtraUseCase(
                    watchMobileNumber,
                    ONDEMAND_XXX_REPORT,
                    response[RECENT_RESPONSE_INDEX].createdDate).then((response) => {

                        printResponse(response)
                        if (response.length <= 0) {
                            retryQueryCurrentLocation(ERROR_MSG_NO_XXX_REPORT)

                        } else {
                            const latestCreatedTime = getLatestCreatedMillTime(response)
                            if (latestXxxReportMillTime < latestCreatedTime) {
                                createCurrentAddress(response)
                                updateComponents(response)
                                clearRetryQueryCurrentLocationStates(latestCreatedTime)
                                setLoading(false)
                                setRefresh(++refreshValue)

                            } else {
                                retryQueryCurrentLocation(ERROR_MSG_NO_XXX_REPORT)
                            }
                        }

                    }).catch((_e) => {
                        retryQueryCurrentLocation(ERROR_MSG_NO_XXX_REPORT)
                    })

            }).catch((_e) => {
                retryQueryCurrentLocation(ERROR_MSG_FAILED_SMS)
            })

        }).catch((_e) => {
            retryQueryCurrentLocation(ERROR_MSG_FAILED_CURRENT_LOCATION)
        })
    }

    /**
     * call apis every 3 seconds for 2 minutes until the latest current location information is received.
     * @param {String} errorMessage 
     */
    function retryQueryCurrentLocation(errorMessage) {
        let consumedTime = getCurrentMillTime() - queryStartMillTime
        logDebug(LOG_TAG, ">>> consumedTime: " + consumedTime)

        if (consumedTime >= POLLING_API_MAX_MILL_TIME) {
            logDebug(LOG_TAG, ">>> API was called for 2 minutes, "
                + "but no data came in (retryCount: " + queryRetryCount + ")")

            clearRetryQueryCurrentLocationStates()
            enableErrorState(errorMessage)

        } else {
            setTimeout(() => {
                queryRetryCount++
                logDebugWithLine(LOG_TAG, "<<< retry to call queryCurrentLocation with query" + queryRetryCount)

                queryCurrentLocation()

            }, POLLING_API_INTERVAL_MILL_TIME)
        }
    }

    /**
     * initialize state variables related to retrying the current location lookup operation.
     */
    function clearRetryQueryCurrentLocationStates(latestCreatedTime = 0) {
        queryRetryCount = 0
        queryStartMillTime = 0
        latestXxxReportMillTime = latestCreatedTime
        isRefreshing = false
    }


    /**
     * ask device to send sms message.
     * @param {string} watchMobileNumber 
     * @returns {Promise}
     */
    function sendSms(watchMobileNumber) {
        return new Promise((fulfill, reject) => {
            executeSendSmsUseCase(watchMobileNumber).then((response) => {
                if (RESPONSE_OK.code === response.code) {
                    fulfill()

                } else {
                    reject(SEND_SMS_FAILED_ERROR_MESSAGE)
                }

            }).catch((e) => {
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

    return (
        <>
            <HomeComponent
                onPressCollectData={onPressCollectData}
                onClickSaveHistory={onClickSaveHistory}
                isReportExpired={isReportExpired}
                errorMessage={errorMessage}
                hasError={hasError}
                latitude={latitude}
                longitude={longitude}
                historyList={historyList}
                currentAddress={currentAddress}
                loading={loading}
                refresh={refresh}
                historySaveSupport={HISTORY_SAVE_SUPPORT}
                footerSupport={FOOTER_SUPPORT}
                recentHistory={recentHistory}
                onPressRealtimeCollectData={onPressRealtimeCollectData}
            />
        </>
    )
}
