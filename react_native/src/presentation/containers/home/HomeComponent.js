import { SafeAreaView, StyleSheet } from "react-native"
import Constants from "../../../utils/Constants"
import { logDebug } from "../../../utils/logger/Logger"
import { Container } from "../../components"
import HomeCardComponent from "./HomeCardComponent"
const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function HomeComponent(props) {

    /**
     * props delivered from HomeContainer.
     */
    const {
        isDeviceRegistered, bleConnectionCompleteState, bleDeviceBatteryLevel, refreshedTime,
        onPressCardItem, onPressRefreshArea
    } = props

    /**
     * monitor states.
     */
    logDebug(LOG_TAG, ">>> isDeviceRegistered: " + isDeviceRegistered)
    logDebug(LOG_TAG, ">>> bleConnectionCompleteState: " + bleConnectionCompleteState)
    logDebug(LOG_TAG, ">>> bleDeviceBatteryLevel: " + bleDeviceBatteryLevel)

    return (
        <SafeAreaView style={styles.homeSafeAreaStyle}>
            <Container style={styles.homeContainerStyle}>
                <HomeCardComponent
                    isDeviceRegistered={isDeviceRegistered}
                    bleConnectionCompleteState={bleConnectionCompleteState}
                    bleDeviceBatteryLevel={bleDeviceBatteryLevel}
                    refreshedTime={refreshedTime}
                    onPressCardItem={onPressCardItem}
                    onPressRefreshArea={onPressRefreshArea}
                />
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeSafeAreaStyle: {
        flex: 1,
        backgroundColor: "#f2f2f6"
    },
    homeContainerStyle: {
        marginTop: 10.7,
        margin: 9,
        backgroundColor: "#f2f2f6"
    }
})