import {
    ERROR_MSG_NO_REPORT, ERROR_MSG_NO_EMERGENCY_REPORT_WITHIN_24_HOURS, ERROR_MSG_NO_VALID_LOCATION,
    ERROR_MSG_PHONE_NUMBER_ERROR, ERROR_MSG_FAILED_SMS, ERROR_MSG_WRONG_PHONE_NUMBER, ERROR_MSG_NO_RESPONSE,
    ERROR_MSG_NO_FOUND_ADDRESS, EMERGENCY_STRING, EMERGENCY_EVENT, CURRENT_LOCATION_EVENT
} from "../../assets/strings/Strings"
import {
    HOURS_24_MILL, FileSaver, TEXT_TYPE, FILE_NAME_TO_SAVE, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL, FILE_NAME_FOR_LOG,
    updateCurrentZoomLevel, currentZoomLevel, KR_TIME_DIFF, WEBSOCKET_SUBSCRIBE_TOPIC, WEBSOCKET_URL_SUFFIX,

} from "../../configs/Configs"
import { getCurrentCustomDateTime, getCurrentMillTime, getHistoryTypedDateMessage } from "../../utils/time/TimeUtil"
import GetDecryptedPhoneNumberUseCase from "../../domain/usecases/url/GetDecryptedPhoneNumberUseCase"
import GetPhoneNumberFromUrlUseCase from "../../domain/usecases/url/GetPhoneNumberFromUrlUseCase"
import { ONDEMAND_EMERGENCY_REPORT, EMERGENCY_REPORT } from "../../data/sources/event_types/EventType"
import { SEND_SMS_FAILED_ERROR_MESSAGE } from "../../assets/strings/Strings"
import GetActivitiesUseCase from "../../domain/usecases/activities/GetActivitiesUseCase"
import SetDomainUrlUseCase from "../../domain/usecases/url/SetDomainUrlUseCase"
import GetDomainUrlUseCase from "../../domain/usecases/url/GetDomainUrlUseCase"
import { getCachedLogMessages, logDebug, outputErrorLog } from "../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"
import { useLayoutEffect, useState } from "react"
import SendSmsUseCase from "../../domain/usecases/sms/SendSmsUseCase"
import { RESPONSE_OK } from "../../data/sources/responses/ResponseCode"
import { hasValidPhoneNumber } from "../../utils/regex/RegexUtil"
import HistoryInfo from "../../domain/entities/HistoryInfo"
import { useEffect } from "react"
import SockJS from "sockjs-client"
import * as StompJS from '@stomp/stompjs'
import { useRef } from "react"


const PURPOSE_QUERY_LOCATION_BY_BUTTON = "PURPOSE_QUERY_LOCATION_BY_BUTTON"
const PURPOSE_QUERY_LOCATION_SUCCESS = "PURPOSE_QUERY_LOCATION_SUCCESS"
const PURPOSE_NEW_LOCATION_DATA = "PURPOSE_NEW_LOCATION_DATA"
const LOG_TAG = "HomeContainer"

let updatePurpose = ""
let historyList = []
let recentHistory = ""
let currentAddress = ""
let shortAddress = ""
let domain = ""
let previousLatitude = 0
let previousLongitude = 0
let refreshValue = 0
let headerClickCountForExtractingLog = 0
let previousHeaderClickTime = 0
let selectedHistoryIndex = 0
let isSmsSent = false
let isSmsSending = false
let isZoomTriggered = false
let isZoomUpdated = false
let isRefreshing = false
let isCheckingEmergencyReport = false
let isCheckingActivityEvent = false
let socketEstablished = false
let activityEventCheckStartTime = 0
let queryStartMillTime = 0
let latestCachedEmergencyReportMillTime = 0
let cachedLastMeasuredTime = 0
let locationSearchTimeout = null
let checkActivityEventTimeout = null

