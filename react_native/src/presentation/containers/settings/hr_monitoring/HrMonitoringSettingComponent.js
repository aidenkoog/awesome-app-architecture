import { Colors, Fonts, Strings } from "../../../../utils/theme"
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { BottomPopup, HeaderWithBack, IntervalPopup } from "../../../components"
import { Switch } from "react-native-switch"
import { IntervalMode } from "../../../../utils/common/CommonUtil"

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
const HrMonitoringSettingComponent = (props) => {

    const {
        monitoringIntervals, intervalMode, intervalVisible,
        onChangeInterval, updateHrMonitor, setIntervalVisible, onPressHeaderBackIcon
    } = props

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={{ paddingTop: 8 }}>
                    <HeaderWithBack onPressHeaderBackIcon={onPressHeaderBackIcon} title={Strings.heartRate.title} />
                </View>

                <ScrollView>
                    <View style={styles.col}>
                        <View style={styles.row1}>
                            <Text
                                style={{
                                    fontFamily: Fonts.family.Medium,
                                    fontSize: Fonts.size.regular,
                                    color: Colors.darkGrey,
                                }}
                            >
                                {Strings.heartRate.monitoring.monitoring}
                            </Text>

                            <Switch
                                circleSize={30}
                                value={monitoringIntervals}
                                backgroundActive={Colors.switch}
                                backgroundInactive={Colors.lightBlueGrey}
                                activeText={""}
                                inActiveText={""}
                                disabled={false}
                                circleActiveColor={Colors.white}
                                circleInActiveColor={Colors.white}
                                onValueChange={(value) => updateHrMonitor(value)}
                                circleBorderWidth={2}
                                innerCircleStyle={{
                                    borderColor: monitoringIntervals
                                        ? (Platform.OS === 'ios' ? Colors.switch : Colors.switch2)
                                        : Colors.lightBlueGrey,
                                }}
                                switchLeftPx={4}
                                switchRightPx={4}
                                switchWidthMultiplier={1.7}
                            />
                        </View>
                        <View style={styles.borderView} />
                    </View>
                </ScrollView>
                {/* {(loading1 || loading2) && (<LoaderWrapper>
                    <Loading />
                </LoaderWrapper>)} */}
                <BottomPopup
                    visible={intervalVisible}
                    onRequestClose={() => {
                        setIntervalVisible(false)
                    }}>
                    <View>
                        <IntervalPopup
                            value={intervalMode}
                            dataSource={[
                                {
                                    value: Strings.heartRate.interval.five,
                                    mode: IntervalMode.Five, onPress: () => onChangeInterval(IntervalMode.Five)
                                },
                                {
                                    value: Strings.heartRate.interval.ten,
                                    mode: IntervalMode.Ten, onPress: () => onChangeInterval(IntervalMode.Ten)
                                },
                                {
                                    value: Strings.heartRate.interval.fifteen,
                                    mode: IntervalMode.Fifteen, onPress: () => onChangeInterval(IntervalMode.Fifteen)
                                },
                                {
                                    value: Strings.heartRate.interval.thirty,
                                    mode: IntervalMode.Thirty, onPress: () => onChangeInterval(IntervalMode.Thirty)
                                },
                                {
                                    value: Strings.heartRate.interval.sixty,
                                    mode: IntervalMode.Sixty, onPress: () => onChangeInterval(IntervalMode.Sixty)
                                },
                            ]}
                            onClose={() => {
                                setIntervalVisible(false)
                            }}
                        />
                    </View>
                </BottomPopup>
            </View>
        </SafeAreaView >
    )
}

export default HrMonitoringSettingComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },

    col: {
        backgroundColor: Colors.white,
        height: 60,
        marginTop: 20,
    },
    col1: {
        backgroundColor: Colors.white,
        height: 120,
        marginTop: 20,
    },
    col2: {
        backgroundColor: Colors.white,
        height: 180,
        marginTop: 20,
    },
    borderView: {
        backgroundColor: Colors.borderColorDateTime,
        height: 1,
        marginLeft: 20,
    },
    row1: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingRight: 3,
        marginLeft: 20,
        marginRight: 20
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
    textItem: {
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.regular,
        color: Colors.darkGrey,
    },
    imageItem: {
        height: 24,
        width: 24,
        alignSelf: "center",
    },
    sensorMode: {
        fontSize: 18,
        color: Colors.slateGrey,
        fontFamily: Fonts.robotoFamily.Regular,
    }
})