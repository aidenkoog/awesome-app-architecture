import SplashComponent from './SplashComponent'
import { useLayoutEffect } from 'react'
import ControlAppStateUseCase from '../../../domain/usecases/common/ControlAppStateUseCase'
import Constants from '../../../utils/Constants'
import { getBleDeviceInfo } from '../../../utils/storage/StorageUtil'
import { logDebug } from '../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.SPLASH_UI_LOG

/**
 * next screen information.
 */
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

    useLayoutEffect(() => {
        executeAddAppStateHandlerUseCase()

        getBleDeviceInfo((bleDeviceInfo) => {
            logDebug(LOG_TAG, "<<< bleDeviceInfo: "
                + bleDeviceInfo.cachedBleDeviceName + ", "
                + bleDeviceInfo.cachedBleMacAddress)
            navigation.navigate(bleDeviceInfo == null ? NEXT_SCREEN : NEXT_SCREEN_BY_SAVED_BLE_DATA)
        })
    })

    return (
        <SplashComponent />
    )
}
export default SplashContainer