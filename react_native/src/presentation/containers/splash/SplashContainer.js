import SplashComponent from './SplashComponent'
import { useLayoutEffect } from 'react'
import ControlAppStateUseCase from '../../../domain/usecases/common/ControlAppStateUseCase'
import Constants from '../../../utils/Constants'

const SPLASH_LOADING_TIME = Constants.SPLASH.SPLASH_LOADING_DELAY_TIME
const NEXT_SCREEN = Constants.SCREEN.PROFILE

/**
 * splash screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const SplashContainer = ({ navigation }) => {

    const { executeAddAppStateHandlerUseCase } = ControlAppStateUseCase()

    useLayoutEffect(() => {
        executeAddAppStateHandlerUseCase()
        setTimeout(() => {
            navigation.navigate(NEXT_SCREEN)

        }, SPLASH_LOADING_TIME)
    })

    return (
        <SplashComponent />
    )
}
export default SplashContainer