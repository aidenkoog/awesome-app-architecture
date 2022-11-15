import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Colors, Fonts, Images, Metrics } from '../../../utils/theme'
import { formatYYYYMMDD } from "../../../utils/time"
import moment from "moment"
import { HEALTH_GRAPH_TYPE } from "../../../utils/Constants"
import SuperscriptDateText from '../SuperscriptDateText'

export default class DateSelect extends Component {
    render() {
        const { type, title, date, onChangeDate, onPressDate } = this.props
        return (
            <View style={styles.dateChangeView}>
                <TouchableOpacity style={styles.buttonNavi} onPress={() => onChangeDate(-1, type)}>
                    <Image source={Images.btnArrowLeft} style={styles.imageNavi} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressDate}>
                    <SuperscriptDateText
                        allowFontScaling={false}
                        style={styles.dateTitle} >{title}
                    </SuperscriptDateText>
                </TouchableOpacity>

                {(
                    type === HEALTH_GRAPH_TYPE.WEEK ?
                        formatYYYYMMDD(moment(date).endOf('week')) : formatYYYYMMDD(date)) < formatYYYYMMDD()
                    ? <TouchableOpacity style={styles.buttonNavi} onPress={() => onChangeDate(1, type)}>
                        <Image source={Images.btnArrowRight} style={styles.imageNavi} />
                    </TouchableOpacity>
                    : <View style={{ width: 46, height: 46 }} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dateChangeView: {
        marginTop: 30,
        marginBottom: 18,
        marginHorizontal: 27,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonNavi: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "white",
        shadowColor: "rgba(157, 162, 167, 0.3)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageNavi: {
        width: 24,
        height: 24,
    },
    dateTitle: {
        width: Metrics.screenWidth - 46 * 2 - 40 * 2,
        fontFamily: Fonts.family.Medium,
        fontSize: 22,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: Colors.darkGrey,
        marginHorizontal: 10,
    }
})