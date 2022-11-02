import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import Constants from "../../../utils/Constants"
import { Colors, Fonts } from "../../../utils/theme"
import { logDebug } from "../../../utils/logger/Logger"
import { Container } from "../../components"
import HomeCardComponent from "./HomeCardComponent"
const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function HomeComponent(props) {

    const { isDeviceRegistered } = props
    logDebug(LOG_TAG, ">>> isDeviceRegistered: " + isDeviceRegistered)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Container style={{ backgroundColor: "#ffff66", marginTop: 10.7, margin: 9, }}>
                <HomeCardComponent bgColor="#ffff44" isDeviceRegistered={isDeviceRegistered} />
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 2,
    },
    title: {
        fontSize: 32,
    },
    editView: {
        width: 76,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E1E1E6",
        marginBottom: 50,
        marginRight: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    orderBtn: {
        width: 24,
        height: 24,
        margin: 10,
        marginBottom: 30,
    },
    addBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.lightishBlue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    addView: {
        height: 80,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.borderColorDateTime,
        shadowColor: Colors.borderColorDateTime,
        margin: 5,
        elevation: 4,
        shadowOpacity: 2,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    editText: {
        fontFamily: Fonts.family.Medium,
        fontSize: 20,
        color: Colors.darkGrey,
    },
});
