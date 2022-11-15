import Constants from "../../../../utils/Constants"
import { logDebug } from "../../../../utils/logger/Logger"
import { navigateToNextScreen } from "../../../../utils/navigation/NavigationUtil"
import HiddenHomeComponent from "./HiddenHomeComponent"

const LOG_TAG = Constants.LOG.HOME_UI_LOG

const HIDDEN_BLUETOOTH_SCREEN = Constants.SCREEN.HIDDEN.BLUETOOTH
const HIDDEN_COMMON_SCREEN = Constants.SCREEN.HIDDEN.COMMON
const HIDDEN_PLATFORM_SCREEN = Constants.SCREEN.HIDDEN.PLATFORM
const HIDDEN_SERVER_SCREEN = Constants.SCREEN.HIDDEN.SERVER

const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME
const NAVIGATION_PURPOSE_NORMAL = Constants.NAVIGATION.PURPOSE.NORMAL

/**
 * hidden home main screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
function HiddenHomeContainer({ navigation }) {

    /**
     * navigate screen corresponding to screen route parameter.
     */
    navigateScreen = (screen) => {
        navigateToNextScreen(
            navigation,
            screen,
            NAVIGATION_NO_DELAY_TIME,
            NAVIGATION_PURPOSE_NORMAL)
    }

    /**
     * handle event occurred when pressing test case tile.
     */
    onPressTestCategory = (itemId) => {
        logDebug(LOG_TAG, "<<< pressed category item id: " + itemId)

        switch (itemId) {
            case "t1":
                this.navigateScreen(HIDDEN_BLUETOOTH_SCREEN)
                break
            case "t2":
                this.navigateScreen(HIDDEN_PLATFORM_SCREEN)
                break
            case "t3":
                this.navigateScreen(HIDDEN_COMMON_SCREEN)
                break
            case "t4":
                this.navigateScreen(HIDDEN_SERVER_SCREEN)
                break
        }
    }

    return (
        <HiddenHomeComponent
            onPressTestCategory={onPressTestCategory}
        />
    )
}

export default HiddenHomeContainer
