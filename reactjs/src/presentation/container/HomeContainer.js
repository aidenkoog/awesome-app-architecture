import { logDebug, logDebugWithLine, outputErrorLog } from "../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"
import { useLayoutEffect, useState } from "react"
import GetActivitiesUseCase from "../../domain/usecases/activities/GetActivitiesUseCase"
import { getCurrentMillTime, getHistoryTypedDateMessage } from "../../utils/time/TimeUtil"
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
    HISTORY_SAVE_SUPPORT, FOOTER_SUPPORT, POLLING_API_MAX_MILL_TIME,
    POLLING_API_INTERVAL_MILL_TIME, HOURS_24_MILL, FileSaver, TEXT_TYPE, FILE_NAME_TO_SAVE,
    MAX_MAP_ZOOM_OUT_COUNT, MAX_MAP_ZOOM_IN_COUNT
} from "../../configs/Configs"
import GetDomainUrlUseCase from "../../domain/usecases/url/GetDomainUrlUseCase"

const LOG_TAG = "HomeContainer"

/**
 * default constants.
 */
const RECENT_RESPONSE_INDEX = 0
const DEFAULT_LATITUDE_AND_LONGITUDE = 0
const DEFAULT_STRING_VALUE = ""
const DEFAULT_BOOLEAN_VALUE = false

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
 * variable represents if checking if there's emergency report is being executed.
 * refs. why use: for controlling history list.
 */
let isCheckingEmergencyReport = false

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
let latestEmergencyReportMillTime = 0

/**
 * purpose to update component.
 */
let PURPOSE_QUERY_LOCATION_BY_BUTTON = "PURPOSE_QUERY_LOCATION_BY_BUTTON"
let PURPOSE_QUERY_LOCATION_SUCCESS = "PURPOSE_QUERY_LOCATION_SUCCESS"

/**
 * check if sms is already sent
 */
let isSmsSent = false

/**
 * domain url.
 */
