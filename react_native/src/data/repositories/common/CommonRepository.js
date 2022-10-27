import { AppState } from "react-native"
import { logDebug } from "../../../utils/Logger"
import Constants from "../../../utils/Constants"

const LOG_TAG = Constants.LOG.COMMON_REPO_LOG
const APP_EVENT_TYPE = Constants.ROOT.APP_EVENT_TYPE

/**
 * implement functions used within the app.
 * @returns {Any}
 */
const CommonRepository = () => {

    /**
     * appState (useRef) is not changed even though rendering is executed again.
     */
    const appState = useRef(AppState.currentState)

    /**
     * detect current app state change.
     * @param {string} nextAppState 
     */
    onHandleAppStateChange = nextAppState => {
        logDebug(LOG_TAG, '<<< appState nextAppState current: ', appState.current, ", next: ", nextAppState)
        if (appState.current.match(/inactive|background/) && nextAppState === Constants.ROOT.APP_ACTIVE) {
            logDebug(LOG_TAG, '>>> app has come to the FOREGROUND')
        }
        if (appState.current.match(/inactive|active/) && nextAppState === Constants.ROOT.APP_BACKGROUND) {
            logDebug(LOG_TAG, '>>> app has come to the BACKGROUND')
        }
        appState.current = nextAppState
    }

    /**
     * add an event handler that can detect whether the app is in the background or foreground.
     */
    addAppStateHandler = () => {
        AppState.addEventListener(APP_EVENT_TYPE, this.onHandleAppStateChange)
    }

    /**
     * remove an event handler that can detect whether the app is in the background or foreground.
     */
    removeAppStateHandler = () => {
        AppState.removeEventListener(APP_EVENT_TYPE, this.onHandleAppStateChange)
    }

    return {
        addAppStateHandler,
        removeAppStateHandler
    }
}

export default CommonRepository