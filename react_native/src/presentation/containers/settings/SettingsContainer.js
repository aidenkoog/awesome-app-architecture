import Constants from "../../../utils/Constants"
import { navigateToNextScreen } from "../../../utils/navigation/NavigationUtil"
import SettingsComponent from "./SettingsComponent"

const MY_PROFILE_SCREEN = Constants.SCREEN.EDIT_PROFILE
const HR_MONITORING_SCREEN = Constants.SCREEN.HR_MONITORING
const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME

const SettingsContainer = ({ navigation }) => {

    onPressMyProfileMenu = () => {
        navigateToNextScreen(navigation, MY_PROFILE_SCREEN, NAVIGATION_NO_DELAY_TIME)
    }

    onPressHrMonitoringMenu = () => {
        navigateToNextScreen(navigation, HR_MONITORING_SCREEN, NAVIGATION_NO_DELAY_TIME)
    }

    onPressDeviceMenu = () => {

    }

    return (
        <SettingsComponent
            onPressMyProfileMenu={onPressMyProfileMenu}
            onPressHrMonitoringMenu={onPressHrMonitoringMenu}
            onPressDeviceMenu={onPressDeviceMenu}
        />
    )
}
export default SettingsContainer