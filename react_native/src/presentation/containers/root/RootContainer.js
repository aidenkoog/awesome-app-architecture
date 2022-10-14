import { useEffect, useRef } from "react"
import { AppState, View, Text } from "react-native"
import styles from "../../stylesheets/StyleSet"
import Constants from "../../../constants/Constants"
import NavigationService from '../../../core/services/navigation/NavigationService'
import AppNavigator from "../../../core/services/navigation/AppNavigator"

function RootContainer() {

    /* appState (useRef) is not changed even though rendering is executed again. */
    const appState = useRef(AppState.currentState);

    /* detect current app state change */
    const onHandleAppStateChange = nextAppState => {
        console.log("root", 'appState nextAppState'
            + ' current: ', appState.current, ", next: ", nextAppState)
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === Constants.ROOT.APP_ACTIVE
        ) {
            console.log("root", 'app has come to the foreground!')
        }
        if (
            appState.current.match(/inactive|active/) &&
            nextAppState === Constants.ROOT.APP_BACKGROUND
        ) {
            console.log("root", 'app has come to the background!')
        }
        appState.current = nextAppState
    }

    useEffect(() => {
        /* when component is mounted */
        console.log("root", "component is mounted!")
        AppState.addEventListener(Constants.ROOT.APP_EVENT_TYPE, onHandleAppStateChange)

        /* when component is unmounted */
        return () => {
            console.log("root", "component is unmounted !!!")
            AppState.removeEventListener(Constants.ROOT.APP_EVENT_TYPE, onHandleAppStateChange);
        }
    }, [])

    return (
        <View style={styles.root_container}>
            <AppNavigator>
                ref={(navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}
            </AppNavigator>
        </View>
    )
}
export default RootContainer;
