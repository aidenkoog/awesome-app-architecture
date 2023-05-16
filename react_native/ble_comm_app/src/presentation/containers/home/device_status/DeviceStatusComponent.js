import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Colors, Strings } from '../../../../utils/theme'
import { BottomPopup, HeaderWithBack } from '../../../components'
import moment from 'moment'
import { HEALTH_GRAPH_TYPE, HEALTH_TYPE } from "../../../../utils/Constants"
import { formatYYYYMMDD } from "../../../../utils/time"
import ChartFooter from "../../../components/device_status/ChartFooter"
import FilterRange from "../../../components/device_status/FilterRange"
import DateSelect from "../../../components/device_status/DateSelect"
import HealthGraph from "../../../components/device_status/HealthGraph"
import BottomPickerMonthYear from '../../../components/device_status/BottomPickerMonthYear'
import BottomDatePickerPopup from '../../../components/BottomDatePickerPopup'

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function DeviceStatusComponent(props) {

    /**
     * props delivered from DeviceStatusContainer.
     */
    const {
        onPressHeaderBackIcon, onChangeType, onChangeDate, onSetIsShowPopupDate, loading,
        type, arrayChart, arrayHRChart, arrayHRAvgChart, avgHr, arraySleepChart, arraySleepDataChart,
        healthType, isShowPopupDate, date, title, headerTitle
    } = props

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBack
                title={headerTitle}
                onPressHeaderBackIcon={onPressHeaderBackIcon} />

            <FilterRange type={type} onChangeType={onChangeType} />

            <DateSelect type={type} title={title} date={date}
                onChangeDate={(number, type) => onChangeDate(number, type)}
                onPressDate={() => onSetIsShowPopupDate(true)} />

            <HealthGraph
                loading={loading}
                healthType={healthType}
                type={type}
                arrayStepChart={arrayChart}
                arrayHRChart={arrayHRChart}
                arrayHRAvgChart={arrayHRAvgChart}
                avgHr={avgHr}
                arraySleepChart={arraySleepChart}
                arraySleepDataChart={arraySleepDataChart} />

            {healthType === HEALTH_TYPE.SLEEP && <ChartFooter />}

            <BottomPopup visible={
                isShowPopupDate
                && (type === HEALTH_GRAPH_TYPE.WEEK || type === HEALTH_GRAPH_TYPE.DAY)
            }
                onRequestClose={() => onSetIsShowPopupDate(false)}>

                <View style={styles.popupView}>
                    <BottomDatePickerPopup
                        selectedWeek={type === HEALTH_GRAPH_TYPE.WEEK ? formatYYYYMMDD(date) : null}
                        selectedDay={type === HEALTH_GRAPH_TYPE.WEEK ?
                            formatYYYYMMDD(moment(date).endOf('week')) : formatYYYYMMDD(date)}
                        maxDate={formatYYYYMMDD()}
                        onSave={(date) => this.onChangeDate(date, type)}
                        onClose={() => onSetIsShowPopupDate(false)}
                    />
                </View>
            </BottomPopup>
            <BottomPopup visible={isShowPopupDate
                && !(type === HEALTH_GRAPH_TYPE.WEEK || type === HEALTH_GRAPH_TYPE.DAY)}
                onRequestClose={() => onSetIsShowPopupDate(false)}>
                <View style={styles.bottomView}>
                    <BottomPickerMonthYear
                        type={type}
                        date={date}
                        onClose={() => onSetIsShowPopupDate(false)}
                        onSave={(date) => onChangeDate(date, type)}
                    />
                </View>
            </BottomPopup>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.athensGray
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 10
    },
    popupView: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
})