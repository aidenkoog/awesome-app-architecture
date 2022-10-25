import { View, Text } from "react-native"
import Constants from "../../../utils/Constants"
import { logDebug } from "../../../utils/Logger"
import styles from "../../stylesheets/StyleSet"

const LOG_TAG = Constants.LOG.ROOT_UI_LOG

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function RootComponent(props) {
    const { scanningState } = props
    logDebug(LOG_TAG, "scanningState: " + scanningState)

    const rootTextMessage = "Scanning State: " + scanningState

    return (
        <View style={styles.root_container}>
            <Text style={styles.root_text}>Aiden Koo's Page</Text>
            <Text style={styles.root_text}>{rootTextMessage}</Text>
        </View>
    )
}