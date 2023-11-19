import {
    bleDeviceFoundAtom, bleConnectionStateAtom, bleConnectionCompleteStateAtom, bleAuthResultAtom
} from '../../../data'
import CheckPermissionUseCase from '../../../domain/usecases/platform/CheckPermissionUseCase'
import { replaceToNextScreen } from '../../../utils/navigation/NavigationUtil'
import { useLayoutEffect } from 'react'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/basic/ConnectBleUseCase'
import Constants from '../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import BluetoothComponent from './BluetoothComponent'
import { useRecoilValue } from 'recoil'
import { showToast } from '../../../utils/toast/ToastUtil'

const LOG_TAG = Constants.LOG.BT_UI_LOG

/**
 * message to be shown when connection to device is established successfully.
 */
const PAIRING_SUCCESS_MESSAGE = "Pairing with the device is complete."

/**
 * screen navigation related constants.
 */
const NEXT_SCREEN = Constants.SCREEN.HOME_BOTTOM_TAB_SCREEN
const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME

/**
 * bluetooth connection screen.
 * @param {any} props 
 * @return {JSX.Element}
 */
const BluetoothContainer = ({ navigation }: any): JSX.Element => {

    /**
     * usecases.
     */
    const { executeBleModuleUseCase, executeStartScanUseCase } = ConnectBleUseCase()
    const { executeBluetoothPermissionUseCase } = CheckPermissionUseCase()

    /**
     * state management variables to change UI according to Bluetooth operation state change
     */
    const bleDeviceFound = useRecoilValue(bleDeviceFoundAtom)
    const bleConnectionState = useRecoilValue(bleConnectionStateAtom)
    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)
    const bleAuthResult = useRecoilValue(bleAuthResultAtom)

    /**
     * start scanning the ble device.
     */
    const startScan = () => {
        executeStartScanUseCase().catch((e: any) => {
            outputErrorLog(LOG_TAG, e + " occurred by executeStartScanUseCase")
        })
    }

    /**
     * check if bluetooth related permission are granted, execute ble module
     * and start scanning if all previous steps are passed successfully.
     */
    const startScenario = () => {
        executeBluetoothPermissionUseCase((accepted: any) => {
            if (accepted) {
                logDebug(LOG_TAG, "<<< bluetooth related permissions are granted")
                executeBleModuleUseCase().then(() => {
                    startScan()

                }).catch((e: any) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeBleModuleUseCase")
                })

            } else {
                outputErrorLog(LOG_TAG, "bluetooth related permissions are NOT granted")
            }
        })
    }

    /**
     * execute logic before finishing ui rendering on the screen.
     * this is used to prevent the flickering of the UI due to data change.
     */
    useLayoutEffect(() => {
        if (bleConnectionCompleteState) {
            logDebug(LOG_TAG, "<<< bleConnectionCompleteState: " + bleConnectionCompleteState)

            showToast(PAIRING_SUCCESS_MESSAGE)
            replaceToNextScreen(navigation, NEXT_SCREEN, NAVIGATION_NO_DELAY_TIME)

        } else {
            startScenario()
        }

        return () => { }

        // Refs. the code in useLayoutEffect will not work if you don't write the variable or method used here.
    }, [bleConnectionCompleteState, bleAuthResult, navigation, NEXT_SCREEN, NAVIGATION_NO_DELAY_TIME])

    return (
        <BluetoothComponent
            bleDeviceFound={bleDeviceFound}
            bleConnectionState={bleConnectionState}
            bleConnectionCompleteState={bleConnectionCompleteState}
        />
    )
}
export default BluetoothContainer