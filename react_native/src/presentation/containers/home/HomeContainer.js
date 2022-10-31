import HomeComponent from './HomeComponent'
import Constants from '../../../utils/Constants'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/ConnectBleUseCase'
import {
    bleDeviceFoundAtom, bleConnectionStateAtom, bleConnectionCompleteStateAtom, bleScanningStateAtom
} from '../../../data'
import { useRecoilValue } from 'recoil'

const LOG_TAG = Constants.LOG.HOME_UI_LOG

const HomeContainer = ({ navigation }) => {

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

    return (
        <HomeComponent
            bleScanningState={bleScanningState}
            bleDeviceFound={bleDeviceFound}
            bleConnectionState={bleConnectionState}
            bleConnectionCompleteState={bleConnectionCompleteState}
        />
    )
}
export default HomeContainer