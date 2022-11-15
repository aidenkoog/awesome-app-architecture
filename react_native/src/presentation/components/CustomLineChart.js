import { ScrollView, StyleSheet, View } from "react-native"
import Svg, { Defs, G, LinearGradient, Rect, Stop } from "react-native-svg"
import LineChart from "./line_chart/line-chart/LineChart"


class CustomLineChart extends LineChart {

    render() {
        const {
            width,
            height,
            data,
            withScrollableDot = false,
            withShadow = true,
            withDots = true,
            withInnerLines = true,
            withOuterLines = true,
            withHorizontalLines = true,
            withVerticalLines = true,
            withHorizontalLabels = true,
            withVerticalLabels = true,
            style = {},
            decorator,
            onDataPointClick,
            verticalLabelRotation = 0,
            horizontalLabelRotation = 0,
            formatYLabel = (yLabel) => yLabel,
            formatXLabel = (xLabel) => xLabel,
            segments,
            transparent = false,
            chartConfig,
            percent,
            paddingHorizontalLabel = 30,
            paddingTop = 16,
            paddingRight = 30,
            yAxisLength = 86400,
            x,
            y,
            awakeValue,
            motionValue,
            noMotionValue,
        } = this.props

        const { scrollableDotHorizontalOffset } = this.state
        const { labels = [] } = data
        const {
            borderRadius = 0,
            margin = 0,
            marginRight = 0,
            paddingBottom = 0,
        } = style

        const config = {
            width,
            height,
            verticalLabelRotation,
            horizontalLabelRotation,
        }

        let horizontalWidth = [-19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0]

        const datas = this.getDatas(data.datasets)

        let count = Math.min(...datas) === Math.max(...datas) ? 1 : 2
        if (segments) {
            count = segments
        }

        const legendOffset = this.props.data.legend ? height * 0.15 : 0

        return (
            <View style={style}>
                <Svg
                    height={height * 0.75 + paddingBottom + legendOffset + paddingTop + 14 * 2 + 20}
                    width={width - margin * 2 - marginRight}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="1" stopColor="#ff9800" stopOpacity="1" />
                            <Stop offset="0.4" stopColor="#ffd92c" stopOpacity="1" />
                            <Stop offset="0" stopColor="#da244c" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Rect
                        width="100%"
                        height={height + legendOffset}
                        rx={borderRadius}
                        ry={borderRadius}
                        fill="white"
                        fillOpacity={transparent ? 0 : 1}
                    />
                    {this.props.data.legend &&
                        this.renderLegend(config.width, legendOffset)}
                    <G x="0" y={legendOffset}>
                        <G>
                            {withHorizontalLines &&
                                (withInnerLines
                                    ? this.renderHorizontalLines({
                                        ...config,
                                        count: count,
                                        paddingTop,
                                        paddingRight: 10,
                                    })
                                    : withOuterLines
                                        ? this.renderHorizontalLine({
                                            ...config,
                                            paddingTop,
                                            paddingRight: 10,
                                        })
                                        : null)}
                        </G>
                        <G>
                            {withHorizontalLabels &&
                                this.renderHorizontalLabels({
                                    ...config,
                                    count: count,
                                    data: datas,
                                    paddingTop: paddingTop,
                                    paddingRight: width,
                                    formatYLabel,
                                    decimalPlaces: chartConfig.decimalPlaces,
                                    x,
                                    y,
                                    awakeValue,
                                    motionValue,
                                    noMotionValue,
                                })}
                        </G>
                        <G>
                            {withVerticalLines &&
                                (withInnerLines
                                    ? this.renderVerticalLines({
                                        ...config,
                                        labels: labels,
                                        paddingTop: paddingTop,
                                        paddingRight: paddingRight,
                                        paddingHorizontalLabel: paddingHorizontalLabel
                                    })
                                    : withOuterLines
                                        ? this.renderVerticalLine({
                                            ...config,
                                            paddingTop: paddingTop,
                                            paddingRight: paddingRight,
                                        })
                                        : null)}
                        </G>
                        <G>
                            {withVerticalLabels &&
                                this.renderVerticalLabels({
                                    ...config,
                                    labels,
                                    paddingTop: paddingTop,
                                    paddingRight: paddingRight,
                                    formatXLabel,
                                    paddingHorizontalLabel: paddingHorizontalLabel
                                })}
                        </G>

                        {horizontalWidth.map((item) => {
                            return <G key={item} >
                                {this.renderLine({
                                    width: width,
                                    height: height,
                                    ...chartConfig,
                                    paddingRight: paddingRight,
                                    paddingTop: paddingTop + item * 0.5,
                                    paddingHorizontalLabel: paddingHorizontalLabel,
                                    data: data.datasets,
                                    labels,
                                    yAxisLength: yAxisLength,
                                    x: x,
                                    y: y
                                })}
                            </G>
                        })}

                        <G>
                            {withDots &&
                                this.renderDots({
                                    ...config,
                                    data: data.datasets,
                                    paddingTop: paddingTop,
                                    paddingRight: paddingRight,
                                    onDataPointClick,
                                })}
                        </G>
                        <G>
                            {withScrollableDot &&
                                this.renderScrollableDot({
                                    ...config,
                                    ...chartConfig,
                                    data: data.datasets,
                                    paddingTop: paddingTop,
                                    paddingRight: paddingRight,
                                    onDataPointClick,
                                    scrollableDotHorizontalOffset,
                                })}
                        </G>
                        <G>
                            {decorator &&
                                decorator({
                                    ...config,
                                    data: data.datasets,
                                    paddingTop,
                                    paddingRight,
                                })}
                        </G>
                    </G>
                </Svg>
                {withScrollableDot && (
                    <ScrollView
                        style={StyleSheet.absoluteFill}
                        contentContainerStyle={{ width: width * 2 }}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { x: scrollableDotHorizontalOffset },
                                },
                            },
                        ])}
                        horizontal
                        bounces={false}
                    />
                )}

            </View>
        )
    }
}
export default CustomLineChart

