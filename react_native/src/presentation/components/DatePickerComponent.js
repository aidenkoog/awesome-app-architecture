import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { Colors, Metrics, Images, Fonts, Strings } from '../../utils/theme'

export default class DatePickerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: this.props.date,
            timestamp: this.props.timestamp,
            stringDate: ''
        }
    }

    setDate(selectedDate) {
        this.setState({
            date: selectedDate
        })
    }

    onDone() {
        const { onChange, onClose } = this.props
        const { date, timestamp } = this.state
        onChange(date, timestamp)
        onClose()
    }

    render() {
        const { onClose, maximumDate = new Date(), mode = 'date' } = this.props
        const { date } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ width: 24, height: 60, justifyContent: 'center' }} onPress={() => { onClose() }}>
                        <View style={{ width: 24, height: 24, alignSelf: 'center' }} >
                            <Image source={Images.iconArrowLeft} style={{ width: 24, height: 24 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 120, justifyContent: 'center' }} onPress={this.onDone.bind(this)}>
                        <Text style={styles.textButton}>{Strings.common.done}</Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    style={{ height: 240 }}
                    date={date}
                    onDateChange={this.setDate.bind(this)}
                    textColor={Colors.darkGrey}
                    mode={mode}
                    dateFormat="yyyy-MM-dd"
                    locale={Strings.getLanguage()}
                    maximumDate={maximumDate}
                    timeZoneOffsetInMinutes={this.props.timeZoneOffset}
                />
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: Colors.white
    },
    header: {
        alignSelf: 'stretch',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: Colors.borderColorDateTime,
        borderBottomWidth: 1
    },
    textButton: {
        fontFamily: Fonts.family.Bold,
        fontSize: Fonts.size.h3,
        color: Colors.lightishBlue,
        textAlign: 'right'
    }
})