let domain = ""

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
    const [additionalZoomValue, setAdditionalZoomValue] = useState(0)

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
     * @param {String} errorMessage 
     */
    function enableErrorState(errorMessage) {
        createErrorAddress()
        setHasError(true)
        setErrorMessage(errorMessage === undefined || errorMessage == null ? "" : errorMessage)
        setLoading(false)
    }

    /**
     * update sos 24hours expiration state.
     */
    function update24HoursExpiration() {
        createErrorAddress()
        setIsReportExpired(true)
        setLocationInformation(DEFAULT_LATITUDE_AND_LONGITUDE, DEFAULT_LATITUDE_AND_LONGITUDE)
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
        const recentResponse = response[RECENT_RESPONSE_INDEX]
        const responseLat = recentResponse.lat
        const responseLng = recentResponse.lng

        if (!hasValidLatAndLng(responseLat, responseLng)) {
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
                        responseItem.provider,
                        getHistoryTypedDateMessage(responseItem.createdDate),
                        responseItem.address == null ? ERROR_MSG_NO_FOUND_ADDRESS : responseItem.address,
                        responseItem.createdDate)
                }
                latestEmergencyReportMillTime = getLatestCreatedMillTime(response)
            }
            recentHistory = historyList != null && historyList.length > 0 ? historyList[historyList.length - 1] : ""
            if (purposeToUpdate !== PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                setLocationInformation(responseLat, responseLng)
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
            initializeActivitiesInformation()

        }).catch((e) => {
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

        if (!hasValidPhoneNumber(deviceMobileNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }

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
        let historyMessage = provider + "|" + date + "|" + address + "|" + createDateTime + "|" + createdDate

        if (!isRefreshing && !isCheckingEmergencyReport) {
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
        if (response == null || response === undefined || response.length <= 0) {
            currentAddress = ERROR_MSG_NO_FOUND_ADDRESS
            return
        }
        const responseAddress = response[RECENT_RESPONSE_INDEX].address
        currentAddress = responseAddress == null ? ERROR_MSG_NO_FOUND_ADDRESS : responseAddress
    }

    /**
     * create address for error.
     */
    function createErrorAddress() {
        currentAddress = ERROR_MSG_NO_FOUND_ADDRESS
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

        sendSms(getDevicePhoneNumber()).then(() => {
            setLoading(true)
            queryCurrentLocation()

        }).catch((_e) => {
            clearRetryQueryCurrentLocationStates()
            enableErrorState(ERROR_MSG_FAILED_SMS)
        })
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
        const deviceMobileNumber = getDevicePhoneNumber()

        if (!hasValidPhoneNumber(deviceMobileNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }

        executeGetActivitiesUseCase(deviceMobileNumber).then((response) => {
            printResponse(response)

            if (!updateComponents(response, getResponseExtraErrorMessage(response), PURPOSE_QUERY_LOCATION_BY_BUTTON)) {
                isRefreshing = false
                return
            }

            executeGetActivitiesWithExtraUseCase(
                deviceMobileNumber,
                ONDEMAND_EMERGENCY_REPORT,
                response[RECENT_RESPONSE_INDEX].createdDate).then((response) => {

                    printResponse(response)
                    if (response.length <= 0) {
                        retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)

                    } else {
                        const foundLatestCreatedTime = getLatestCreatedMillTime(response)
                        logDebug(LOG_TAG, "latestEmergencyReportMillTime: " + latestEmergencyReportMillTime
                            + ", foundLatestCreatedTime: " + foundLatestCreatedTime
                            + ", queryStartMillTime: " + queryStartMillTime)

                        if (latestEmergencyReportMillTime < foundLatestCreatedTime
                            && queryStartMillTime < foundLatestCreatedTime) {

                            createCurrentAddress(response)
                            updateComponents(response, "", PURPOSE_QUERY_LOCATION_SUCCESS)
                            latestEmergencyReportMillTime = foundLatestCreatedTime
                            clearRetryQueryCurrentLocationStates()
                            setLoading(false)
                            setRefresh(++refreshValue)

                        } else {
                            retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)
                        }
                    }

                }).catch((_e) => {
                    retryQueryCurrentLocation(ERROR_MSG_NO_REPORT)
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
            logDebug(LOG_TAG, ">>> API had been called for 2 minutes, "
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
                logDebug(LOG_TAG, ">>> SMS already sent")
                fulfill()
            }
            executeSendSmsUseCase(deviceMobileNumber).then((response) => {
                if (RESPONSE_OK.code === response.code) {
                    isSmsSent = true
                    logDebugWithLine(LOG_TAG, "<<< succeeded to send SMS, responseCode: " + response.code)
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

    /**
     * handle event occurs when pressing zoom in.
     */
    function onClickZoomIn() {
        logDebug(LOG_TAG, "<<< additionalZoomValue: " + additionalZoomValue)
        setAdditionalZoomValue(
            additionalZoomValue + 1 > MAX_MAP_ZOOM_IN_COUNT ? additionalZoomValue : additionalZoomValue + 1
        )
    }

    /**
     * handle event occurs when pressing zoom out.
     */
    function onClickZoomOut() {
        logDebug(LOG_TAG, "<<< additionalZoomValue: " + additionalZoomValue)
        setAdditionalZoomValue(
            additionalZoomValue - 1 < MAX_MAP_ZOOM_OUT_COUNT ? additionalZoomValue : additionalZoomValue - 1
        )
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
                domainUrl={domain}
                refresh={refresh}
                historySaveSupport={HISTORY_SAVE_SUPPORT}
                footerSupport={FOOTER_SUPPORT}
                recentHistory={recentHistory}
                onPressRealtimeCollectData={onPressRealtimeCollectData}
                onClickZoomIn={onClickZoomIn}
                onClickZoomOut={onClickZoomOut}
                additionalZoomValue={additionalZoomValue}
            />
        </>
    )
}
