import { View, Text, Image, StyleSheet } from "react-native"
import Constants from "../../../utils/Constants"
import { logDebug } from "../../../utils/logger/Logger"
import { Colors, Images, Fonts, Strings } from "../../../utils/theme"

const PulseComponent = require("react-native-pulse").default

/**
 * BT searching title and content message.
 */
const BT_SEARCHING_TITLE = Strings.bluetooth.searching
const BT_SEARCHING_CONTENT = Strings.bluetooth.searching_content

/**
 * BT connecting title and content message.
 */
const BT_CONNECTING_TITLE = Strings.bluetooth.connecting
const BT_CONNECTING_CONTENT = Strings.bluetooth.connecting_content

const LOG_TAG = Constants.LOG.BT_UI_LOG

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function BluetoothComponent(props) {

    /**
     * props delivered from BluetoothContainer.
     */
    const { bleConnectionState, bleConnectionCompleteState } = props

    /**
     * monitoring recoil atom's state.
     */
    logDebug(LOG_TAG, "<<< bleConnectionState: " + bleConnectionState)
    logDebug(LOG_TAG, "<<< bleConnectionCompleteState: " + bleConnectionCompleteState)

    return (
        <View style={{ backgroundColor: Colors.backgroundBtConnectionGuide, flex: 1 }}>
            {/* title and content description text about ble searching... or connecting... */}
            <View>
                <Text style={styles.titleText}>
                    {bleConnectionState || bleConnectionCompleteState ? BT_CONNECTING_TITLE : BT_SEARCHING_TITLE}
                </Text>
                <Text style={styles.contentText}>
                    {bleConnectionState || bleConnectionCompleteState ? BT_CONNECTING_CONTENT : BT_SEARCHING_CONTENT}
                </Text>
            </View>

            {/* overlay circled shape ui positioned in center */}
            <View style={styles.circleShape}>
                <View style={styles.innerCircleShape}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <Image
                            resizeMode="contain"
                            style={{ width: 124, height: 174 }}
                            source={Images.icBand}
                        />
                        <PulseComponent
                            color="#f9fbff"
                            numPulses={3}
                            diameter={500}
                            speed={10}
                            duration={500}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        marginTop: 197,
        alignSelf: "center",
        color: "#1e2124",
        fontSize: 26,
        fontFamily: Fonts.family.Bold,
    },
    contentText: {
        marginTop: 17,
        color: "#64696e",
        fontSize: 18,
        alignSelf: "center",
    },
    circleShape: {
        backgroundColor: "#f3dad8",
        width: 284,
        marginTop: 64,
        alignSelf: "center",
        height: 284,
        borderRadius: 1000,
    },
    innerCircleShape: {
        backgroundColor: "#f4aea9",
        width: 212,
        marginTop: 36,
        alignSelf: "center",
        height: 212,
        borderRadius: 1000,
    },
});