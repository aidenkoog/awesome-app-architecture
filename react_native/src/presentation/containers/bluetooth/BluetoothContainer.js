import { useEffect } from 'react'
import Constants from '../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import { checkBluetoothPermission } from '../../../utils/permission/PermissionUtil'
import BluetoothComponent from './BluetoothComponent'
import { bleConnectionStateAtom, bleConnectionCompleteStateAtom, bleAuthResultAtom } from '../../../data'
import { useRecoilValue } from 'recoil'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/basic/ConnectBleUseCase'
import { replaceToNextScreen } from '../../../utils/navigation/NavigationUtil'
import { storeIsDeviceRegistered } from '../../../utils/storage/StorageUtil'
import RequestAuthUseCase from '../../../domain/usecases/bluetooth/feature/authentication/RequestAuthUseCase'

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
     * usecase functions for connecting to ble device.
     */
    const {
        executeBleModuleUseCase,
        executeStartScanUseCase
    } = ConnectBleUseCase()

    /**
     * usecase function for authenticating device, user after completing the ble connection.
     */
    const { executeRequestAuthUseCase } = RequestAuthUseCase()

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
            logDebug(LOG_TAG, "<<< ble authentication about device, user is completed well, go to home screen")
            if (purposeWhat == NAVIGATION_PURPOSE_ADD_DEVICE) {
                logDebug(LOG_TAG, "<<< terminate ble connection screen")
                navigation.pop()

            } else {
                replaceToNextScreen(navigation, NEXT_SCREEN, NAVIGATION_NO_DELAY_TIME, NAVIGATION_PURPOSE_NORMAL)
            }
            return
        }

        if (bleConnectionCompleteState) {
            logDebug(LOG_TAG, "<<< all of ble connection jobs is completed.")
            storeIsDeviceRegistered(true).then(() => {
                executeRequestAuthUseCase().catch((e) => {
                    outputErrorLog(LOG_TAG, "<<< " + e + ", failed to authenticate device, user")
                })

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by storeIsDeviceRegistered !!!")
            })
        }

        if (!bleConnectionState) {
            logDebug(LOG_TAG, "<<< bleConnectionState: " + bleConnectionState + ", try scanning ble device")
            checkBluetoothPermission((accepted) => {
                if (accepted) {
                    executeBleModuleUseCase().then(() => {
                        this.startScan()

                    }).catch((e) => {
                        outputErrorLog(LOG_TAG, e + " occurred by executeBleModuleUseCase !!!")
                    })
                }
            })
        }
        return () => { }
    }, [
        navigation, bleConnectionCompleteState, bleConnectionState
    ])

    return (
        <BluetoothComponent
            bleConnectionState={bleConnectionState}
            bleConnectionCompleteState={bleConnectionCompleteState}
        />
    )
}
export default BluetoothContainer