import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Colors, Fonts, Metrics } from "../../../utils/theme"
import RowItem from "../../../presentation/components/RowItem"
import _ from 'lodash'

const MY_PROFILE_STRING = "My profile"
const DEVICE = "Device"

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function SettingsComponent(props) {

    /**
     * props delivered from SettingsContainer.
     */
    const { onPressMyProfileMenu, onPressDeviceMenu } = props

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f6" }}>
            <View style={{ ...styles.container, backgroundColor: "#f2f2f6" }}>
                <Text style={styles.header}>{"Setup"}</Text>
                <ScrollView>
                    <View style={styles.col1}>
                        <RowItem
                            title={MY_PROFILE_STRING}
                            onPress={onPressMyProfileMenu}
                        />
                        <View style={styles.borderView} />
                        <RowItem
                            title={DEVICE}
                            onPress={onPressDeviceMenu}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
    phoneText: {
        color: Colors.cobalt,
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.regular,
    },
    fieldText: {
        flex: 3,
        color: Colors.darkGrey,
        fontSize: 16
    },
    nameText: {
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.h3,
    },
    col1: {
        backgroundColor: Colors.white,
        marginTop: 20,
    },
    col2: {
        backgroundColor: Colors.white,
        height: 120,
        marginTop: 20,
    },
    profileRow: {
        flexDirection: "row",
        height: 106,
        backgroundColor: Colors.white,
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 13,
        marginTop: 18,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        fontSize: 28,
        color: Colors.darkGrey,
        fontFamily: Fonts.family.Bold,
    },
    item: {
        height: 60,
        paddingLeft: 20,
        paddingRight: 13,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 20,
    },
    textItem: {
        fontFamily: Fonts.family.Bold,
        fontSize: Fonts.size.regular,
        color: Colors.darkGrey,
    },
    imageItem: {
        height: 24,
        width: 24,
        alignSelf: "center",
    },
    buttonItem: {
        justifyContent: "center",
        height: 40,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 64 / 2
    },
    borderView: {
        backgroundColor: Colors.borderColorDateTime,
        height: 1,
        marginLeft: 20,
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22 + Metrics.screenPaddingTop,
    },
})