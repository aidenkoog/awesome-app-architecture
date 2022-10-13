import { useState } from "react"
import { AppState } from "react-native"
import styles from "../../stylesheets/styles"

function RootContainer() {

    // component mount state
    const [isComponentMount, setIsComponentMount] = useState(false)

    // app state
    const [appState, setAppState] = useState(AppState.currentState)

    useLayoutEffect(() => {
        /* when component is mounted */
        setIsComponentMount(true)
        this.appStateListener = AppState.addEventListener("change", nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === "active") {
                console.log("foreground!")
            } else {
                console.log("background!")
            }
            if (isComponentMount) {
                setAppState(nextAppState)
            }
        })
        /* when component is unmounted */
        return () => {
            setIsComponentMount(false)
            if (appStateListener) {
                appStateListener.remove()
            }
        }
    }, [])

    return (
        <View style={styles} />
    )
}

export default RootContainer