export default function HomeContainer() {

    const webSocketClient = useRef(null)

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [isReportExpired, setIsReportExpired] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(refreshValue)
    const [socketConnected, setSocketConnected] = useState(false)
    const [webpageLoaded, setWebpageLoaded] = useState(false)

    const { executeGetDecryptedPhoneNumberUseCase } = GetDecryptedPhoneNumberUseCase()
    const { executeGetPhoneNumberFromUrlUseCase } = GetPhoneNumberFromUrlUseCase()
    const { executeSetDomainUrlUseCase } = SetDomainUrlUseCase()
    const { executeSendSmsUseCase } = SendSmsUseCase()
    const { executeGetDomainUrlUseCase } = GetDomainUrlUseCase()
    const {
        executeGetActivitiesUseCase, executeGetActivitiesWithExtraUseCase
    } = GetActivitiesUseCase()

    useLayoutEffect(() => {
        if (webpageLoaded) { return }
        setWebpageLoaded(true)
        initializeWebPage()

    }, [initializeWebPage, webpageLoaded])

    useEffect(() => {
        socketEstablished = socketConnected
        if (socketConnected) {
            logDebug(LOG_TAG, "socket is already connected")
            return
        }
        initializeWebSocket()

    }, [socketConnected])

    useEffect(() => { return () => webSocketClient.current.deactivate() }, [])

    function subscribeMessage() {
        const phoneNumber = getDevicePhoneNumber()

        if (!hasValidPhoneNumber(phoneNumber)) {
            webSocketClient.current.deactivate()
            setSocketConnected(false)
            return
        }
        webSocketClient.current.subscribe(
            WEBSOCKET_SUBSCRIBE_TOPIC + phoneNumber, onReceiveMessage
        )
        setSocketConnected(true)
    }

    function onReceiveMessage() {
        updatePurpose = PURPOSE_NEW_LOCATION_DATA
        socketEstablished = true
        clearAllTimeout()
        setWebpageLoaded(false)
    }

    function initializeWebSocket() {
        webSocketClient.current = new StompJS.Client({
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            webSocketFactory: () => new SockJS(WEBSOCKET_URL_SUFFIX),
            debug: message => logDebug(LOG_TAG, "[socket] message: " + message === undefined ? "" : message),
            onConnect: () => subscribeMessage(),
            onStompError: frame => outputErrorLog(LOG_TAG, "[socket] onStompError, frame: " + frame)
        })
        webSocketClient.current.activate()
    }

    function getLatestMeasuredMillTime(response) {
        return new Date(response[0].measuredDate).getTime()
    }

    function getResponseExtraErrorMessage(response) {
        return response == null || response.length < 1 ? ERROR_MSG_NO_RESPONSE : null
    }

    function getDevicePhoneNumber() {
        return executeGetDecryptedPhoneNumberUseCase(
            executeGetPhoneNumberFromUrlUseCase(window.location.search)
        )
    }

    function hasValidLatAndLng(latitude, longitude) {
        return (latitude === 0 || latitude < 0) || (longitude === 0 || longitude < 0) ? false : true
    }

    function getEventTypeString(eventTypeData) {
        return eventTypeData.includes(EMERGENCY_STRING) ? EMERGENCY_EVENT : CURRENT_LOCATION_EVENT
    }

    function refreshWebPage() { setTimeout(() => { document.location.reload() }) }
    function createErrorAddress() { currentAddress = ERROR_MSG_NO_FOUND_ADDRESS }
    function onClickZoomIn() { handleZoomControl("zoomIn") }
    function onClickZoomOut() { handleZoomControl("zoomOut") }

    function queryCurrentLocation(isLastQuery = false) {
        const phoneNumber = getDevicePhoneNumber()
        if (!hasValidPhoneNumber(phoneNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }
        executeGetActivitiesUseCase(phoneNumber).then((response) => {
            if (!updateComponents(
                response,
                getResponseExtraErrorMessage(response),
                PURPOSE_QUERY_LOCATION_BY_BUTTON)
            ) {
                isRefreshing = false
                return
            }
            executeGetActivitiesWithExtraUseCase(
                phoneNumber,
                ONDEMAND_EMERGENCY_REPORT,
                response[0].measuredDate

            ).then((response) => {
                if (response.length <= 0) {
                    return
                }
                const latestMeasuredTime = getLatestMeasuredMillTime(response)
                /* 
                 * If the found measurement time value is greater than the cached time 
                 * and greater than the current location search start time, 
                 * it is judged to be successful. 
                 */
                if (
                    latestCachedEmergencyReportMillTime < latestMeasuredTime
                    && queryStartMillTime < latestMeasuredTime
                ) {
                    createCurrentAddress(response)
                    selectedHistoryIndex = 0
                    updateComponents(response, "", PURPOSE_QUERY_LOCATION_SUCCESS)
                    latestCachedEmergencyReportMillTime = latestMeasuredTime
                    clearRetryQueryCurrentLocationStates()
                    setLoading(false)
                    setRefresh(++refreshValue)

                } else {
                    if (!isLastQuery) { return }
                    clearRetryQueryCurrentLocationStates()
                    enableErrorState(ERROR_MSG_NO_REPORT)
                }
            }).catch(_e => { })
        }).catch(_e => { })
    }

    function initializeWebPage() {
        clearData()
        executeSetDomainUrlUseCase(window.location).then(() => {
            domain = executeGetDomainUrlUseCase()
            initializeActivityEvent()

        }).catch((e) => { enableErrorState(e) })
    }

    function clearData() {
        historyList = []
        isZoomTriggered = false
        isSmsSent = isSmsSending = false
        isZoomUpdated = false
        isRefreshing = false
        isCheckingEmergencyReport = false
        previousHeaderClickTime = 0
        selectedHistoryIndex = 0
        activityEventCheckStartTime = 0
    }

    function initializeActivityEvent() {
        const phoneNumber = getDevicePhoneNumber()

        if (!hasValidPhoneNumber(phoneNumber)) {
            updateComponents(null, ERROR_MSG_WRONG_PHONE_NUMBER)
            return
        }

        executeGetActivitiesWithExtraUseCase(
            phoneNumber, EMERGENCY_REPORT + "," + ONDEMAND_EMERGENCY_REPORT, ""
        ).then((response) => {
            isCheckingEmergencyReport = true
            updateComponents(response, getResponseExtraErrorMessage(response))
            isCheckingEmergencyReport = false

        }).catch((_e) => {
            isCheckingEmergencyReport = false
            enableErrorState(
                phoneNumber == null ?
                    ERROR_MSG_NO_VALID_LOCATION + "|" + ERROR_MSG_PHONE_NUMBER_ERROR
                    : ERROR_MSG_NO_VALID_LOCATION
            )
        }).finally(() => {
            if (!socketEstablished) {
                checkActivityEvent()
            } else {
                clearActivityEventCheckState()
            }
        })
    }

    function clearAllTimeout() {
        clearTimeout(checkActivityEventTimeout)
        clearTimeout(locationSearchTimeout)
    }

    function clearActivityEventCheckState() {
        isCheckingActivityEvent = false
        activityEventCheckStartTime = 0
    }

    function checkActivityEvent() {
        if (isRefreshing || isSmsSent || isSmsSending) {
            isCheckingActivityEvent = false
            return
        }
        isCheckingActivityEvent = true
        if (activityEventCheckStartTime === 0) {
            activityEventCheckStartTime = getCurrentMillTime()
        }
        if (getCurrentMillTime() - activityEventCheckStartTime > 15000) {
            clearActivityEventCheckState()

        } else {
            checkActivityEventTimeout = setTimeout(() => {
                if (socketEstablished) {
                    clearActivityEventCheckState()
                    return
                }
                initializeActivityEvent()
            }, 3000)
        }
    }

    function onPressCollectData() {
        if (isRefreshing || isSmsSent || isSmsSending) { return }

        isSmsSending = isRefreshing = true
        isZoomTriggered = isZoomUpdated = isCheckingActivityEvent = false
        queryStartMillTime = getCurrentMillTime()

        sendSms(getDevicePhoneNumber()).then(() => {
            isSmsSending = false
            setLoading(true)
            startLocationSearchTimeout()
            queryCurrentLocation()

        }).catch((_e) => {
            clearRetryQueryCurrentLocationStates()
            enableErrorState(ERROR_MSG_FAILED_SMS)
        })
    }

    function startLocationSearchTimeout() {
        locationSearchTimeout = setTimeout(() => {
            if (!socketEstablished) {
                queryCurrentLocation(true)

            } else {
                clearRetryQueryCurrentLocationStates()
                enableErrorState(ERROR_MSG_NO_REPORT)
                clearAllTimeout()
            }
        }, 60000)
    }

    function sendSms(phoneNumber) {
        return new Promise((fulfill, reject) => {
            if (isSmsSent) {
                fulfill()

            } else {
                executeSendSmsUseCase(phoneNumber).then((response) => {
                    if (RESPONSE_OK.code === response.code) {
                        isSmsSent = true
                        fulfill()
                    } else {
                        reject(SEND_SMS_FAILED_ERROR_MESSAGE)
                    }
                }).catch((e) => { reject(e) })
            }
        })
    }

    function enableErrorState(errorMessage) {
        createErrorAddress()
        setHasError(true)
        setErrorMessage(errorMessage === undefined || errorMessage == null ? "" : errorMessage)
        setLoading(false)
    }

    function update24HoursExpiration() {
        createErrorAddress()
        setIsReportExpired(true)
        setLocationInformation(0, 0)
        setErrorMessage(ERROR_MSG_NO_EMERGENCY_REPORT_WITHIN_24_HOURS)
        setLoading(false)
    }

    function updateComponentWithNormalCase(response, purposeToUpdate, currentMillTime) {
        clearErrorState()

        const responseLatitude = response[0].lat
        const responseLongitude = response[0].lng

        if (!hasValidLatAndLng(responseLatitude, responseLongitude)) {
            enableErrorState(ERROR_MSG_NO_VALID_LOCATION)

        } else {
            createCurrentAddress(response)

            if (purposeToUpdate !== PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                for (const responseItem of response) {
                    if (currentMillTime - (new Date(responseItem.measuredDate)
                        .getTime() - KR_TIME_DIFF) > HOURS_24_MILL) {
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
                latestCachedEmergencyReportMillTime = getLatestMeasuredMillTime(response)
            }
            recentHistory = historyList != null && historyList.length > 0 ? historyList[0] : ""

            if (purposeToUpdate !== PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                setLocationInformation(responseLatitude, responseLongitude)

                if (purposeToUpdate === PURPOSE_NEW_LOCATION_DATA) {
                    purposeToUpdate = ""
                    setLoading(false)
                }
            }
        }
    }

    function updateComponents(response, extraErrorMessage = "", purposeToUpdate = "") {

        if (response == null || response.length < 1) {
            if (purposeToUpdate === PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                return true
            }
            enableErrorState(extraErrorMessage)
            return false
        }
        const currentMillTime = getCurrentMillTime()
        const lastMeasuredTime = getLatestMeasuredMillTime(response) - KR_TIME_DIFF

        if (currentMillTime - lastMeasuredTime > HOURS_24_MILL) {
            if (purposeToUpdate === PURPOSE_QUERY_LOCATION_BY_BUTTON) {
                updateComponentWithNormalCase(response, purposeToUpdate, currentMillTime)
                return true

            } else {
                if (!isRefreshing) { update24HoursExpiration() }
                return false
            }

        } else {
            if (!isCheckingActivityEvent) {
                cachedLastMeasuredTime = lastMeasuredTime
                updateComponentWithNormalCase(
                    response,
                    updatePurpose !== "" ? updatePurpose : purposeToUpdate,
                    currentMillTime
                )

            } else {
                if (cachedLastMeasuredTime === 0 || cachedLastMeasuredTime >= lastMeasuredTime) {
                    return true
                }
                cachedLastMeasuredTime = lastMeasuredTime
                updateComponentWithNormalCase(
                    response, PURPOSE_NEW_LOCATION_DATA, currentMillTime
                )
            }
            return true
        }
    }

    function setLocationInformation(latitude, longitude) {
        if (previousLatitude === 0 && previousLongitude === 0) {
            previousLatitude = latitude
            previousLongitude = longitude

        } else {
            if (previousLatitude === latitude && previousLongitude === longitude) {
                setRefresh(++refreshValue)
                return
            }
        }
        previousLatitude = latitude
        previousLongitude = longitude
        setLatitude(latitude)
        setLongitude(longitude)
    }

    function clearErrorState() {
        setIsReportExpired(false)
        setErrorMessage("")
        setHasError(false)
    }

    function clearRetryQueryCurrentLocationStates() {
        queryStartMillTime = 0
        isRefreshing = isSmsSent = isSmsSending = false
    }

    function createHistoryList(
        purposeToUpdate, responseShortAddress, provider,
        date, responseAddress, measuredDate,
        eventType, accuracy, latitude, longitude
    ) {

        let historyMessage = new HistoryInfo(
            responseShortAddress === ERROR_MSG_NO_FOUND_ADDRESS ? "--" : responseShortAddress,
            provider === undefined || provider == null ? "--" : provider.toUpperCase(),
            date, responseAddress === ERROR_MSG_NO_FOUND_ADDRESS ? "--" : responseAddress,
            measuredDate.replace("T", " ").replace("Z", " "), measuredDate,
            getEventTypeString(eventType === undefined || eventType == null || eventType === "" ? "--" : eventType),
            accuracy === undefined || accuracy == null || accuracy === "" ? "--" : accuracy,
            latitude, longitude
        )
        if (!isRefreshing && !isCheckingEmergencyReport) {
            historyList = []
            historyList.push(historyMessage)

        } else {
            if (purposeToUpdate === PURPOSE_QUERY_LOCATION_SUCCESS || isCheckingActivityEvent) {
                historyList.unshift(historyMessage)

            } else if (purposeToUpdate === PURPOSE_NEW_LOCATION_DATA) {
                historyList.push(historyMessage)

            } else {
                historyList.push(historyMessage)
            }
        }
    }

    function createCurrentAddress(response) {
        if (response == null || response === undefined || response.length <= 0) {
            currentAddress = ERROR_MSG_NO_FOUND_ADDRESS
            shortAddress = ""
            return
        }
        const latestResponse = response[0]
        currentAddress = latestResponse.address == null ? ERROR_MSG_NO_FOUND_ADDRESS : latestResponse.address
        shortAddress = latestResponse.shortAddress == null ? "" : latestResponse.shortAddress
    }

    function refreshHistoryList() {
        let updatedHistoryList = []
        for (const history of historyList) {
            let historyMessage = new HistoryInfo(
                history.shortAddress, history.provider,
                getHistoryTypedDateMessage(history.measuredDate), history.fullAddress,
                history.measuredDateTime, history.measuredDate,
                history.eventType, history.accuracy,
                history.latitude, history.longitude
            )
            updatedHistoryList.push(historyMessage)
        }
        historyList = []
        for (const history of updatedHistoryList) { historyList.push(history) }
    }

    function handleZoomControl(type) {
        if ((type === "zoomIn" && (currentZoomLevel === MAX_ZOOM_LEVEL))
            || (type === "zoomOut" && (currentZoomLevel === MIN_ZOOM_LEVEL))) { return }

        isZoomTriggered = true
        updateCurrentZoomLevel(type === "zoomIn" ? currentZoomLevel + 1 : currentZoomLevel - 1)
        setRefresh(++refreshValue)
    }

    function onClickHistoryItem(itemInfo, index) {
        selectedHistoryIndex = index
        recentHistory = historyList[index]
        currentAddress = itemInfo.fullAddress
        shortAddress = itemInfo.shortAddress
        isZoomUpdated = isZoomTriggered = false
        setLocationInformation(itemInfo.latitude, itemInfo.longitude)
    }

    function onClickSaveHistory() {
        let historyListToBeSaved = []
        for (const item of historyList) { historyListToBeSaved.push(item + "\n") }
        if (historyListToBeSaved.length <= 0) {
            return

        } else {
            FileSaver.saveAs(new Blob(historyListToBeSaved, { type: TEXT_TYPE }), FILE_NAME_TO_SAVE)
        }
    }

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
                    if (cachedLogMessages.length <= 0) { return }
                    let logMessageList = []
                    for (const item of cachedLogMessages) {
                        logMessageList.push(item + "\n")
                    }
                    if (logMessageList.length <= 0) {
                        return
                    } else {
                        FileSaver.saveAs(new Blob(logMessageList, { type: TEXT_TYPE }),
                            getCurrentCustomDateTime() + "_" + FILE_NAME_FOR_LOG)
                    }
                    previousHeaderClickTime = headerClickCountForExtractingLog = 0
                }
            }
        }
    }

    return (
        <HomeComponent
            onClickHeaderArea={onClickHeaderArea}
            onPressCollectData={onPressCollectData}
            onClickSaveHistory={onClickSaveHistory}
            onClickHistoryItem={onClickHistoryItem}
            onRefreshWebPage={refreshWebPage}
            onClickZoomIn={onClickZoomIn}
            onClickZoomOut={onClickZoomOut}
            currentZoomLevel={currentZoomLevel}
            isZoomTriggered={isZoomTriggered}
            isZoomUpdated={isZoomUpdated}
            refresh={refresh}
            isRefreshing={isRefreshing}
            currentAddress={currentAddress}
            shortAddress={shortAddress}
            isReportExpired={isReportExpired}
            errorMessage={errorMessage}
            hasError={hasError}
            latitude={latitude}
            longitude={longitude}
            historyList={historyList}
            recentHistory={recentHistory}
            loading={loading}
            domainUrl={domain}
            selectedHistoryIndex={selectedHistoryIndex}
        />
    )
}