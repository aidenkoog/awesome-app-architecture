import { useLayoutEffect, useEffect } from 'react'
import Constants from '../../../../utils/Constants'
import { useIsFocused } from '@react-navigation/native'
import { replaceToNextScreen } from '../../../../utils/navigation/NavigationUtil'
import HiddenSplashComponent from './HiddenSplashComponent'

/**
 * next screen information.
 */
const NEXT_SCREEN = Constants.SCREEN.HIDDEN.HOME
const NAVIGATION_PURPOSE = Constants.NAVIGATION.PURPOSE.NORMAL
const NAVIGATION_DELAY_TIME = 2500

/**
 * hidden splash screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const HiddenSplashContainer = ({ navigation }) => {

    /**
     * check if current screen is focused or not.
     */
    const isScreenFocused = useIsFocused()

    /**
     * execute logic when screen is focused.
     */
    useEffect(() => {
        if (isScreenFocused) {
            replaceToNextScreen(navigation, NEXT_SCREEN, NAVIGATION_DELAY_TIME, NAVIGATION_PURPOSE)
        }

    }, [isScreenFocused])

    /**
     * execute logic before finishing ui rendering on the screen.
     * this is used to prevent the flickering of the UI due to data change.
     */
    useLayoutEffect(() => {
    }, [navigation])

    return (
        <HiddenSplashComponent />
    )
}
export default HiddenSplashContainer