import { View, Text, Image, TouchableWithoutFeedback, Keyboard, } from "react-native"
import QRCodeScanner from "react-native-qrcode-scanner"
import { Metrics, Strings, Fonts, Colors, Images } from "../../../utils/theme"
import { Touchable, PrimaryTextInput, TextButton, } from "../../components"
import { SafeAreaView } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const strings = Strings.scanQR
const numberKeyboard = Platform.OS === "ios" ? "number-pad" : "phone-pad"

const SCREEN_HEIGHT = Metrics.screenHeight
const SCREEN_WIDTH = Metrics.screenWidth
const OVERLAY_COLOR = Colors.athensGray

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function QrScanComponent(props) {

    /**
     * props delivered from QrScanContainer.
     */
    const {
        inputValue, isDisable, onQrScanSuccess, onPressBackIcon, setSquare, scanner,
        setBottomHeight, bottomHeight, square, updateState, onNotNowPressed
    } = props

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <QRCodeScanner
                showMarker
                onRead={(e) => onQrScanSuccess(e.data)}
                ref={(node) => { scanner.current = node }}
                cameraStyle={{ height: SCREEN_HEIGHT }}
                customMarker={
                    <SafeAreaView style={styles.rectangleContainer}>

                        <View style={styles.header}>
                            <Touchable onPress={onPressBackIcon}>
                                <View style={{ justifyContent: "center", width: 70, height: 70, alignItems: "center", }}>
                                    <Image
                                        style={{ width: 24, height: 24, tintColor: Colors.darkGrey, }}
                                        source={Images.iconArrowLeft} />
                                </View>
                            </Touchable>
                            <Text style={styles.titleScreenText}>{strings.titleScreen}</Text>
                        </View>

                        <KeyboardAwareScrollView
                            onLayout={(event) => setBottomHeight(event.nativeEvent.layout.height)}
                            extraScrollHeight={40}
                            keyboardShouldPersistTaps="handled"
                            style={{ flex: 1, }}>

                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={{ ...styles.bottomOverlay, minHeight: bottomHeight - 20, }}>

                                    <View style={styles.topOverlay}>
                                        <Text style={{ fontSize: 22, color: Colors.darkGrey, textAlign: "center", }}>
                                            {strings.title}
                                        </Text>
                                    </View>

                                    <View
                                        onLayout={(event) => setSquare(event.nativeEvent.layout.height)}
                                        style={{ flexDirection: "row", flex: 1 }}>
                                        <View style={{ ...styles.rectangle, height: square, width: square, }} />
                                    </View>

                                    <View style={{ ...styles.topOverlay, padding: 10 }} />

                                    <View style={styles.containerContent}>
                                        <Text
                                            style={{
                                                fontFamily: Fonts.family.Regular,
                                                paddingTop: 0,
                                                fontSize: 24,
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                lineHeight: 34,
                                                letterSpacing: 0,
                                                textAlign: "center",
                                                color: Colors.titlePopupText,
                                            }}>
                                            {strings.buttonCannotBeRead}
                                        </Text>

                                        <PrimaryTextInput
                                            textInputStyle={{
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                            style={{
                                                underlineColorAndroid: Colors.transparent,
                                                backgroundColor: Colors.transparent,
                                                selectedColor: Colors.darkGrey,
                                                justifyContent: "flex-end",
                                                borderBottomWidth: 3,
                                                borderBottomColor: Colors.darkGreyTwo,
                                                textAlign: "center",
                                            }}
                                            placeholder={strings.enterWatchId}
                                            text={inputValue}
                                            onChange={(text) => updateState(text)}
                                            typeInput={numberKeyboard}
                                            maxLength={15} />

                                        <Text style={styles.sub}>{strings.subDigital}</Text>
                                    </View>

                                    <View style={styles.buttonBottomView}>
                                        <TextButton
                                            style={{
                                                backgroundColor: Colors.white,
                                                borderWidth: 1,
                                                borderColor: Colors.coral,
                                                color: Colors.bottomPick,
                                                marginTop: 10,
                                            }}
                                            onClick={() => { onNotNowPressed() }}>
                                            {Strings.common.notNow}
                                        </TextButton>

                                        <View style={{ height: 10 }} />

                                        <TextButton
                                            disabled={isDisable}
                                            style={{
                                                backgroundColor: Colors.coral,
                                                borderWidth: 0,
                                                color: Colors.white,
                                                marginTop: 10,
                                            }}
                                            onClick={() => { onQrScanSuccess(inputValue) }}>
                                            {Strings.common.next}
                                        </TextButton>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAwareScrollView>
                    </SafeAreaView>
                }
            />
        </SafeAreaView>
    )
}

const styles = {
    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.transparent,
    },
    rectangleTopLeft: {
        height: 40,
        width: 40,
        backgroundColor: Colors.transparent,
    },
    rectangleTopRight: {
        height: 40,
        width: 40,
        backgroundColor: Colors.transparent,
    },
    rectangleBottomLeft: {
        height: 40,
        width: 40,
        backgroundColor: Colors.transparent,
    },
    rectangleBottomRight: {
        height: 40,
        width: 40,
        backgroundColor: Colors.transparent,
    },
    rectangle: {
        backgroundColor: Colors.transparent,
    },
    header: {
        width: SCREEN_WIDTH,
        backgroundColor: OVERLAY_COLOR,
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 70,
        alignItems: "center",
    },
    topOverlay: {
        width: SCREEN_WIDTH,
        backgroundColor: OVERLAY_COLOR,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
    },
    containerContent: {
        width: SCREEN_WIDTH,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: OVERLAY_COLOR,
    },
    message: {
        fontFamily: Fonts.family.Regular,
        fontSize: 24,
        color: Colors.darkGrey,
        marginBottom: 22,
    },
    sub: {
        fontFamily: Fonts.family.Regular,
        fontSize: 18,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0,
        color: Colors.coral,
        paddingTop: 15,
        textAlign: "center",
    },
    buttonBottomView: {
        paddingBottom: 20,
        backgroundColor: OVERLAY_COLOR,
        width: SCREEN_WIDTH,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomOverlay: {
        width: SCREEN_WIDTH,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
    },
    leftAndRightOverlay: {
        backgroundColor: OVERLAY_COLOR,
    },
    titleScreenText: {
        fontFamily: Fonts.family.Medium,
        fontSize: 22,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        color: Colors.darkGrey,
    },
}