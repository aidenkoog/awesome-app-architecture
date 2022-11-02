import { useEffect } from 'react'
import Constants from '../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import { checkBluetoothPermission } from '../../../utils/permission/PermissionUtil'
import BluetoothComponent from './BluetoothComponent'
import { bleConnectionStateAtom, bleConnectionCompleteStateAtom } from '../../../data'
import { useRecoilValue } from 'recoil'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/basic/ConnectBleUseCase'
import { navigateToNextScreen } from '../../../utils/navigation/NavigationUtil'


const LOG_TAG = Constants.LOG.BT_UI_LOG

/**
 * next screen information.
 */
const NEXT_SCREEN = Constants.SCREEN.HOME

/**
 * bluetooth screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const BluetoothContainer = ({ navigation }) => {

    /**
     * usecase functions for connecting to ble device.
     */
    const {
        executeBleModuleUseCase,
        executeStartScanUseCase
    } = ConnectBleUseCase()

    /**
     * state management variables to change UI according to Bluetooth operation state change
     */
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
     * explaination. execute logic before finishing ui rendering on the screen.
     * this is used to prevent the flickering of the UI due to data change.
     */
    useEffect(() => {
        if (bleConnectionCompleteState) {
            logDebug(LOG_TAG, "<<< all of ble connection jobs is completed. go to home screen")
            navigateToNextScreen(navigation, NEXT_SCREEN, 0, true)
        }

        if (!bleConnectionState) {
            logDebug(LOG_TAG, "<<< bleConnectionState: " + bleConnectionState + ", try scanning ble device")
            checkBluetoothPermission((accepted) => {
                if (accepted) {
                    executeBleModuleUseCase().then(() => {
                        this.startScan()

                    }).catch((e) => {
                        outputErrorLog(LOG_TAG, e + " occurred by executeBleModuleUseCase")
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