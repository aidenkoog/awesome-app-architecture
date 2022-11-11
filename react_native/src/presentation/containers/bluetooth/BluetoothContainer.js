import { useEffect } from 'react'
import Constants from '../../../utils/Constants'
import { logDebugWithLine, outputErrorLog } from '../../../utils/logger/Logger'
import BluetoothComponent from './BluetoothComponent'
import { bleConnectionStateAtom, bleConnectionCompleteStateAtom, bleAuthResultAtom } from '../../../data'
import { useRecoilValue } from 'recoil'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/basic/ConnectBleUseCase'
import { replaceToNextScreen } from '../../../utils/navigation/NavigationUtil'
import RequestAuthUseCase from '../../../domain/usecases/bluetooth/feature/authentication/RequestAuthUseCase'
import SetDeviceRegistrationUseCase from '../../../domain/usecases/common/SetDeviceRegistrationUseCase'
import CheckPermissionUseCase from '../../../domain/usecases/platform/CheckPermissionUseCase'

const LOG_TAG = Constants.LOG.BT_UI_LOG

const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME
const NAVIGATION_PURPOSE_NORMAL = Constants.NAVIGATION.PURPOSE.NORMAL
const NAVIGATION_PURPOSE_ADD_DEVICE = Constants.NAVIGATION.PURPOSE.ADD_DEVICE

/**
 * next screen information.
 */
const NEXT_SCREEN = Constants.SCREEN.HOME_BOTTOM_TAB_SCREEN

/**
 * bluetooth screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const BluetoothContainer = ({ route, navigation }) => {

    /**
     * load navigation's purpose.
     */
    const { purposeWhat } = route.params

    /**
     * usecases.
     */
    const { executeBleModuleUseCase, executeStartScanUseCase } = ConnectBleUseCase()
    const { executeRequestAuthUseCase } = RequestAuthUseCase()
    const { executeSetDeviceRegistrationUseCase } = SetDeviceRegistrationUseCase()
    const { executeBluetoothPermissionUseCase } = CheckPermissionUseCase()

    /**
     * state management variables to change UI according to Bluetooth operation state change
     * the following atoms is updated in BleRepository.
     */
    const bleConnectionState = useRecoilValue(bleConnectionStateAtom)
    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)
    const bleAuthResult = useRecoilValue(bleAuthResultAtom)

    /**
     * start scanning the ble device.
     */
    startScan = () => {
        executeStartScanUseCase().catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by executeStartScanUseCase")
        })
    }

    /**
     * explaination. execute logic before finishing ui rendering on the screen.
     * this is used to prevent the flickering of the UI due to data change.
     */
    useEffect(() => {
        if (bleAuthResult) {
            logDebugWithLine(LOG_TAG, "<<< ble authentication is succeeded")
            if (purposeWhat == NAVIGATION_PURPOSE_ADD_DEVICE) {
                navigation.pop()

            } else {
                replaceToNextScreen(navigation, NEXT_SCREEN, NAVIGATION_NO_DELAY_TIME, NAVIGATION_PURPOSE_NORMAL)
            }
            return
        }

        if (bleConnectionCompleteState) {
            logDebugWithLine(LOG_TAG, "<<< ble connection jobs are completed")
            executeSetDeviceRegistrationUseCase(true).then(() => {
                executeRequestAuthUseCase().catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeRequestAuthUseCase")
                })

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by executeSetDeviceRegistrationUseCase")
            })
        }

        if (!bleConnectionState) {
            logDebugWithLine(LOG_TAG, "<<< bleConnectionState: " + bleConnectionState + ", try scanning the ble device")
            executeBluetoothPermissionUseCase().then((accepted) => {
                if (accepted) {
                    executeBleModuleUseCase().then(() => {
                        this.startScan()

                    }).catch((e) => {
                        outputErrorLog(LOG_TAG, e + " occurred by executeBleModuleUseCase")
                    })

                } else {
                    outputErrorLog(LOG_TAG, "<<< bluetooth permission is rejected")
                    navigation.pop()
                }
            })
        }
        return () => { }
    }, [
        navigation, bleConnectionCompleteState, bleConnectionState, bleAuthResult
    ])

    return (
        <BluetoothComponent
            bleConnectionState={bleConnectionState}
            bleConnectionCompleteState={bleConnectionCompleteState}
        />
    )
}
export default BluetoothContainer