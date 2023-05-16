import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Colors, Fonts, Metrics, Strings } from '../../../utils/theme'
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryLabel,
    VictoryTheme,
    VictoryTooltip
} from "victory-native"
import { graphStyles } from "./GraphStyles"
import { HEALTH_GRAPH_TYPE, NO_DATA_VALUE } from "../../../utils/Constants"

const strings = Strings.chart

export default class HRChart extends Component {
    constructor(props) {
        super(props)
    }

    getTickValues(type) {
        return type === HEALTH_GRAPH_TYPE.DAY ? strings.dayAxis :
            [...Array(type === HEALTH_GRAPH_TYPE.WEEK ? 7 : type === HEALTH_GRAPH_TYPE.MONTH ? 31 : 12).keys()]
    }

    getTickFormat(t, type) {
        return type === HEALTH_GRAPH_TYPE.DAY
            ? (t.includes('-') || t.includes('6') ? "" : t)
            : type === HEALTH_GRAPH_TYPE.WEEK
                ? ((t < 0 || t > 6 || t % 1 !== 0) ? '' : Strings.repeat.daysOfWeekShort[t])
                : type === HEALTH_GRAPH_TYPE.MONTH
                    ? ((t === 0 || (t + 1) % 10 === 0) ? t + 1 : '') : t + 1
    }

    getTickSize(t, type) {
        return type === HEALTH_GRAPH_TYPE.DAY
            ? (t.includes('-') ? 0 : 8)
            : type === HEALTH_GRAPH_TYPE.MONTH
                ? ((t === 0 || (t + 1) % 10 === 0) ? 8 : 0)
                : 8
    }

    getBarWidth(type) {
        let graphViewWidth = Metrics.screenWidth - 40
        let divideNumber = type === HEALTH_GRAPH_TYPE.DAY ? 11 :
            type === HEALTH_GRAPH_TYPE.WEEK ? 17 : type === HEALTH_GRAPH_TYPE.MONTH ? 69 : 25
        return Math.floor(graphViewWidth / divideNumber)
    }

    // adding offset due to there is a case max equal to min value
    getDataHR(arrayHRChart, offset) {
        return arrayHRChart.map((i) => {
            return {
                ...i,
                minValue: i.minValue < 0 ? 0 : (i.minValue - offset),
                maxValue: i.maxValue < 0 ? 0 : (i.maxValue + offset)
            }
        })
    }

    getDataRHR(arrayRHRChart) {
        return arrayRHRChart.map((i) => {
            return {
                ...i,
                value: i.value < 0 ? 0 : i.value
            }
        })
    }

    render() {
        const { type, arrayHRChart = [], avgHr, arrayHRAvgChart = [] } = this.props
        let maxValue = arrayHRChart.reduce((max, b) => Math.max(max, b.maxValue), 0)
        let barWidth = this.getBarWidth(type)
        let tickValues = this.getTickValues(type)

        let borderRadius = Math.round(barWidth / 2)
        let chartHeight = Metrics.screenWidth - 100
        let maxDomain = maxValue < 150 ? 150 : maxValue
        let offset = Math.round(borderRadius * (maxDomain + (chartHeight > 350 ? 0 : 30)) / chartHeight)
        let dataHr = this.getDataHR(arrayHRChart, offset)

        return (
            <View style={{}} >
                <View style={graphStyles.headLine}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={graphStyles.avgNumber}>
                            {avgHr}
                            <Text style={graphStyles.avgTitle} >{(strings.averageRHR).replace(/\)/g, '')}</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 0 }}>
                            <Text style={graphStyles.avgTitle} >)</Text>
                        </View>
                    </View>
                    <Text style={graphStyles.yAxisTitle}>{strings.bpm}</Text>
                </View>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: [0, 10] }}
                    minDomain={{ x: type === HEALTH_GRAPH_TYPE.DAY ? 0.5 : -0.5, y: 0 }}
                    maxDomain={{ y: maxDomain }}
                    padding={{ top: 50, bottom: 50, left: 20, right: 40 }}
                    style={{
                        background: { fill: "white" },
                    }}
                    width={Metrics.screenWidth - 40}
                    height={Metrics.screenWidth - 100}
                >
                    <VictoryAxis
                        tickValues={tickValues}
                        tickFormat={(t) => this.getTickFormat(t, type)}
                        crossAxis={false}
                        style={{
                            axis: { stroke: Colors.borderColorDateTime, strokeWidth: 1 },
                            ticks: {
                                stroke: Colors.borderColorDateTime,
                                size: ({ tick }) => this.getTickSize(tick, type)
                            },
                            tickLabels: {
                                fontSize: 14, padding: 12, fill: Colors.cloudyBlue,
                                fontFamily: Fonts.robotoFamily.Medium, fontWeight: "500",
                            },
                            grid: { stroke: 'transparent' }
                        }} />
                    <VictoryAxis
                        offsetX={50}
                        tickFormat={(t) => Math.floor(t)}
                        tickCount={4}
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
                    {avgHr === NO_DATA_VALUE && !(maxValue > 0) && <VictoryLabel
                        textAnchor="middle" verticalAnchor="middle"
                        x={(Metrics.screenWidth - 40) / 2} y={(Metrics.screenWidth - 100) / 2 - 20}
                        style={{
                            fill: Colors.slateGrey,
                            fontSize: 14,
                            fontFamily: Fonts.robotoFamily.Regular
                        }}
                        text={strings.noData}
                    />}

                    <VictoryBar
                        renderInPortal={false}
                        cornerRadius={{
                            top: borderRadius,
                            bottom: borderRadius,
                        }}
                        x={type === HEALTH_GRAPH_TYPE.DAY ? 'time' : undefined}
                        y='maxValue'
                        y0='minValue'
                        labels={({ datum }) => {
                            return (parseInt(datum._y) - offset).toString()
                                + "\n" + (parseInt(datum._y0) + offset).toString()
                        }}
                        labelComponent={<VictoryTooltip
                            renderInPortal={false}
                            active={false}
                            flyoutStyle={{
                                fill: "white",
                                strokeWidth: 0.9,
                                stroke: "rgba(120, 122, 124, 0.12)",
                            }}
                            flyoutWidth={40}
                            style={{
                                fill: Colors.darkGreyTwo,
                                fontFamily: Fonts.robotoFamily.Medium,
                                fontSize: 14,
                                fontWeight: "500",
                                fontStyle: "normal",
                                textAnchor: "end",
                            }}
                        />}
                        barWidth={barWidth}
                        style={{
                            data: { fill: Colors.linearRedThree }
                        }}
                        data={dataHr}
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
                </VictoryChart>
            </View>
        )
    }
}