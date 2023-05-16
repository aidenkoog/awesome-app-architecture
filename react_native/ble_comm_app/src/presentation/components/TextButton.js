import { Colors, Fonts } from '../../utils/theme'
import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

class TextButton extends Component {
  render() {
    const { selected, onClick, children, style = {}, disabled = false, longPress, progress = null } = this.props
    const {
      flex = 0,
      height = 55,
      color = Colors.white,
      selectedColor = Colors.white,
      borderRadius = 4,
      borderWidth = 0,
      fontSize = 20,
      lineHeight = 24,
      borderColor = Colors.borderColor,
      fontFamily = Fonts.poppinsFamily.Medium,
      selectedFontFamily = Fonts.poppinsFamily.Bold,
      backgroundColor = Colors.coral,
      backgroundColorDisable = Colors.lightPeriwinkle,
      colorDisable = Colors.coolGrey,
      elevation = 3,
      marginLeft = 0,
      marginRight = 0,
      shadowOpacity = 0.35,
      ...others
    } = style
    const percentage = progress + "%"
    return (
      <TouchableOpacity
        style={{ height, flex, alignSelf: 'stretch' }}
        onPress={onClick}
        onLongPress={() => { longPress && longPress() }}
        disabled={disabled}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: borderWidth,
            borderRadius,
            borderColor,
            backgroundColor: (disabled || progress) ? backgroundColorDisable : backgroundColor,
            shadowColor: disabled ? backgroundColorDisable : 'rgba(250, 82, 82, 0.35)',
            shadowOpacity: shadowOpacity,
            shadowOffset: { width: 2, height: 2 },
            flex: 1,
            elevation: disabled ? 0 : elevation,
            marginLeft: marginLeft,
            marginRight: marginRight
          }}
        >
          {progress && <View style={{
            height: '100%', width: percentage, backgroundColor: backgroundColor,
            alignSelf: 'stretch', borderRadius, borderColor, borderWidth
          }} />}
          <View style={{
            height: '100%', width: "100%", justifyContent: 'center', alignItems: 'center', position: 'absolute'
          }}>
            <Text
              style={{
                fontFamily: selected ? selectedFontFamily : fontFamily,
                fontSize,
                lineHeight,
                color: disabled ? (progress ? color : colorDisable) : color,
                ...others,
              }}
            >
              {children}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default TextButton
