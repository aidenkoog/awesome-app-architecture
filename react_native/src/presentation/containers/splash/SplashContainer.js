import SplashComponent from './SplashComponent'
import { useLayoutEffect } from 'react'
import ControlAppStateUseCase from '../../../domain/usecases/common/ControlAppStateUseCase'
import Constants from '../../../utils/Constants'
import { replaceToNextScreen } from '../../../utils/navigation/NavigationUtil'
import GetBleDeviceInfoUseCase from '../../../domain/usecases/bluetooth/feature/device/GetBleDeviceInfoUseCase'

/**
 * next screen information.
 */
const NEXT_SCREEN = Constants.SCREEN.PROFILE
const NEXT_SCREEN_BY_SAVED_BLE_DATA = Constants.SCREEN.BLUETOOTH
const SPLASH_LOADING_TIME = Constants.SPLASH.SPLASH_LOADING_TIME

const NAVIGATION_PURPOSE = Constants.NAVIGATION.PURPOSE.NORMAL

/**
 * splash screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const SplashContainer = ({ navigation }) => {

    /**
     * usecases.
     */
    const {
        executeGetBleDeviceNameUseCase,
        executeGetBleDeviceMacAddressUseCase
    } = GetBleDeviceInfoUseCase()

    const { executeAddAppStateHandlerUseCase } = ControlAppStateUseCase()

    useLayoutEffect(() => {
        executeAddAppStateHandlerUseCase()

        executeGetBleDeviceNameUseCase().then((deviceName) => {
            if (deviceName == null) {
                replaceToNextScreen(navigation, NEXT_SCREEN, SPLASH_LOADING_TIME, NAVIGATION_PURPOSE)

            } else {
                executeGetBleDeviceMacAddressUseCase().then((macAddress) => {
                    replaceToNextScreen(
                        navigation,
                        macAddress == null ? NEXT_SCREEN : NEXT_SCREEN_BY_SAVED_BLE_DATA,
                        SPLASH_LOADING_TIME,
                        NAVIGATION_PURPOSE
                    )
                })
            }
        })
    }, [navigation])

    return (
        <SplashComponent />
    )
}
export default SplashContainer