import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CustomLineChart from '../CustomLineChart'
import { Colors, Fonts, Metrics, Strings } from '../../../utils/theme'
import moment from "moment"
import { graphStyles } from "./GraphStyles"
import { formatSleepTime } from "../../../utils/time"
import { isNil } from "lodash"

const strings = Strings.chart

export default class SleepDayChart extends Component {
    constructor(props) {
        super(props)
    }

    parseSleepDuration(sleep) {
        if (sleep?.length > 0) {
            let startDuration = [], endDuration = [], sleepDuration = [], sleepTime = 0
            startDuration.push(sleep[0].startTime)
            for (let i = 0; i < sleep.length; i++) {
                if (sleep[i].value !== -1 && sleep[i].value !== 2) {
                    sleepTime += sleep[i].duration
                }
                if (sleep[i].value === -1 && i !== sleep.length - 1) {
                    startDuration.push(sleep[i + 1].startTime)
                    endDuration.push(sleep[i - 1].endTime)
                    sleepDuration.push(sleepTime)
                    sleepTime = 0
                }
            }
            endDuration.push(sleep[sleep.length - 1].endTime)
            sleepDuration.push(sleepTime)
            return { startDuration, endDuration, sleepDuration }
        }
    }

    sleepDuration(sleep) {
        if (!isNil(sleep)) {
            let sleepTimeDuration = []
            sleep.startDuration.forEach((_, index) => {
                let startTime = sleep.startDuration[index],
                    endTime = sleep.endDuration[index],
                    sleepTime = sleep.sleepDuration[index],
                    hours = Math.floor(sleepTime / 3600),
                    minutes = Math.floor((sleepTime % 3600) / 60)
                hours = hours < 10 ? '0' + hours : hours
                minutes = minutes < 10 ? '0' + minutes : minutes
                sleepTimeDuration.push(
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} key={index}>
                        <View style={graphStyles.dot} />
                        <Text style={graphStyles.sleepHour}>{hours}
                            <Text style={{ ...graphStyles.sleepHour, fontSize: 14 }}>{Strings.chart.hourShort}</Text>
                            <Text> </Text>
                            <Text style={graphStyles.sleepHour}>{minutes}</Text>
                            <Text style={{ ...graphStyles.sleepHour, fontSize: 14 }}>{Strings.chart.minuteShort}</Text>
                            <Text>  </Text>
                            <Text style={{ ...graphStyles.sleepHour, color: Colors.cloudyBlue }}>
                                {moment(startTime * 1000).utc().format('ll')}
                                <Text style={{ ...graphStyles.sleepHour, color: Colors.cloudyBlue }}> ~ </Text>
                                {moment(endTime * 1000).utc().format('ll')}
                            </Text>
                        </Text>
                    </View>
                )
            })
            return sleepTimeDuration
        }
    }

    render() {
        const { arrayChart = [], loading, duration, startTime, endTime, sleepTime, awakeTime, motionTime, noMotionTime } = this.props
        let offset = (Strings.getLanguage() === 'ja' || Strings.getLanguage() === 'ko') ? "       " : "" //trick to avoid cutoff text
        let initialLabels = strings.dayAxis.filter((e, index) => index % 4 === 0),
            sleep = this.parseSleepDuration(arrayChart),
            hours = Math.floor(sleepTime / 3600),
            minutes = Math.floor((sleepTime % 3600) / 60),
            labels = duration
                ? [offset + moment(startTime * 1000).utc().format('LT'),
                moment((startTime + (endTime - startTime) / 2) * 1000).utc().format('LT'),
                moment(endTime * 1000).utc().format('LT')]
                : initialLabels

        return (
            <View>
                {sleepTime === 0 || isNil(sleepTime) ? <Text style={graphStyles.avgNumber}>{'_'}</Text>
                    : <Text style={graphStyles.avgNumber}>{hours}
                        <Text style={graphStyles.avgTitle} >{Strings.formatString(' {0} ', strings.hourShort)}</Text>
                        <Text style={graphStyles.avgNumber}>{minutes}</Text>
                        <Text style={graphStyles.avgTitle} >{Strings.formatString(' {0}', strings.minuteShort)}</Text>
                    </Text>}
                <View style={{ alignItems: 'center', justifyContent: 'center', }} >
                    <CustomLineChart
                        bezier
                        paddingHorizontalLabel={75}
                        fromZero={true}
                        paddingRight={30}
                        paddingTop={36}
                        x={'duration'}
                        y={'value'}
                        yAxisLength={duration ?? 86400} // total time in 24h, not total time of data
                        //86400 = 24 * 60 * 60
                        data={{
                            labels: labels,
                            datasets: [{
                                data: arrayChart,
                                strokeWidth: 1 // optional
                            },
                            ],
                        }}
                        withDots={false}
                        withShadow={false}
                        withInnerLines={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withVerticalLine={true}
                        withHorizontalLines={true}
                        withHorizontalLabels={true}
                        withVerticalLabels={true}
                        yLabelsOffset={6}
                        width={Metrics.screenWidth - 40} // from react-native
                        height={Metrics.screenWidth - 180}
                        formatYLabel={(value) => {
                            return value === 0 ? strings.noMotion : value === 1 ? strings.motion : value === 2 ? strings.awake : ""
                        }}
                        awakeValue={formatSleepTime(noMotionTime ?? 0)}
                        motionValue={formatSleepTime(motionTime ?? 0)}
                        noMotionValue={formatSleepTime(awakeTime ?? 0)}
                        chartConfig={{
                            propsForVerticalLabels: {
                                fontSize: 14,
                                fill: Colors.cloudyBlue,
                                fontFamily: Fonts.robotoFamily.Medium,
                                fontWeight: '500'
                            },
                            propsForHorizontalLabels: {
                                fontSize: 11,
                                fill: Colors.cloudyBlue,
                                fontFamily: Fonts.robotoFamily.Regular,
                                fontWeight: 'normal'
                            },
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => 'url(#grad)',
                            labelColor: (opacity = 1) => Colors.cloudyBlue,
                            style: {
                                borderRadius: 1
                            },
                            grid: {
                                stroke: (i) => Colors.borderColorDateTime,
                                strokeDasharray: (i) => i === 0 ? "0, 0" : " 5, 5",
                                strokeWidth: 1
                            },
                            tick: {
                                stroke: (i) => Colors.borderColorDateTime,
                                strokeDasharray: (i) => "0, 0",
                                strokeWidth: 1,
                                size: 8
                            },
                        }}

                    />
                    {arrayChart.length === 0 && <Text style={{
                        position: 'absolute',
                        color: Colors.slateGrey,
                        fontSize: 14,
                        fontFamily: Fonts.robotoFamily.Regular
                    }} >{strings.noData}</Text>}
                </View>
                {!isNil(sleep) && <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                    {this.sleepDuration(sleep)}
                </View>}
            </View>
        )
    }
}