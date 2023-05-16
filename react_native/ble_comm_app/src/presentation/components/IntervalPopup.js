import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Metrics, Colors, Fonts, Images } from '../../utils/theme'
import Icon from "react-native-vector-icons/Feather"

class IntervalPopup extends Component {
    render() {
        const { onClose, dataSource, value } = this.props
        return <View style={styles.scrollableModal}>
            <TouchableOpacity
                onPress={onClose}>
                <View style={styles.closeView}>
                    <Image style={styles.closeImage} source={Images.icClose} />
                </View>
            </TouchableOpacity>

            <View style={styles.list}>
                {dataSource.map((item) => {
                    let color = value === item.mode ? Colors.blue : Colors.darkGrey
                    let isSelected = value === item.mode
                    return (
                        <View key={item.mode}>
                            <TouchableOpacity
                                onPress={item.onPress}>
                                <View style={styles.row}>
                                    {isSelected && <Icon name='check' size={24} color={Colors.blue} />}
                                    <Text style={{ ...styles.text, color: color, marginHorizontal: 5 }}>{item.value}</Text>
                                    {isSelected && <View style={{ width: 24 }} />}
                                </View>
                                <View style={styles.underline} />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollableModal: {
        height: 350,
        width: Metrics.screenWidth
    },
    list: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1
    },
    closeImage: {
        width: 24,
        height: 24,
    },
    closeView: {
        width: 40,
        height: 40,
        backgroundColor: Colors.black,
        // opacity: 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 5,
        borderRadius: 20
    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.family.Medium,
        color: Colors.darkGrey
    },
    underline: {
        backgroundColor: Colors.paleGrey,
        height: 1
    },
    row: {
        minHeight: 55,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default IntervalPopup