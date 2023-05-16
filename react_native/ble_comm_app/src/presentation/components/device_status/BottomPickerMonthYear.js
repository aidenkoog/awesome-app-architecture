import moment from 'moment'
import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import ScrollPicker from '../ScrollWheelPicker'
import { HEALTH_GRAPH_TYPE } from '../../../utils/Constants'
import { Colors, Fonts, Images, Metrics, Strings } from '../../../utils/theme'

const itemWidth = (Metrics.screenWidth - 20) / 3
const localeLanguage = moment.localeData(Strings.getLanguage())

const BottomPickerMonthYear = ({ type, onClose, onSave, date }) => {

    const [selectMonth, setSelectMonth] = useState(moment(date).month())
    const [selectYear, setSelectYear] = useState(moment(date).year())

    const onDone = () => {
        let data = date
        data = moment(data).month(selectMonth)
        data = moment(data).year(selectYear)
        onSave(data)
    }

    const renderMonthItem = ({ item, index }) => {
        let isSelected = selectMonth === index
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectMonth(index)
                }}>
                <View
                    style={{
                        height: itemWidth / 2.5,
                        width: itemWidth,
                        borderColor: isSelected ? Colors.bottomPick : Colors.borderColorEdit,
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: 'center',
                        padding: 5
                    }}>
                    <Text
                        adjustsFontSizeToFit={true}
                        style={{
                            fontSize: 19,
                            fontFamily: Fonts.family.Regular,
                            color: isSelected ? Colors.bottomPick : Colors.black,
                            textAlign: 'center'
                        }}>
                        {item}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    const renderYear = (data, index, isSelected) => {
        return (
            <View
                style={{
                    width: Metrics.screenWidth,
                    justifyContent: "center",
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingRight: 10,
                }}>
                <Text
                    adjustsFontSizeToFit={true}
                    style={{
                        fontSize: 22,
                        fontFamily: isSelected ? Fonts.family.Medium : Fonts.family.Regular,
                        color: isSelected ? Colors.black : Colors.coolGrey,
                    }}>
                    {data}
                </Text>
            </View>
        )
    }

    const isDisable = false
    return (
        <View
            style={{
                minHeight: itemWidth / 3.6 + 20 + 60,
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
                minHeight: 60
            }}>
                <TouchableOpacity onPress={() => { onClose() }}>
                    <Image source={Images.iconArrowLeft}
                        style={{
                            width: 24,
                            height: 24
                        }} />
                </TouchableOpacity>
                <TouchableOpacity disabled={isDisable} style={{ justifyContent: 'center' }}
                    onPress={() => { onDone(); onClose() }}>
                    <Text
                        style={{
                            fontFamily: Fonts.family.Medium,
                            fontSize: 20,
                            color: isDisable ? Colors.lightPeriwinkle : Colors.blue
                        }}>{Strings.common.done}</Text>
                </TouchableOpacity>
            </View>

            {type === HEALTH_GRAPH_TYPE.MONTH && <FlatList
                style={{ marginBottom: 20 }}
                data={localeLanguage.monthsShort()}
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={item => item.toString()}
                renderItem={renderMonthItem}
            />}
            <View style={{ flexDirection: 'row', alignItems: 'center', height: itemWidth / 2.5 * 5 }} >

                <ScrollPicker
                    dataSource={[...Array(10).keys()].map(e => moment().subtract(e, 'years').format('l'))}
                    selectedIndex={moment().year() - selectYear}
                    renderItem={renderYear}
                    onValueChange={(value, index) => {
                        setSelectYear(moment(value, 'l').year())
                    }}
                    wrapperHeight={itemWidth / 2.5 * 4}
                    wrapperColor={Colors.white}
                    itemHeight={itemWidth / 2.5}
                    highlightColor={Colors.borderColorEdit}
                    highlightBorderWidth={itemWidth / 5}
                />
            </View>
        </View>
    )
}

export default BottomPickerMonthYear