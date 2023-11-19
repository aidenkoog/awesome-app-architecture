import ControlAppStateUseCase from '../../../domain/usecases/common/ControlAppStateUseCase'
import { replaceToNextScreen } from '../../../utils/navigation/NavigationUtil'
import SplashComponent from './SplashComponent'
import { useLayoutEffect, useEffect } from 'react'
import Constants from '../../../utils/Constants'

/**
 * next screen information.
 */
const NEXT_SCREEN = Constants.SCREEN.BLUETOOTH
const SPLASH_LOADING_TIME = Constants.SPLASH.SPLASH_LOADING_TIME
const NAVIGATION_PURPOSE = Constants.NAVIGATION.PURPOSE.NORMAL

/**
 * splash screen.
 * @param {any} navigation 
 * @return {JSX.Element}
 */
const SplashContainer = ({ navigation }: any): JSX.Element => {

    /* usecases. */
    const { executeAddAppStateHandlerUseCase } = ControlAppStateUseCase()

    useLayoutEffect(() => {
        /** 
         * start to monitor the state of app. 
         * check if the app state is currently on background or foreground.
         */
        executeAddAppStateHandlerUseCase()

    }, [])

    useEffect(() => {
        /* move to next screen after 2 seconds. (SPLASH_LOADING_TIME) */
        replaceToNextScreen(
            navigation, NEXT_SCREEN, SPLASH_LOADING_TIME, NAVIGATION_PURPOSE
        )

    }, [navigation])

    return (
        <SplashComponent />
    )
}
export default SplashContainer