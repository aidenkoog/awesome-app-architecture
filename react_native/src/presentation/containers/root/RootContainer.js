import { useEffect, useRef } from "react"
import { AppState } from "react-native"
import { SERVICE_UUID } from "../../../utils/Config"
import Constants from "../../../utils/Constants"
import RootComponent from "./RootComponent"
import { logDebug, logError } from "../../../utils/Logger"

/**
 * bluetooth related usecases.
 */
const startScanUseCase = require('../../../domain/usecases/bluetooth/StartScanUseCase.js').default
const executeBleModuleUseCase = require('../../../domain/usecases/bluetooth/ExecuteBleModuleUseCase').default

const LOG_TAG = Constants.LOG.ROOT_UI_LOG

/**
 * root container that includes logic and root component ui.
 * @returns {JSX.Element}
 */
export default function RootContainer() {

    /**
     * appState (useRef) is not changed even though rendering is executed again.
     */
    const appState = useRef(AppState.currentState);

    /**
     * detect current app state change.
     * @param {string} nextAppState 
     */
    const onHandleAppStateChange = nextAppState => {
        console.log("root", 'appState nextAppState current: ', appState.current, ", next: ", nextAppState)
        if (appState.current.match(/inactive|background/) && nextAppState === Constants.ROOT.APP_ACTIVE) {
            console.log("root", 'app has come to the foreground!')
        }
        if (appState.current.match(/inactive|active/) && nextAppState === Constants.ROOT.APP_BACKGROUND) {
            console.log("root", 'app has come to the background!')
        }
        appState.current = nextAppState
    }

    /**
     * test code for checking if usecase, repository and core module work well or not.
     */
    const testBluetoothFeature = () => {
        executeBleModuleUseCase.execute().then(() => {
            logDebug(LOG_TAG, "succeeded in executing ble module")
            startScanUseCase.execute(SERVICE_UUID, Constants.BT.SCAN_DURATION).then(() => {
                logDebug(LOG_TAG, "succeeded in starting the device scan")
            }).catch((e) => {
                logError(LOG_TAG, e)
            })
        }).catch((e) => {
            logError(LOG_TAG, e)
        })
    }

    useEffect(() => {
        // when component is mounted
        console.log("root", "component is mounted!")
        AppState.addEventListener(Constants.ROOT.APP_EVENT_TYPE, onHandleAppStateChange)

        // test code for ble test
        testBluetoothFeature()

        // when component is unmounted
        return () => {
            console.log("root", "component is unmounted !!!")
            AppState.removeEventListener(Constants.ROOT.APP_EVENT_TYPE, onHandleAppStateChange)
        }
    }, [])

    return (
        <RootComponent />
    )
}
