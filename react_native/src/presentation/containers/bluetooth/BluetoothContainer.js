import { useLayoutEffect } from 'react'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/ConnectBleUseCase'
import Constants from '../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import BluetoothComponent from './BluetoothComponent'
import { bleDeviceFoundAtom, bleConnectionStateAtom, bleConnectionCompleteStateAtom } from '../../../data'
import { useRecoilValue } from 'recoil'
import CheckPermissionUseCase from '../../../domain/usecases/platform/CheckPermissionUseCase'

const LOG_TAG = Constants.LOG.BT_UI_LOG
const NEXT_SCREEN = Constants.SCREEN.HOME

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
            navigation.navigate(NEXT_SCREEN)

        } else {
            this.startScenario()
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