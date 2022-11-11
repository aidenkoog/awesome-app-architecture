import React, { useEffect, useState } from "react"
import { LogBox } from "react-native"
import HrMonitoringSettingComponent from "./HrMonitoringSettingComponent"

/**
 * HR monitoring screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const HrMonitoringSettingContainer = ({ navigation }) => {

    const [monitoringIntervals, setMonitoringIntervals] = useState(false)
    const [intervalMode, setIntervalMode] = useState('-')
    const [intervalVisible, setIntervalVisible] = useState(false)

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
        fetchHrMonitor()
        fetchHrMonitorInterval()
    }, [])

    function fetchHrMonitor() { }

    function fetchHrMonitorInterval() { }

    function onChangeHrMonitorInterval() { }

    function updateHrMonitor(value) { setMonitoringIntervals(value) }

    function onChangeInterval(value) {
        setIntervalVisible(false)
        setIntervalMode(value)
        onChangeHrMonitorInterval(value)
    }

    return (
        <HrMonitoringSettingComponent
            onChangeInterval={onChangeInterval}
            updateHrMonitor={updateHrMonitor}
            navigation={navigation}
        />
    )
}

export default HrMonitoringSettingContainer