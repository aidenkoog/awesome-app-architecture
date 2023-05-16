import moment from 'moment'
import Constants, { HEALTH_GRAPH_TYPE, HEALTH_TYPE } from "../../../../utils/Constants"
import { formatYYYYMMDD, isToday } from "../../../../utils/time/TimeUtil"
import { useEffect, useLayoutEffect, useState } from 'react'
import { Strings } from "../../../../utils/theme"
import { useIsFocused } from '@react-navigation/native'
import DeviceStatusComponent from './DeviceStatusComponent'
import { logDebug } from '../../../../utils/logger/Logger'

const LOG_TAG = Constants.LOG.DEVICE_STATUS_UI_LOG

/**
 * device status screen.
 * @param {Any} route
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
export default function DeviveStatusContainer({ route, navigation }) {

    /**
     * delivered navigation params.
     */
    const deliveredHealthType = route.params.statusType

    /**
     * use state for UI interaction.
     */
    const [type, setType] = useState(HEALTH_GRAPH_TYPE.DAY)
    const [date, setDate] = useState(moment())
    const [arrayChart, setArrayChart] = useState([])
    const [arrayHRChart, setArrayHRChart] = useState([])
    const [arrayHRAvgChart, setArrayHRAvgChart] = useState([])
    const [avgHr, setAvgHr] = useState(-1)
    const [arraySleepChart, setArraySleepChart] = useState([])
    const [arraySleepDataChart, setArraySleepDataChart] = useState([])
    const [title, setTitle] = useState(healthType === HEALTH_TYPE.SLEEP ? Strings.home.lastNight : Strings.home.today)
    const [loading, setLoading] = useState(false)
    const [isShowPopupDate, setIsShowPopupDate] = useState(false)
    const [healthType, setHealthType] = useState(deliveredHealthType)
    const [headerTitle, setHeaderTitle] = useState("")

    /**
     * flag for checking if the screen is currently focused.
     */
    const isScreenFocused = useIsFocused()

    /**
     * fetch health data.
     */
    fetchHealthData = (type, startDate, endDate) => {
        switch (healthType) {
            case HEALTH_TYPE.STEP:
                this.fetchStepData(type, startDate, endDate).then()
                break
            case HEALTH_TYPE.HEART_RATE:
                this.fetchHeartRateData(type, startDate, endDate).then()
                break
            case HEALTH_TYPE.SLEEP:
                this.fetchSleepData(type, startDate, endDate).then()
                break
        }
    }

    /**
     * fetch step data.
     */
    fetchStepData = async (type, startDate, endDate) => {
        setLoading(false)
    }

    /**
     * fetch heart rate data.
     */
    fetchHeartRateData = async (type, startDate, endDate) => {
        setLoading(false)
    }

    /**
     * fetch sleep data.
     */
    fetchSleepData = async (type, startDate, endDate) => {
        setLoading(false)
    }

    /**
     * determine if date selection popup is shown or not.
     */
    onSetIsShowPopupDate = (show) => {
        setIsShowPopupDate(show)
    }

    /**
     * execute logic when screen is focused.
     */
    useEffect(() => {
        if (isScreenFocused) {
            this.fetchHealthData(HEALTH_GRAPH_TYPE.DAY, moment().format("YYYY-MM-DD"), '')
        }

    }, [isScreenFocused])

    /**
     * get title to be shown in header title.
     */
    getHeaderTitle = (healthType) => {
        switch (healthType) {
            case HEALTH_TYPE.STEP:
                return Strings.chart.step

            case HEALTH_TYPE.HEART_RATE:
                return Strings.chart.hr

            case HEALTH_TYPE.SLEEP:
                return Strings.chart.sleep

            default:
                return "Invalid Health Type"
        }
    }

    /**
     * execute logic before finishing ui rendering on the screen.
     * this is used to prevent the flickering of the UI due to data change.
     */
    useLayoutEffect(() => {
        logDebug(LOG_TAG, "<<< delivered health type: " + deliveredHealthType)

        setHealthType(deliveredHealthType)
        setHeaderTitle(getHeaderTitle(deliveredHealthType))

    }, [deliveredHealthType])

    /**
     * fetch new data when data is changed.
     */
    onChangeDate = async (number, type) => {
        let dateType = type === HEALTH_GRAPH_TYPE.DAY ? 'days' :
            type === HEALTH_GRAPH_TYPE.WEEK ? 'weeks' : type === HEALTH_GRAPH_TYPE.MONTH ? 'months' : 'years'

        let currentDate
        if (number === 1) {
            currentDate = date.add(1, dateType)

        } else if (number === -1) {
            currentDate = date.subtract(1, dateType)

        } else {
            currentDate = moment(number)
        }

        let startDate = '', endDate = '', title = ''

        switch (type) {
            case HEALTH_GRAPH_TYPE.DAY:
                startDate = formatYYYYMMDD(currentDate)
                title = isToday(currentDate) ? (healthType === HEALTH_TYPE.SLEEP ?
                    Strings.home.lastNight : Strings.home.today) : (healthType === HEALTH_TYPE.SLEEP ?
                        moment(currentDate).subtract(1, 'd') : moment(currentDate)).format('L')
                break

            case HEALTH_GRAPH_TYPE.WEEK:
                startDate = formatYYYYMMDD(moment(currentDate).startOf('week'))
                endDate = formatYYYYMMDD(moment(currentDate).endOf('week'))
                title = moment(currentDate).startOf('week').format('L') + " - "
                    + moment(currentDate).endOf('week').format('L')
                break

            case HEALTH_GRAPH_TYPE.MONTH:
                startDate = formatYYYYMMDD(moment(currentDate).startOf('months'))
                endDate = formatYYYYMMDD(moment(currentDate).endOf('months'))
                title = moment(currentDate).format("LL")
                break

            case HEALTH_GRAPH_TYPE.YEAR:
                startDate = formatYYYYMMDD(moment(currentDate).startOf('years'))
                endDate = formatYYYYMMDD(moment(currentDate).endOf('years'))
                title = moment(currentDate).format("l")
                break

            default:
                break
        }

        this.fetchHealthData(type, startDate, endDate)
        setDate(type === HEALTH_GRAPH_TYPE.WEEK ? moment(currentDate).startOf('week') : currentDate)
        setTitle(title)
    }

    /**
     * detect event occurred when type is changed.
     */
    onChangeType = (type) => {
        if (loading === true) {
            return
        }
        setType(type)
        this.onChangeDate(moment(), type).then()
    }

    /**
     * handle header's back icon press event.
     */
    const onPressHeaderBackIcon = () => {
        logDebug(LOG_TAG, "<<< header back icon is pressed")
        this.handleNavigationPop()
    }

    /**
     * handle navigation's pop operation.
     */
    handleNavigationPop = () => {
        navigation.pop()
    }

    return (
        <DeviceStatusComponent
            onPressHeaderBackIcon={onPressHeaderBackIcon}
            onChangeType={onChangeType}
            onChangeDate={onChangeDate}
            onSetIsShowPopupDate={onSetIsShowPopupDate}
            loading={loading}
            type={type}
            arrayChart={arrayChart}
            arrayHRChart={arrayHRChart}
            arrayHRAvgChart={arrayHRAvgChart}
            avgHr={avgHr}
            arraySleepChart={arraySleepChart}
            arraySleepDataChart={arraySleepDataChart}
            healthType={healthType}
            isShowPopupDate={isShowPopupDate}
            date={date}
            title={title}
            headerTitle={headerTitle}
        />
    )
}