import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Colors, Fonts, Metrics, Strings } from '../../../utils/theme'
import {
    VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryStack, VictoryTooltip, VictoryLabel
} from "victory-native"
import _ from 'lodash'
import { graphStyles } from "./GraphStyles"
import { getBarWidth, getTickFormat, getTickSize, getTickValues } from "../../../utils/sleep/SleepUtil"
import { formatSleepTime } from "../../../utils/time"
import { NO_DATA_VALUE } from "../../../utils/Constants"

const strings = Strings.chart

export default class SleepBarChart extends Component {
    constructor(props) {
        super(props)
    }

    getAvg(arrayChart) {
        let sleep = arrayChart?.motion.reduce((a, b) => a + b.value, 0)
            + arrayChart?.noMotion.reduce((a, b) => a + b.value, 0)
        let avg = sleep === 0 ? NO_DATA_VALUE : Math.floor(sleep / arrayChart.validDay)
        let avgHour = Math.floor(avg / 3600)
        let avgMinute = Math.round((avg % 3600) / 60)
        return {
            avg,
            avgHour,
            avgMinute
        }
    }

    getData(arr) {
        return arr.map((i) => {
            return {
                ...i,
                value: parseFloat(i.value / 3600)
            }
        })
    }

    render() {
        const { arrayChart, loading = false, type } = this.props
        let barWidth = getBarWidth(type)
        let avgData = this.getAvg(arrayChart)
        let avg = avgData.avg
        let motionData = this.getData(arrayChart.motion)
        let noMotionData = this.getData(arrayChart.noMotion)
        let awakeData = this.getData(arrayChart.awake)
        return (
            <View style={{}} >
                <View style={graphStyles.headLine}>
                    {avg === NO_DATA_VALUE ? <Text style={graphStyles.avgNumber}>{avg}</Text>
                        : <Text style={graphStyles.avgNumber}>{avgData.avgHour}
                            <Text style={graphStyles.avgTitle} >
                                {Strings.formatString(' {0} ', strings.hourShort)}</Text>
                            <Text style={graphStyles.avgNumber}>{avgData.avgMinute}</Text>
                            <Text style={graphStyles.avgTitle} >
                                {Strings.formatString(' {0}{1}', strings.minuteShort, strings.average)}</Text>
                        </Text>
                    }
                    <Text style={graphStyles.yAxisTitle}>{strings.hours}</Text>
                </View>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: [0, 20] }}

                    minDomain={{ x: -0.5, y: 0 }}
                    padding={{ top: 50, bottom: 40, left: 20, right: 40 }}
                    style={{
                        background: { fill: "white" },
                    }}
                    width={Metrics.screenWidth - 40}
                    height={Metrics.screenWidth - 100}
                >
                    <VictoryAxis
                        tickValues={getTickValues(arrayChart)}
                        tickFormat={(t) => getTickFormat(t, type)}
                        crossAxis={false}
                        style={{
                            axis: { stroke: Colors.borderColorDateTime, strokeWidth: 1 },
                            ticks: { stroke: Colors.borderColorDateTime, size: ({ tick }) => getTickSize(tick, type) },
                            tickLabels: {
                                fontSize: 14, paddings: 12, fill: Colors.cloudyBlue,
                                fontFamily: Fonts.robotoFamily.Medium, fontWeight: "500",
                            },
                            grid: { stroke: 'transparent' }
                        }} />
                    <VictoryAxis
                        tickValues={[0, 3, 6, 9, 12]}
                        offsetX={50}
                        tickFormat={(t) => Math.floor(t)}
                        crossAxis={false}
                        tickLabelComponent={<VictoryLabel dy={-7} dx={-10} textAnchor="end" />}
                        style={{
                            axis: { stroke: "transparent" },
                            axisLabel: { fontSize: 20 },
                            ticks: {
                                stroke: Colors.borderColorDateTime, size: 50, strokeWidth: 1,
                                strokeDasharray: ({ tick }) => tick !== 0 ? "1,7" : "0, 0"
                            },
                            tickLabels: {
                                fontSize: 11, padding: 5, fill: Colors.cloudyBlue,
                                fontFamily: Fonts.robotoFamily.Regular, fontWeight: "normal",
                            },
                            grid: {
                                stroke: Colors.borderColorDateTime, strokeWidth: 1,
                                strokeDasharray: ({ tick }) => tick !== 0 ? "1,7" : "0, 0"
                            }
                        }}
                        height={10}
                        dependentAxis orientation='right'
                    />
                    <VictoryStack
                        colorScale={["#ff9800", "#ffd92c", "#da254c"]}
                    >
                        <VictoryBar
                            y='value'
                            labels={({ datum }) => { return formatSleepTime(datum.value * 3600) }}
                            labelComponent={<VictoryTooltip
                                renderInPortal={false}
                                active={false}
                                flyoutStyle={{
                                    fill: "white",
                                    strokeWidth: 0.9,
                                    stroke: "rgba(120, 122, 124, 0.12)",
                                }}
                                style={{
                                    fill: Colors.darkGreyTwo,
                                    fontFamily: Fonts.robotoFamily.Medium,
                                    fontSize: 14,
                                    fontWeight: "500",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "center",
                                }}
                            />}
                            barWidth={barWidth}

