/* eslint-disable */

import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, Images, Metrics, Strings } from '../../utils/theme'
import moment from 'moment'
import { Calendar } from 'react-native-calendars'
import { formatYYYYMMDD } from "../../utils/time"
import { LocaleConfig } from "react-native-calendars"
import 'moment/locale/ko.js'
import 'moment/locale/vi.js'
import 'moment/locale/ja.js'
import 'moment/locale/de.js'
import 'moment/locale/en-gb.js'

moment.updateLocale('ko', {
    longDateFormat: {
        l: 'YYYY년',
        ll: 'A hh시 mm분',
        LT: 'A h시 mm분',
        LTS: 'YYYY년 MMM Do (ddd) A h시 mm분',
        L: 'MMM Do',
        LL: 'YYYY년 MMM',
        LLL: 'YYYY년 MMM Do',
        LLLL: 'YYYY년 MMM Do (ddd)'
    },
})
moment.updateLocale('ja', {
    longDateFormat: {
        l: 'YYYY年',
        ll: 'Ahh時mm分',
        LT: 'Ah時mm分',
        LTS: 'YYYY年MMMDo(ddd)Ah時mm分',
        L: 'MMMDo',
        LL: 'YYYY年MMM',
        LLL: 'YYYY年MMMDo',
        LLLL: 'YYYY年MMMDo(ddd)'
    },
})
moment.updateLocale('de', {
    longDateFormat: {
        l: 'YYYY',
        ll: 'hh:mm A',
        LT: 'h:mm A',
        LTS: 'YYYY-MM-DD ddd h:mm A',
        L: 'Do MMM',
        LL: 'MMMM YYYY',
        LLL: 'Do MMM YYYY',
        LLLL: 'ddd, Do MMM YYYY'
    },
})
moment.updateLocale('en', {
    longDateFormat: {
        l: 'YYYY',
        ll: 'hh:mm A',
        LT: 'h:mm A',
        LTS: 'YYYY-MM-DD ddd h:mm A',
        L: 'Do MMM',
        LL: 'MMMM YYYY',
        LLL: 'Do MMM YYYY',
        LLLL: 'ddd, Do MMM YYYY'
    },
})
moment.locale(Strings.getLanguage())

const itemWidth = (Metrics.screenWidth - 20) / 7
// LocaleConfig.locales.en = LocaleConfig.locales['']
const localeLanguage = moment.localeData()
LocaleConfig.locales.lc = {
    monthNames: localeLanguage.months(),
    monthNamesShort: localeLanguage.monthsShort(),
    dayNames: localeLanguage.weekdays(),
    dayNamesShort: localeLanguage.weekdaysShort(),
    today: Strings.repeat.today
}
LocaleConfig.defaultLocale = 'lc'

const BottomDatePickerPopup = ({ onClose, selectedDay = new Date(), onSave, maxDate, selectedWeek }) => {

    const cellWidth = itemWidth < 45 ? itemWidth : 45

    const [selectDay, setSelectDay] = useState(selectedDay)
    const [selectWeek, setSelectWeek] = useState(selectedWeek)
    return (
        <View
            style={{
                minHeight: 470,
                width: Metrics.screenWidth,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                paddingTop: 5,
                paddingHorizontal: 10,
                backgroundColor: Colors.white
            }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 60,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderColorDateTime
            }}>
                <TouchableOpacity onPress={() => { onClose() }}>
                    <Image source={Images.icCloseBlack}
                        style={{
                            width: 24,
                            height: 24
                        }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center' }}
                    onPress={() => {
                        onClose(); onSave(!selectedWeek ?
                            formatYYYYMMDD(selectDay) : formatYYYYMMDD(selectWeek))
                    }}>
                    <Text
                        style={{
                            fontFamily: Fonts.family.Medium,
                            fontSize: 20,
                            color: Colors.blue
                        }}>{Strings.common.done}</Text>
                </TouchableOpacity>
            </View>

            <Calendar
                monthFormat={localeLanguage.longDateFormat('LL').replace(/Y/g, 'y')}
                markingType={!selectedWeek ? 'custom' : 'period'}
                current={selectedDay.toString()}
                theme={{
                    'stylesheet.day.basic': {
                        selected: {
                            borderRadius: cellWidth / 2,
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        base: {
                            height: cellWidth,
                            width: cellWidth,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }
                    },
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#000',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: Colors.darkGreyTwo,
                    indicatorColor: 'blue',
                    textDayFontFamily: Fonts.family.Medium,
                    textMonthFontFamily: Fonts.family.Medium,
                    textDayHeaderFontFamily: Fonts.family.Medium,
                    textDayFontWeight: '500',
                    textMonthFontWeight: '500',
                    textDayHeaderFontWeight: '500',
                    textDayFontSize: 19,
                    textMonthFontSize: 22,
                    textDayHeaderFontSize: 13,
                }}
                minDate={maxDate ? null : new Date().toString()}
                maxDate={maxDate ? new Date(maxDate).toString() : null}
                enableSwipeMonths={true}
                renderArrow={(direction) => {
                    if (direction === 'left') {
                        return <Image source={Images.btnNaviNextLeft} style={{ height: 24, width: 24 }} />
                    } else {
                        return <Image source={Images.btnNaviNextRight} style={{ height: 24, width: 24 }} />
                    }
                }}
                onDayPress={(day) => {
                    if (!selectedWeek) {
                        setSelectDay(day.dateString)
                    } else {
                        setSelectWeek(moment(day.dateString).startOf('isoweek').utc())
                    }
                }}
                markedDates={
                    !selectedWeek
                        ? {
                            [selectDay]: {
                                selected: true,
                                disableTouchEvent: true,
                                selectedColor: Colors.borderColorEdit,
                                selectedTextColor: Colors.darkGrey
                            }
                        }
                        :
                        {
                            [formatYYYYMMDD(selectWeek)]: {
                                startingDay: true, color: Colors.borderColorEdit,
                                textColor: Colors.darkGrey, selected: true,
                            },
                            [formatYYYYMMDD(moment(selectWeek).add(1, 'days'))]: {
                                color: Colors.borderColorEdit,
                                selectedTextColor: Colors.darkGrey, textColor: Colors.darkGrey, selected: true,
                            },
                            [formatYYYYMMDD(moment(selectWeek).add(2, 'days'))]: {
                                color: Colors.borderColorEdit,
                                textColor: Colors.darkGrey
                            },
                            [formatYYYYMMDD(moment(selectWeek).add(3, 'days'))]: {
                                color: Colors.borderColorEdit,
                                textColor: Colors.darkGrey
                            },
                            [formatYYYYMMDD(moment(selectWeek).add(4, 'days'))]: {
                                color: Colors.borderColorEdit,
                                textColor: Colors.darkGrey
                            },
                            [formatYYYYMMDD(moment(selectWeek).add(5, 'days'))]: {
                                color: Colors.borderColorEdit,
                                textColor: Colors.darkGrey
                            },
                            [formatYYYYMMDD(moment(selectWeek).add(6, 'days'))]: {
                                endingDay: true,
                                color: Colors.borderColorEdit, textColor: Colors.darkGrey
                            }
                        }
                }
            />
        </View>
    )
}

export default BottomDatePickerPopup