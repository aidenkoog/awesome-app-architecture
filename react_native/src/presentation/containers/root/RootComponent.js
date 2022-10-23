import { View, Text } from "react-native"
import styles from "../../stylesheets/StyleSet"

/**
 * root component ui that is used in root container.
 * @returns {JSX.Element}
 */
export default function RootComponent() {
    return (
        <View style={styles.root_container}>
            <Text>Aiden Koo's Page</Text>
        </View>
    )
}