import SplashComponent from './SplashComponent'
import { useLayoutEffect } from 'react'
import ControlAppStateUseCase from '../../../domain/usecases/common/ControlAppStateUseCase'
import Constants from '../../../utils/Constants'
import { getBleDeviceName, getBleDeviceMacAddress } from '../../../utils/storage/StorageUtil'
import { logDebug } from '../../../utils/logger/Logger'
import { navigateToNextScreen, replaceToNextScreen } from '../../../utils/navigation/NavigationUtil'

const LOG_TAG = Constants.LOG.SPLASH_UI_LOG

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
     * usecase function for add handler that is able to detect app's state.
     */
    const { executeAddAppStateHandlerUseCase } = ControlAppStateUseCase()

    useLayoutEffect(() => {
        executeAddAppStateHandlerUseCase()

        getBleDeviceName().then((deviceName) => {
            logDebug(LOG_TAG, "<<< cachedBleDeviceName: " + deviceName)
            if (deviceName == null) {
                replaceToNextScreen(navigation, NEXT_SCREEN, SPLASH_LOADING_TIME, NAVIGATION_PURPOSE)

            } else {
                getBleDeviceMacAddress().then((macAddress) => {
                    logDebug(LOG_TAG, "<<< cachedBleMacAddress: " + macAddress)
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