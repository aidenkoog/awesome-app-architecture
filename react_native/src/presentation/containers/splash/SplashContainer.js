import SplashComponent from './SplashComponent'
import { useLayoutEffect } from 'react'
import ControlAppStateUseCase from '../../../domain/usecases/common/ControlAppStateUseCase'
import Constants from '../../../utils/Constants'
import { getBleDeviceName, getBleDeviceMacAddress } from '../../../utils/storage/StorageUtil'
import { logDebug } from '../../../utils/logger/Logger'
import { navigateToNextScreen } from '../../../utils/navigation/NavigationUtil'

const LOG_TAG = Constants.LOG.SPLASH_UI_LOG

/**
 * next screen information.
 */
const NEXT_SCREEN = Constants.SCREEN.PROFILE
const NEXT_SCREEN_BY_SAVED_BLE_DATA = Constants.SCREEN.BLUETOOTH
const SPLASH_LOADING_TIME = Constants.SPLASH.SPLASH_LOADING_TIME

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

    useLayoutEffect(() => {
        executeAddAppStateHandlerUseCase()

        getBleDeviceName().then((deviceName) => {
            logDebug(LOG_TAG, "<<< cachedBleDeviceName: " + deviceName)
            if (deviceName == null) {
                navigateToNextScreen(navigation, NEXT_SCREEN, SPLASH_LOADING_TIME)

            } else {
                getBleDeviceMacAddress().then((macAddress) => {
                    logDebug(LOG_TAG, "<<< cachedBleMacAddress: " + macAddress)
                    navigateToNextScreen(
                        navigation,
                        macAddress == null ? NEXT_SCREEN : NEXT_SCREEN_BY_SAVED_BLE_DATA,
                        SPLASH_LOADING_TIME
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