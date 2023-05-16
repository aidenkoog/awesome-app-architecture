import React, { Component } from "react"
import { Colors, Fonts, Metrics, Strings } from "../../../utils/theme"
import { Text, View } from "react-native"

const Item = ({ title, color }) => {
    return <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <View style={{
            width: 12,
            height: 12,
            borderRadius: 2,
            marginRight: 8,
            backgroundColor: color
        }} />
        <Text style={{
            fontFamily: Fonts.robotoFamily.Regular,
            fontSize: 16,
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            color: Colors.charcoalGreyTwo
        }} >{title}</Text>
    </View>
}

export default class ChartFooter extends Component {
    render() {
        return <View style={{
            flexDirection: 'row', width: Metrics.screenWidth - 24, marginHorizontal: 12, marginVertical: 18
        }}>
            <Item title={Strings.chart.awake} color={"#dc2f4b"} />
            <Item title={Strings.chart.motion} color={"#ffd92c"} />
            <Item title={Strings.chart.noMotion} color={"#ff9800"} />
        </View>
    }
}