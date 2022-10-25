import { useEffect, useRef } from "react"
import { AppState } from "react-native"
import { SERVICE_UUID } from "../../../utils/Config"
import Constants from "../../../utils/Constants"
import RootComponent from "./RootComponent"
import { logDebug, outputErrorLog } from "../../../utils/Logger"
import ConnectBleUseCase from "../../../domain/usecases/bluetooth/ConnectBleUseCase"
import { bleScanningStateAtom } from "../../../data/adapters/recoil/bluetooth/ScanningStateAtom"
import { useRecoilValue } from "recoil"

const LOG_TAG = Constants.LOG.ROOT_UI_LOG

/**
 * root container that includes logic and root component ui.
 * @returns {JSX.Element}
 */
export default function RootContainer() {

    /**
     * ble scanning state
     */
    const bleScanningState = useRecoilValue(bleScanningStateAtom)

    /**
     * funtional usecase declaration test.
     */
    const { executeStartScanUseCase, executeBleModuleUseCase } = ConnectBleUseCase()

    /**
     * appState (useRef) is not changed even though rendering is executed again.
     */
    const appState = useRef(AppState.currentState)

    /**
     * detect current app state change.
     * @param {string} nextAppState 
     */
    const onHandleAppStateChange = nextAppState => {
        logDebug(LOG_TAG, '<<< appState nextAppState current: ', appState.current, ", next: ", nextAppState)
        if (appState.current.match(/inactive|background/) && nextAppState === Constants.ROOT.APP_ACTIVE) {
            logDebug(LOG_TAG, '<<< app has come to the foreground')
        }
        if (appState.current.match(/inactive|active/) && nextAppState === Constants.ROOT.APP_BACKGROUND) {
            logDebug(LOG_TAG, '<<< app has come to the background')
        }
        appState.current = nextAppState
    }

    /**
     * test code for checking if usecase, repository and core module work well or not.
     */
    const testBluetoothFeature = () => {
        executeBleModuleUseCase().then(() => {
            logDebug(LOG_TAG, "<<< succeeded in executing ble module")
            executeStartScanUseCase(SERVICE_UUID, Constants.BT.SCAN_DURATION).then(() => {
                logDebug(LOG_TAG, "<<< succeeded in starting the device scan")
            }).catch((e) => {
                outputErrorLog(LOG_TAG, e)
            })
        }).catch((e) => {
            outputErrorLog(LOG_TAG, e)
        })
    }

    useEffect(() => {
        // when component is mounted
        logDebug(LOG_TAG, "<<< root component is mounted")
        AppState.addEventListener(Constants.ROOT.APP_EVENT_TYPE, onHandleAppStateChange)

        // test code for ble test
        testBluetoothFeature()

        // when component is unmounted
        return () => {
            logDebug(LOG_TAG, "<<< root component is unmounted")
            AppState.removeEventListener(Constants.ROOT.APP_EVENT_TYPE, onHandleAppStateChange)
        }
    }, [])

    return (
        <RootComponent
            scanningState={bleScanningState}
        >
        </RootComponent>
    )
}
