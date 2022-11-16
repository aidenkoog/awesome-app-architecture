import { useLayoutEffect } from 'react'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/basic/ConnectBleUseCase'
import Constants from '../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import BluetoothComponent from './BluetoothComponent'
import { bleDeviceFoundAtom, bleConnectionStateAtom, bleConnectionCompleteStateAtom } from '../../../data'
import { useRecoilValue } from 'recoil'
import CheckPermissionUseCase from '../../../domain/usecases/platform/CheckPermissionUseCase'
import { replaceToNextScreen } from '../../../utils/navigation/NavigationUtil'

const LOG_TAG = Constants.LOG.BT_UI_LOG

const NEXT_SCREEN = Constants.SCREEN.HOME_BOTTOM_TAB_SCREEN
const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME

const BluetoothContainer = ({ navigation }) => {

    /**
     * usecases.
     */
    const {
        executeBleModuleUseCase,
        executeStartScanUseCase
    } = ConnectBleUseCase()

    const { executeBluetoothPermissionUseCase } = CheckPermissionUseCase()

    /**
     * state management variables to change UI according to Bluetooth operation state change
     */
    const bleDeviceFound = useRecoilValue(bleDeviceFoundAtom)
    const bleConnectionState = useRecoilValue(bleConnectionStateAtom)
    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)

    /**
     * start scanning the ble device.
     */
    startScan = () => {
        executeStartScanUseCase().catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by executeStartScanUseCase")
        })
    }

    /**
     * check if bluetooth related permission are granted, execute ble module
     * and start scanning if all previous steps are passed successfully.
     */
    startScenario = () => {
        executeBluetoothPermissionUseCase((accepted) => {
            if (accepted) {
                logDebug(LOG_TAG, "<<< bluetooth related permissions are granted")
                executeBleModuleUseCase().then(() => {
                    this.startScan()

                }).catch((e) => {
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
            logDebug(LOG_TAG, "<<< bleConnectionCompleteState: " + bleConnectionCompleteState + ", go to home screen")
            replaceToNextScreen(navigation, NEXT_SCREEN, NAVIGATION_NO_DELAY_TIME)

        } else {
            this.startScenario()
        }
        return () => { }

        // Refs. the code in useLayoutEffect will not work if you don't write the variable or method used here.
    }, [bleConnectionCompleteState, replaceToNextScreen])

    return (
        <BluetoothComponent
            bleDeviceFound={bleDeviceFound}
            bleConnectionState={bleConnectionState}
            bleConnectionCompleteState={bleConnectionCompleteState}
        />
    )
}
export default BluetoothContainer