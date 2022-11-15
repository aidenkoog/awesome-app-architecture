import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../utils/theme'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryLabel } from "victory-native"
import _ from 'lodash'
import { graphStyles } from "./GraphStyles"
import { getTickFormat } from '../../../utils/sleep/SleepUtil'

export default class SleepMonthYearChart extends Component {
    constructor(props) {
        super(props)
    }

    getData(arrayChart) {
        let sleep = arrayChart.reduce((a, b) => a + b.value, 0)
        let count = 0
        let sleepData = arrayChart.map((i) => {
            count += i.value === 0 ? 0 : 1
            return {
                ...i,
                value: parseFloat(i.value / 3600)
            }
        })
        let avg = sleep === 0 ? "_" : Math.floor(sleep / count)
        let avgHour = Math.floor(avg / 3600)
        let avgMinute = Math.floor((avg % 3600) / 60)
        return {
            sleepData,
            avg,
            avgHour,
            avgMinute
        }
    }

    render() {
        const { type, arrayChart = [], loading } = this.props
        let data = this.getData(arrayChart)
        let sleepData = data.sleepData
        let avg = data.avg
        let tickValues = [...Array(arrayChart.length).keys()]

        return (
            <View style={{}} >
                {avg === '_' ? <Text style={graphStyles.avgNumber}>{avg}</Text>
                    : <Text style={graphStyles.avgNumber}>{data.avgHour}
                        <Text style={graphStyles.avgTitle} >{' h '}</Text>
                        <Text style={graphStyles.avgNumber}>{data.avgMinute}</Text>
                        <Text style={graphStyles.avgTitle} >{' m (Avg)'}</Text>
                    </Text>}
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: [0, 20] }}

                    minDomain={{ x: -0.5, y: 0 }}
                    padding={{ top: 50, bottom: 30, left: 20, right: 25 }}
                    style={{
                        background: { fill: "white" },
                        // parent: { border: "1px solid #ccc" }

                    }}
                    width={Metrics.screenWidth - 40}
                    height={Metrics.screenWidth - 100}
                >
                    <VictoryAxis
                        tickValues={tickValues}
                        tickFormat={(t) => getTickFormat(t, type)}
                        crossAxis={false}
                        style={{
                            axis: { stroke: Colors.borderColorDateTime, strokeWidth: 1 },
                            ticks: { stroke: "white", size: 0 },
                            tickLabels: { fontSize: 14, padding: 8, fill: Colors.cloudyBlue, fontFamily: Fonts.robotoFamily.Medium, fontWeight: "500", },
                            grid: { stroke: 'transparent' }
                        }} />
                    <VictoryAxis
                        tickValues={[0, 3, 6, 9, 12]}
                        offsetX={50}
                        tickFormat={(t) => Math.floor(t)}
                        tickCount={4}
                        crossAxis={false}
                        tickLabelComponent={<VictoryLabel dy={-7} dx={-10} textAnchor="end" />}
                        label={"(hr)"}
                        axisLabelComponent={
                            <VictoryLabel style={{
                                fill: Colors.cloudyBlue,
                                fontSize: 11,
                                fontFamily: Fonts.robotoFamily.Regular
                            }}
                                textAnchor="start"
                                angle={0}
                                dx={20}
                                dy={-(Metrics.screenWidth - 100) / 2 + 5} />}
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
                    {avg === "_" && <VictoryLabel
                        textAnchor="middle" verticalAnchor="middle"
                        x={(Metrics.screenWidth - 40) / 2} y={(Metrics.screenWidth - 100) / 2 - 20}
                        style={{
                            fill: Colors.slateGrey,
                            fontSize: 14,
                            fontFamily: Fonts.robotoFamily.Regular
                        }}
                        text="No data"
                    />}

                    <VictoryLine
                        minDomain={{ y: 0 }}
                        y='value'
                        labels={({ datum }) => { return parseFloat((Math.round(datum.value * 100) / 100).toFixed(2)) }}
                        labelComponent={<VictoryTooltip
                            // cornerRadius={5}
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
                        style={{
                            data: { stroke: "#ff9800", strokeWidth: 2 }
                        }}
                        data={sleepData}
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