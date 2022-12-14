import { View, StyleSheet, Button, Text } from "react-native"

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function PermissionComponent(props) {

    const { onPressOkBtn } = props

    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.textContainer}>Camera</Text>
                <Text style={styles.textContainer}>Storage</Text>
                <Text style={styles.textContainer}>Contact</Text>
                <Text style={styles.textContainer}>Bluetooth</Text>
            </View>
            <View style={styles.btnContainer}>
                <Button title="OK" onPress={onPressOkBtn} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffff',
        flex: 1,
    },
    descriptionContainer: {
        flex: 1,
        padding: 50
    },
    textContainer: {
        marginBottom: 30
    },
    btnContainer: {
    }
})