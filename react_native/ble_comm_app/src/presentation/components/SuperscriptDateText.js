import React from 'react'
import { Text, StyleSheet, View, } from 'react-native'
import { Strings } from '../../utils/theme'

export default function SuperscriptDateText(props) {
    if (/\d/.test(props.children) && Strings.getLanguage() === 'en') {
        const ordinalArray = ['st', 'nd', 'rd', 'th']
        const { textAlign } = props.style
        const justifyContent = textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : textAlign
        if (props.children.includes("-")) {
            return (
                <View style={{ ...props.style, flexDirection: 'row', justifyContent: justifyContent, }}>
                    {Subscript(ordinalArray, props.children.split("-")[0].slice(0, -1), props)}
                    <Text {...props} style={{ ...props.style, ...styles.defaultStyle, }}>{" -"}</Text>
                    {Subscript(ordinalArray, props.children.split("-")[1], props)}
                </View>
            )
        } else {
            return (
                <View style={{ ...props.style, flexDirection: 'row', justifyContent: justifyContent, }}>
                    {Subscript(ordinalArray, props.children, props)}
                </View>
            )
        }
    } else {
        return (
            <Text {...props} style={{ ...props.style, }}>{props.children}</Text>
        )
    }
}

function Subscript(ordinalArray, str, props) {
    let index = 1000
    let ordinal = '   '
    /*** exception case for August ***/
    if (!str.includes('August')) {
        ordinalArray.forEach(e => {
            let i = str.indexOf(e)
            if (i <= index && i !== -1) {
                ordinal = e
            }
        })
    }
    let superscript = str.split(ordinal)
    const { fontSize } = props.style
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text {...props} style={{ ...props.style, ...styles.defaultStyle, }}>{superscript[0]}</Text>
            <Text style={{ ...props.style, ...styles.defaultStyle, fontSize: fontSize ? fontSize / 1.5 : 10 }}>{ordinal}</Text>
            <Text {...props} style={{ ...props.style, ...styles.defaultStyle, }}>{superscript[1]}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        margin: 0,
        padding: 0,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        flex: undefined,
        height: undefined,
        width: undefined,
    }
})