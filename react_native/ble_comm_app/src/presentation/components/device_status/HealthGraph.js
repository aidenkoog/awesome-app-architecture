import React, { Component } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Loading } from '../Loading'
import StepChart from "./StepChart"
import { HEALTH_GRAPH_TYPE, HEALTH_TYPE, NO_DATA_VALUE } from "../../../utils/Constants"
import HRChart from "./HRChart"
import SleepBarChart from "./SleepBarChart"
import SleepDayChart from './SleepDayChart'
import { graphStyles } from "./GraphStyles"

export default class HealthGraph extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { healthType, type, arrayStepChart = [], arrayHRChart = [],
            arrayHRAvgChart = [], avgHr, arraySleepDataChart = [], arraySleepChart = [], loading
        } = this.props

        return (
            <SafeAreaView style={graphStyles.container}>
                {loading
                    ? <Loading />
                    : <View>
                        {(healthType === HEALTH_TYPE.STEP)
                            && <StepChart type={type} arrayChart={arrayStepChart} loading={loading} />}

                        {(healthType === HEALTH_TYPE.HEART_RATE)
                            && <HRChart type={type} arrayHRChart={arrayHRChart}
                                arrayHRAvgChart={arrayHRAvgChart} avgHr={avgHr === -1 ? NO_DATA_VALUE : avgHr}
                                loading={loading} />}

                        {(healthType === HEALTH_TYPE.SLEEP
                            && (type !== HEALTH_GRAPH_TYPE.DAY))
                            && <SleepBarChart type={type} arrayChart={arraySleepChart} loading={loading} />}

                        {(healthType === HEALTH_TYPE.SLEEP && type === HEALTH_GRAPH_TYPE.DAY)
                            && <SleepDayChart
                                type={type}
                                duration={arraySleepDataChart?.duration}
                                arrayChart={arraySleepDataChart?.sleepData ?? []}
                                startTime={arraySleepDataChart?.startTime}
                                endTime={arraySleepDataChart?.endTime}
                                sleepTime={arraySleepDataChart?.sleepTime}
                                awakeTime={arraySleepDataChart?.awakeTime}
                                motionTime={arraySleepDataChart?.motionTime}
                                noMotionTime={arraySleepDataChart?.noMotionTime}
                                loading={loading} />}
                    </View>
                }
            </SafeAreaView >
        )
    }
}