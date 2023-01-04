import ControlHrMonitoringUseCase from "../../../../domain/usecases/bluetooth/feature/device/ControlHrMonitoringUseCase"
import React, { useEffect, useState } from "react"
import { LogBox } from "react-native"
import { logDebug } from "../../../../utils/logger/Logger"
import HrMonitoringSettingComponent from "./HrMonitoringSettingComponent"
import Constants from "../../../../utils/Constants"


const LOG_TAG = Constants.LOG.SETTINGS_UI_LOG

/**
 * HR monitoring screen.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
const HrMonitoringSettingContainer = ({ navigation }) => {

    /**
     * useState code for ui interaction.
     */
    const [monitoringIntervals, setMonitoringIntervals] = useState(false)
    const [intervalMode, setIntervalMode] = useState('-')
    const [intervalVisible, setIntervalVisible] = useState(false)

    /**
     * usecases.
     */
    const { executeTurnOnHrMonitoring, executeTurnOffHrMonitoring } = ControlHrMonitoringUseCase()

    /**
     * hook for running a task whenever a React component is rendered.
     */
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
        fetchHrMonitor()
        fetchHrMonitorInterval()
    }, [])

    /**
     * fetch HR monitoring information.
     */
    function fetchHrMonitor() { }

    /**
     * fetch HR monitoring interval information.
     */
    function fetchHrMonitorInterval() { }

    /**
     * handle the event occurred when HR monitoring interval change.
     */
    function onChangeHrMonitorInterval() { }

    /**
     * handle header's back icon press event.
     */
    function onPressHeaderBackIcon() {
        logDebug(LOG_TAG, "<<< header back icon is pressed")
        navigation.pop()
    }

    /**
     * detect HR monitoring switch's state. (ON/OFF)
     * @param {boolean} value 
     */
    function updateHrMonitor(turnedOn) {
        logDebug(LOG_TAG, "<<< update HR monitoring switch state: " + turnedOn)
        setMonitoringIntervals(value)

        if (turnedOn) {
            executeTurnOnHrMonitoring()
        } else {
            executeTurnOffHrMonitoring()
        }
    }

    /**
     * detect interval setting change.
     * @param {string} value 
     */
    function onChangeInterval(value) {
        setIntervalVisible(false)
        setIntervalMode(value)
        onChangeHrMonitorInterval(value)
    }

    return (
        <HrMonitoringSettingComponent
            monitoringIntervals={monitoringIntervals}
            intervalMode={intervalMode}
            intervalVisible={intervalVisible}
            setIntervalVisible={setIntervalVisible}
            onChangeInterval={onChangeInterval}
            updateHrMonitor={updateHrMonitor}
            onPressHeaderBackIcon={onPressHeaderBackIcon}
        />
    )
}

export default HrMonitoringSettingContainer