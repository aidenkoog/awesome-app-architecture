import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Colors, Fonts, Metrics, Strings } from '../../../utils/theme'
import { HEALTH_GRAPH_TYPE } from "../../../utils/Constants"

const strings = Strings.chart

class FilterRange extends Component {

    title = (type) => {
        switch (type) {
            case HEALTH_GRAPH_TYPE.DAY:
                return strings.day
            case HEALTH_GRAPH_TYPE.WEEK:
                return strings.week
            case HEALTH_GRAPH_TYPE.MONTH:
                return strings.month
            default:
                return strings.year
        }
    }

    render() {
        const { onChangeType, type } = this.props
        return (
            <View style={styles.dateBar} >
                {[
                    HEALTH_GRAPH_TYPE.DAY, HEALTH_GRAPH_TYPE.WEEK,
                    HEALTH_GRAPH_TYPE.MONTH, HEALTH_GRAPH_TYPE.YEAR].map((e) => {
                        let isSelected = (type === e)
                        return <TouchableOpacity
                            key={e}
                            onPress={() => onChangeType(e)}
                            style={{
                                ...styles.dateBarButton,
                                backgroundColor: isSelected ? Colors.white : Colors.grayTopBar,
                                borderWidth: isSelected ? 1.5 : 0,
                            }}>
                            <Text style={{
                                ...styles.dateBarText,
                                color: isSelected ? Colors.bottomPick : Colors.slateGrey
                            }} >{this.title(e)}</Text>
                        </TouchableOpacity>
                    })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dateBar: {
        height: 42,
        borderRadius: 22.5,
        width: Metrics.screenWidth - 24,
        marginHorizontal: 12,
        backgroundColor: Colors.grayTopBar,
        flexDirection: 'row',
        shadowColor: "rgba(157, 162, 167, 0.6)",
        shadowOffset: {
            width: 0,
            height: 1.25
        },
        shadowRadius: 1,
        shadowOpacity: 1,
        opacity: 0.9
    },
    dateBarButton: {
        flex: 1,
        borderRadius: 22.5,
        backgroundColor: Colors.white,
        borderWidth: 1.5,
        borderColor: Colors.coral,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateBarText: {
        fontFamily: Fonts.family.Medium,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: Colors.bottomPick
    },
    dateTitle: {
        width: 190,
        fontFamily: Fonts.family.Medium,
        fontSize: 24,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: Colors.darkGrey,
        marginHorizontal: 10,

    },
})

export default FilterRange