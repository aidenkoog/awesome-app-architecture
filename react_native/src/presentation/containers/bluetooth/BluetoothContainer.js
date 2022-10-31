import { useEffect } from 'react'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/ConnectBleUseCase'
import Constants from '../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import { checkBluetoothPermission } from '../../../utils/permission/PermissionUtil'
import BluetoothComponent from './BluetoothComponent'
import {
    bleDeviceFoundAtom, bleConnectionStateAtom, bleConnectionCompleteStateAtom, bleScanningStateAtom, bleAuthResultAtom
} from '../../../data'
import { useRecoilValue } from 'recoil'


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
    const bleScanningState = useRecoilValue(bleScanningStateAtom)
    const bleDeviceFound = useRecoilValue(bleDeviceFoundAtom)
    const bleConnectionState = useRecoilValue(bleConnectionStateAtom)
    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)
    const bleAuthResultState = useRecoilValue(bleAuthResultAtom)

    /**
     * start scanning the ble device.
     */
    startScan = () => {
        executeStartScanUseCase().catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by executeStartScanUseCase")
        })
    }

    /**
     * move to home screen.
     */
    onMoveNextScreen = () => {
        logDebug(LOG_TAG, "<<< move to home screen")
        navigation.navigate(NEXT_SCREEN)
    }

    /**
     * explaination. execute logic before finishing ui rendering on the screen.
     * this is used to prevent the flickering of the UI due to data change.
     */
    useEffect(() => {
        logDebug(LOG_TAG, "<<< useEffect is executed")
        if (bleConnectionCompleteState) {
            logDebug(LOG_TAG, "<<<*********************************************")
            navigation.navigate(NEXT_SCREEN)
        }
        if (!bleScanningState && !bleDeviceFound && !bleConnectionState && !bleConnectionCompleteState) {
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
    }, [])

    return (
        <BluetoothComponent
            onMoveNextScreen={onMoveNextScreen}
            bleAuthResultState={bleAuthResultState}
            bleScanningState={bleScanningState}
            bleDeviceFound={bleDeviceFound}
            bleConnectionState={bleConnectionState}
            bleConnectionCompleteState={bleConnectionCompleteState}
        />
    )
}
export default BluetoothContainer