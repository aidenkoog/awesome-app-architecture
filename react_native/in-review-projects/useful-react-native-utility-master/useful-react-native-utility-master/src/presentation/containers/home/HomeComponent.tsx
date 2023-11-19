import { View, Text, StyleSheet } from "react-native"

const WELCOME_MESSAGE = "Hello World! This is Home Screen AidenKooG!"

/**
 * component ui that is used in container.
 * @return {JSX.Element}
 */
export default function HomeComponent(): JSX.Element {

    return (
        <View style={styles.container}>
            <Text style={styles.home__welcome__text}>
                {WELCOME_MESSAGE}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    home__arrow_up: {
        margin: 10,
        color: "#495867",
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold"
    },
    home__welcome__text: {
        color: "#000000",
        margin: 10,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold"
    }
})