                            data={noMotionData}

                            events={[
                                {
                                    target: 'data',
                                    eventHandlers: {
                                        onPressIn: (evt, pressedProps) => {
                                            const selectedDataIndex = pressedProps.index
                                            return [
                                                {
                                                    eventKey: 'all',
                                                    target: 'labels',
                                                    mutation: props => {
                                                        let activeState = true

                                                        if (props.active === true) {
                                                            activeState = false
                                                        }
                                                        return props.index ===
                                                            selectedDataIndex
                                                            ? { active: activeState }
                                                            : { active: false }
                                                    },
                                                },
                                            ]
                                        },
                                        onPressOut: (evt, pressedProps) => {
                                            const selectedDataIndex = pressedProps.index
                                            return [
                                                {
                                                    eventKey: 'all',
                                                    target: 'labels',
                                                    mutation: props =>
                                                        props.index === selectedDataIndex
                                                            ? { active: props.active }
                                                            : true
                                                },
                                            ]
                                        },
                                    },
                                },
                            ]}
                        />

                        <VictoryBar
                            y='value'
                            labels={({ datum }) => { return formatSleepTime(datum.value * 3600) }}
                            labelComponent={<VictoryTooltip
                                renderInPortal={false}
                                active={false}
                                flyoutStyle={{
                                    fill: "white",
                                    strokeWidth: 0.9,
                                    stroke: "rgba(120, 122, 124, 0.12)",
                                }}
                                style={{
                                    fill: Colors.darkGreyTwo,
                                    fontFamily: Fonts.robotoFamily.Medium,
                                    fontSize: 14,
                                    fontWeight: "500",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "center",
                                }}
                            />}
                            barWidth={barWidth}

                            data={motionData}

                            events={[
                                {
                                    target: 'data',
                                    eventHandlers: {
                                        onPressIn: (evt, pressedProps) => {
                                            const selectedDataIndex = pressedProps.index
                                            return [
                                                {
                                                    eventKey: 'all',
                                                    target: 'labels',
                                                    mutation: props => {
                                                        let activeState = true

                                                        if (props.active === true) {
                                                            activeState = false
                                                        }
                                                        return props.index ===
                                                            selectedDataIndex
                                                            ? { active: activeState }
                                                            : { active: false }
                                                    },
                                                },
                                            ]
                                        },
                                        onPressOut: (evt, pressedProps) => {
                                            const selectedDataIndex = pressedProps.index
                                            return [
                                                {
                                                    eventKey: 'all',
                                                    target: 'labels',
                                                    mutation: props =>
                                                        props.index === selectedDataIndex
                                                            ? { active: props.active }
                                                            : true
                                                },
                                            ]
                                        },
                                    },
                                },
                            ]}
                        />
                        <VictoryBar
                            y='value'
                            labels={({ datum }) => { return formatSleepTime(datum.value * 3600) }}
                            labelComponent={<VictoryTooltip
                                renderInPortal={false}
                                active={false}
                                flyoutStyle={{
                                    fill: "white",
                                    strokeWidth: 0.9,
                                    stroke: "rgba(120, 122, 124, 0.12)",
                                }}
                                style={{
                                    fill: Colors.darkGreyTwo,
                                    fontFamily: Fonts.robotoFamily.Medium,
                                    fontSize: 14,
                                    fontWeight: "500",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "center",
                                }}
                            />}
                            barWidth={barWidth}
                            data={awakeData}
                            events={[
                                {
                                    target: 'data',
                                    eventHandlers: {
                                        onPressIn: (evt, pressedProps) => {
                                            const selectedDataIndex = pressedProps.index
                                            return [
                                                {
                                                    eventKey: 'all',
                                                    target: 'labels',
                                                    mutation: props => {
                                                        let activeState = true

                                                        if (props.active === true) {
                                                            activeState = false
                                                        }
                                                        return props.index ===
                                                            selectedDataIndex
                                                            ? { active: activeState }
                                                            : { active: false }
                                                    },
                                                },
                                            ]
                                        },
                                        onPressOut: (evt, pressedProps) => {
                                            const selectedDataIndex = pressedProps.index
                                            return [
                                                {
                                                    eventKey: 'all',
                                                    target: 'labels',
                                                    mutation: props =>
                                                        props.index === selectedDataIndex
                                                            ? { active: props.active }
                                                            : true
                                                },
                                            ]
                                        },
                                    },
                                },
                            ]}
                        />
                    </VictoryStack>
                </VictoryChart>
            </View>
        )
    }
}