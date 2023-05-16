import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors, Fonts, Images } from "../../utils/theme"
import React from "react"
import { Component } from "react/cjs/react.production.min"


class RowItem extends Component {
    render() {
        const { title, onPress, disabled = false } = this.props
        return (
            <TouchableOpacity onPress={() => disabled ? null : onPress()}>
                <View style={styles.item}>
                    <Text style={disabled ? { ...styles.textItem, color: Colors.coolGrey } : styles.textItem}>{title}</Text>
                    <Image source={Images.btnArrowRight} style={styles.imageItem} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default RowItem

const styles = StyleSheet.create({
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
    }
})