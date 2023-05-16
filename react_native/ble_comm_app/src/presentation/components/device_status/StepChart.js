import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Colors, Fonts, Metrics, Strings } from '../../../utils/theme'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip, VictoryLabel } from "victory-native"
import _ from 'lodash'
import { graphStyles } from "./GraphStyles"
import { getBarWidth, getTickFormat, getTickSize } from "../../../utils/sleep"
import { HEALTH_GRAPH_TYPE, NO_DATA_VALUE } from "../../../utils/Constants"

const strings = Strings.chart

export default class StepChart extends Component {
    constructor(props) {
        super(props)
    }

    getTickValues(arrayChart) {
        return [...Array(arrayChart.length).keys()]
    }

    getAvg(arrayChart, type) {
        if (type === HEALTH_GRAPH_TYPE.DAY) {
            let steps = Math.max.apply(Math, arrayChart.map(function (o) { return o.value }))
            return steps > 0 ? steps : NO_DATA_VALUE
        } else {
            let steps = arrayChart.reduce((a, b) => a + (b.value < 0 ? 0 : b.value), 0)
            let count = arrayChart.filter((i) => i.value >= 0).length
            return (steps === 0 ? NO_DATA_VALUE : Math.floor(steps / count))
        }
    }

    getData(arrayChart, type) {
        if (type === HEALTH_GRAPH_TYPE.DAY) {
            let data = []
            for (let i = 0; i < arrayChart.length; i++) {
                if (i % 2 === 0) {
                    data.push({
                        ...arrayChart[i],
                        value: 0
                    })
                } else if (i === 1 || arrayChart[i].value === 0) {
                    data.push(arrayChart[i])
                } else {
                    let tmp = {
                        ...arrayChart[i],
                        value: arrayChart[i].value - arrayChart[i - 2].value
                    }
                    data.push(tmp)
                }
            }
            return data
        } else {
            return arrayChart.map((i) => {
                return {
                    ...i,
                    value: i.value < 0 ? 0 : i.value
                }
            })
        }
    }

    render() {
        const { type, arrayChart = [], loading } = this.props
        let barWidth = getBarWidth(type)
        let avg = this.getAvg(arrayChart, type)
        let data = this.getData(arrayChart, type)
        let maxValue = arrayChart.reduce((max, b) => Math.max(max, b.value), 0)

        return (
            <View style={{}} >
                <View style={graphStyles.headLine}>
                    <Text style={graphStyles.avgNumber}>
                        {avg.toLocaleString()}
                        {!(avg === NO_DATA_VALUE || type === HEALTH_GRAPH_TYPE.DAY) && <Text style={graphStyles.avgTitle} >{strings.average}</Text>}
                    </Text>
                    <Text style={graphStyles.yAxisTitle}>{strings.steps}</Text>
                </View>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: [0, 35] }}
                    minDomain={{ x: -0.2, y: 0 }}
                    maxDomain={{ y: maxValue < 1500 ? 1500 : maxValue }}
                    padding={{ top: 50, bottom: 50, left: 40, right: 35 }}
                    style={{
                        background: { fill: "white" },
                        // parent: { border: "1px solid #ccc" }

                    }}
                    width={Metrics.screenWidth - 40}
                    height={Metrics.screenWidth - 100}
                >
                    <VictoryAxis
                        tickValues={this.getTickValues(arrayChart)}
                        tickFormat={(t) => getTickFormat(t, type)}
                        crossAxis={false}
                        style={{
                            axis: { stroke: Colors.borderColorDateTime, strokeWidth: 1 },
                            ticks: {
                                stroke: Colors.borderColorDateTime,
                                size: ({ tick }) => getTickSize(tick, type)
                            },
                            tickLabels: {
                                fontSize: 14, padding: 12, fill: Colors.cloudyBlue,
                                fontFamily: Fonts.robotoFamily.Medium, fontWeight: "500",
                            },
                            grid: { stroke: 'transparent' }
                        }} />
                    <VictoryAxis
                        tickValues={avg === NO_DATA_VALUE ? [0, 500, 1000, 1500] : undefined}
                        offsetX={50}
                        tickFormat={(t) => Math.floor(t).toLocaleString()}
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
                    {avg === NO_DATA_VALUE && <VictoryLabel
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
                        y='value'
                        labels={({ datum }) => { return datum.value.toLocaleString() }}
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
                        style={{
                            data: { fill: "#4ac49e" }
                        }}
                        data={data}
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