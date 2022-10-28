import { Colors, Fonts } from '../../utils/theme'
import React, { Component } from 'react'
import { TextInput, View, Text, Platform } from 'react-native'

import _ from 'lodash'

export default class PrimaryTextInput extends Component {
  constructor(props) {
    super(props)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.blur = this.blur.bind(this)
    this.clear = this.clear.bind(this)
    this.state = {
      focused: false,
      text: this.props.text,
      error: undefined,
      stamp: undefined,
      secureTextEntry: props.password
    }
  }

  onChangeText(text) {
    const { editable = true, onChange } = this.props
    if (onChange) {
      onChange(text)
    }
    if (editable) {
      this.setState({
        text,
      })
    }
  }

  blur() {
    this.textInput.blur()
  }

  onFocus() {
    this.setState({
      focused: true,
      error: undefined,
      stamp: new Date().getTime()
    })
  }

  onBlur() {
    const { checkOnBlur = false } = this.props
    this.setState({
      focused: true,
    }, () => checkOnBlur && this.validate())
  }

  clear() {
    this.textInput.clear()
    this.setState({
      text: '',
      error: undefined
    })
  }

  validate(text) {
    const {
      validate = () => {
      }
    } = this.props
    const error = validate(text || this.state.text)
    if (error) {
      this.setState({
        error,
        secureTextEntry: false,
        focused: false
      })
      return false
    } else {
      return true
    }
  }

  getValue = () => {
    const { text } = this.state
    return text
  }

  flipSecurityText = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }

  render() {
    const {
      style = {},
      placeholder = '',
      checkOnSubmit = false,
      focusable = true,
      editable = true,
      // Icon,
      password = false,
      maxLength = undefined,
      menuHidden = false,
      typeInput = 'default',
      textContentType = 'none',
      font = Fonts.family.Medium,
      unit = undefined,
      textInputStyle = {},
      styleTextUnit = {},
      text,
      secureTextEntry,
      fontSize = 18,
      multiline = false,
      autoFocus = false
    } = this.props
    const {
      errorColor = Colors.coral,
      backgroundColor = Colors.white,
      paddingHorizontal = 0,
      fontFamily = font,
      color = Colors.coolGrey,
      selectedColor = '#000000',
      underlineColorAndroid = Colors.transparent,
      textAlign = 'left',
      ...containerStyles
    } = style
    const { focused, error } = this.state
    return (
      <View removeClippedSubviews={menuHidden}
        style={{
          ...containerStyles,
          paddingHorizontal,
          backgroundColor,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
        <TextInput
          ref={(ref) => this.textInput = ref}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          onChangeText={this.onChangeText}
          onSubmitEditing={({ nativeEvent: { text } }) => checkOnSubmit && this.validate(text)}
          placeholder={placeholder}
          returnKeyType='done'
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          underlineColorAndroid={underlineColorAndroid}
          focused={focused}
          secureTextEntry={secureTextEntry}
          selectionColor={Colors.lightBlueGrey}
          keyboardType={typeInput}
          textContentType={textContentType}
          numberOfLines={1}
          style={{
            flex: unit ? undefined : 1,
            fontSize: fontSize,
            fontFamily: fontFamily,
            textAlign: textAlign,
            color: selectedColor,
            padding: 0,
            minWidth: 45,
            includeFontPadding: false,
            ...textInputStyle,
          }}
          placeholderTextColor={color}
          value={_.isString(error) ? error : text}
          editable={editable}
          selectTextOnFocus={focusable}
          maxLength={maxLength}
          contextMenuHidden={menuHidden}
          multiline={multiline}
          blurOnSubmit={true}
          autoFocus={autoFocus}
        />
        {unit && this.state.text?.length > 0 && <Text style={{ ...styleTextUnit, fontFamily: Fonts.family.Medium, fontSize: 17, color: Colors.slateGrey, marginLeft: Platform.OS === 'ios' ? 0 : 4 }}>{unit}</Text>}
      </View>
    )
  }
}
