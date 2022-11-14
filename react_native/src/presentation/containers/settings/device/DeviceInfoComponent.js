import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, LoaderWrapper } from "react-native"
import { Colors, Fonts, Images, Strings } from "../../../../utils/theme"
import { HeaderWithBack, Loading, TextButton } from "../../../components"
import _ from "lodash"

const ABOUT_WATCH_STRING = Strings.aboutwatch

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function DeviceInfoComponent(props) {

    /**
     * props delivered from DeviceInfoContainer.
     */
    const {
        loading, deviceName, iccid, onHandleDisconnectDevice, onPressHeaderBackIcon, onPressSoftwareUpdate,
        latest, firmwareInfo
    } = props

    const ItemInfor = ({ name, value }) => (
        <View style={styles.rowContainer}>
            <View style={styles.rowItem}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <View style={styles.border} />
        </View>
    )

    const ItemUpdate = ({ isLatest = true }) => (
        <View style={styles.rowContainer}>
            <TouchableOpacity
                style={styles.rowItem}
                onPress={onPressSoftwareUpdate}
            >
                <Text style={styles.name}>{ABOUT_WATCH_STRING.watchUpdate}</Text>
                <View style={{ flexDirection: "row" }}>
                    {isLatest ? <View /> : <Image source={Images.icNew} style={styles.imageNew} />}
                    <Image source={Images.btnArrowRight} style={styles.image} />
                </View>
            </TouchableOpacity>
            <View style={styles.border} />
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingTop: 8 }}>
                    <HeaderWithBack onPressHeaderBackIcon={onPressHeaderBackIcon} title={ABOUT_WATCH_STRING.title} />
                    <ItemUpdate isLatest={latest} firmwareInfo={firmwareInfo} />
                    <View style={{ height: 15 }} />
                    <ItemInfor name={ABOUT_WATCH_STRING.imei} value={deviceName} />
                    <ItemInfor name={ABOUT_WATCH_STRING.icc_id} value={iccid} />
                    <View style={{ height: 25 }} />
                    <View style={{ height: 25 }} />
                    <TextButton
                        onClick={onHandleDisconnectDevice}
                        style={{
                            backgroundColor: Colors.white,
                            color: Colors.red,
                            height: 60,
                            borderRadius: 0,
                        }}
                    >
                        {ABOUT_WATCH_STRING.disconnection}
                    </TextButton>
                </View>
                <ScrollView></ScrollView>
                {(loading) && (<LoaderWrapper>
                    <Loading />
                </LoaderWrapper>)}
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
    rowContainer: {
        backgroundColor: Colors.white,
    },
    rowItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    name: {
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.regular,
        color: Colors.darkGrey,
    },
    value: { color: Colors.slateGrey, fontSize: 18, fontFamily: Fonts.family.Regular },
    border: {
        height: 1,
        backgroundColor: Colors.borderColorDateTime,
        marginLeft: 20,
    },
    imageNew: { width: 20, height: 20, alignSelf: "center" },
    image: { height: 24, width: 24 },
})