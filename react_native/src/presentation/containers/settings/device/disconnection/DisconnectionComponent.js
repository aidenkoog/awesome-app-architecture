import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Colors, Fonts, Strings } from "../../../../../utils/theme"
import { HeaderWithBack, Loading, Popup, TextButton, LoaderWrapper } from "../../../../components"

export const ABOUT_WATCH_STRING = Strings.aboutwatch

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function DisconnectionComponent(props) {

    /**
     * props delivered from DisconnectionContainer.
     */
    const {
        onPressHeaderBackIcon, onClickCancelButton, onClickDisconnectButton, popupOneButtonMessage,
        onCancelPopup, onClickOkPopup, loading, isDisplayPopupTwoButton, isDisplayPopupOneButton
    } = props

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <HeaderWithBack
                    onPressHeaderBackIcon={onPressHeaderBackIcon}
                    title={ABOUT_WATCH_STRING.disconnectionTitle}
                />
                <View style={styles.viewContent}>
                    <ScrollView style={{ marginBottom: 20 }}>
                        <Text style={styles.messsage}>{ABOUT_WATCH_STRING.disconnectionMessage}</Text>
                    </ScrollView>
                    <View style={styles.buttons}>
                        <TextButton style={styles.cancel} onClick={onClickCancelButton}>
                            {Strings.common.cancel}
                        </TextButton>
                        <TextButton style={styles.delete} onClick={onClickDisconnectButton}>
                            {ABOUT_WATCH_STRING.disconnection}
                        </TextButton>
                    </View>
                </View>

                <Popup.TwoButtons
                    visible={isDisplayPopupTwoButton}
                    title={ABOUT_WATCH_STRING.popup.title}
                    content={ABOUT_WATCH_STRING.popup.messageWarning}
                    okText={Strings.common.disconnect}
                    onClose={onCancelPopup}
                    onClickOk={onClickOkPopup}
                    onClickCancel={onCancelPopup}
                />

                <Popup.OneButton
                    visible={isDisplayPopupOneButton}
                    title={ABOUT_WATCH_STRING.popup.title}
                    content={popupOneButtonMessage}
                    onClickConfirm={onClickOkPopup}
                />
            </View>

            {loading && (<LoaderWrapper>
                <Loading />
            </LoaderWrapper>)}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
    cancel: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.coolGrey,
        color: Colors.darkGrey,
    },
    delete: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.red,
        color: Colors.red,
    },
    buttons: {
        marginBottom: 26,
        justifyContent: "space-between",
        height: 124,
    },
    messsage: {
        color: Colors.darkGrey,
        fontFamily: Fonts.family.Regular,
        fontSize: Fonts.size.regular,
    },
    viewContent: {
        justifyContent: "space-between",
        marginTop: 40,
        paddingHorizontal: 20,
        flexDirection: "column",
        flex: 1,
    },
})