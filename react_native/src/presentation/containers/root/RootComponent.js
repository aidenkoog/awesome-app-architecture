import { View, Text } from "react-native"
import styles from "../../stylesheets/StyleSet"


/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function RootComponent() {
    return (
        <View style={styles.root_container}>
            <Text style={styles.root_text}>Aiden Koo's Page</Text>
        </View>
    )
}