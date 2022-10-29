import { useLayoutEffect } from 'react'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/ConnectBleUseCase'
import Constants from '../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import { checkBluetoothPermission } from '../../../utils/permission/PermissionUtil'
import BluetoothComponent from './BluetoothComponent'
import { bleDeviceFoundAtom, bleConnectionStateAtom, bleConnectionCompleteStateAtom } from '../../../data'
import { useRecoilValue } from 'recoil'

const LOG_TAG = Constants.LOG.BT_UI_LOG
const NEXT_SCREEN = Constants.SCREEN.HOME

const BluetoothContainer = ({ navigation }) => {

    /**
     * usecase functions for connecting to ble device.
     */
    const [
        executeBleModuleUseCase,
        executeStartScanUseCase
    ] = ConnectBleUseCase()

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
     * execute logic before finishing ui rendering on the screen.
     * this is used to prevent the flickering of the UI due to data change.
     */
    useLayoutEffect(() => {
        if (bleConnectionCompleteState) {
            navigation.navigate(NEXT_SCREEN)
        } else {
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
            bleDeviceFound={bleDeviceFound}
            bleConnectionState={bleConnectionState}
            bleConnectionCompleteState={bleConnectionCompleteState}
        />
    )
}
export default BluetoothContainer