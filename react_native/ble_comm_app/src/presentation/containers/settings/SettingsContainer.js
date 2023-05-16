import Constants from "../../../utils/Constants"
import { navigateToNextScreen } from "../../../utils/navigation/NavigationUtil"
import SettingsComponent from "./SettingsComponent"
import { BackHandler } from 'react-native'
import { useLayoutEffect } from "react"

const MY_PROFILE_SCREEN = Constants.SCREEN.EDIT_PROFILE
const DEVICE_INFO_SCREEN = Constants.SCREEN.DEVICE_INFO

const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME


/**
 * settings main screen.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
const SettingsContainer = ({ navigation }) => {

    /**
     * handle back button click event. (android)
     * @returns {boolean}
     */
    const handleBackButtonClick = () => {
        handleNavigationPop()
        return false
    }

    /**
     * handle navigation's pop operation.
     */
    handleNavigationPop = () => {
        this.enableBackHandler(false)
    }

    /**
     * enable or disable back handler.
     */
    enableBackHandler = (enabled) => {
        if (enabled) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
        } else {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
        }
    }

    /**
     * executed logic before ui rendering and painting.
     */
    useLayoutEffect(() => {
        this.enableBackHandler(true)
    }, [])

    /**
     * My profile menu.
     */
    onPressMyProfileMenu = () => {
        navigateToNextScreen(navigation, MY_PROFILE_SCREEN, NAVIGATION_NO_DELAY_TIME)
    }

    /**
     * device information menu.
     */
    onPressDeviceMenu = () => {
        navigateToNextScreen(navigation, DEVICE_INFO_SCREEN, NAVIGATION_NO_DELAY_TIME)
    }

    return (
        <SettingsComponent
            onPressMyProfileMenu={onPressMyProfileMenu}
            onPressDeviceMenu={onPressDeviceMenu}
        />
    )
}
export default SettingsContainer