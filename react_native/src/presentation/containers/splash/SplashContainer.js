import SplashComponent from './SplashComponent'
import { useLayoutEffect } from 'react'
import ControlAppStateUseCase from '../../../domain/usecases/common/ControlAppStateUseCase'
import Constants from '../../../utils/Constants'
import ConnectBleUseCase from '../../../domain/usecases/bluetooth/ConnectBleUseCase'

const SPLASH_LOADING_TIME = Constants.SPLASH.SPLASH_LOADING_DELAY_TIME
const NEXT_SCREEN = Constants.SCREEN.PROFILE
const NEXT_SCREEN_BY_SAVED_BLE_DATA = Constants.SCREEN.BLUETOOTH

/**
 * splash screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const SplashContainer = ({ navigation }) => {

    /**
     * usecase function for add handler that is able to detect app's state.
     */
    const { executeAddAppStateHandlerUseCase } = ControlAppStateUseCase()

    /**
     * usecase function for getting ble device information, device name and mac address (or uuid)
     */
    const { executeGetBleDeviceInfo } = ConnectBleUseCase()

    useLayoutEffect(() => {
        executeAddAppStateHandlerUseCase()
        const bleDeviceInfo = executeGetBleDeviceInfo()
        
        setTimeout(() => {
            navigation.navigate(bleDeviceInfo == null ? NEXT_SCREEN : NEXT_SCREEN_BY_SAVED_BLE_DATA)

        }, SPLASH_LOADING_TIME)
    })

    return (
        <SplashComponent />
    )
}
export default SplashContainer