import { useRef } from "react"
import { AppState, AppStateEvent } from "react-native"
import { logDebug, logDebugWithLine } from "../../../utils/logger/Logger"
import Constants from "../../../utils/Constants"

const LOG_TAG = Constants.LOG.COMMON_REPO_LOG
const APP_EVENT_TYPE = Constants.ROOT.APP_EVENT_TYPE as AppStateEvent

/**
 * implement functions used within the app.
 * @return {any}
 */
const CommonRepository = (): any => {

    /**
     * appState (useRef) is not changed even though rendering is executed again.
     */
    const appState = useRef(AppState.currentState)

    /**
     * detect current app state change.
     * @param {any} nextAppState 
     */
    const onHandleAppStateChange = (nextAppState: any) => {
        logDebug(LOG_TAG, "<<< appState nextAppState current: " + appState.current + ", next: " + nextAppState)
        if (appState.current.match(/inactive|background/) && nextAppState === Constants.ROOT.APP_ACTIVE) {
            logDebugWithLine(LOG_TAG, '>>> app has come to the FOREGROUND')
        }
        if (appState.current.match(/inactive|active/) && nextAppState === Constants.ROOT.APP_BACKGROUND) {
            logDebugWithLine(LOG_TAG, '>>> app has come to the BACKGROUND')
        }
        appState.current = nextAppState
    }

    /**
     * add an event handler that can detect whether the app is in the background or foreground.
     */
    const addAppStateHandler = () => {
        AppState.addEventListener(APP_EVENT_TYPE, onHandleAppStateChange)
    }

    return {
        addAppStateHandler,
    }
}

export default CommonRepository