import _ from "lodash"
import Constants from "../../../../utils/Constants"
import DeviceInfoComponent from "./DeviceInfoComponent"
import { logDebug, outputErrorLog } from "../../../../utils/logger/Logger"
import GetBleDeviceInfoUseCase from "../../../../domain/usecases/bluetooth/feature/device/GetBleDeviceInfoUseCase"
import { useLayoutEffect, useState } from "react"
import { BackHandler } from "react-native"
import { pushToNextScreen } from "../../../../utils/navigation/NavigationUtil"
import { showAlertWithOneButton } from "../../../../utils/alert/AlertUtil"

const LOG_TAG = Constants.LOG.SETTINGS_UI_LOG
const DEFAULT_INFORMATION = "N/A"
const DISCONNECTION_SCREEN = Constants.SCREEN.DISCONNECTION
const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME

/**
 * device information screen.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
const DeviceInfoContainer = ({ navigation }) => {

    /**
     * useState code for ui interaction.
     */
    const [loading, setLoading] = useState(false)
    const [latest, setLatest] = useState(true)
    const [firmwareInfo, setFirmwareInfo] = useState("")
    const [deviceName, setDeviceName] = useState(DEFAULT_INFORMATION)
    const [iccid, setIccid] = useState(DEFAULT_INFORMATION)

    /**
     * usecases.
     */
    const {
        executeGetBleDeviceNameUseCase,
        executeGetBleDeviceMacAddressUseCase
    } = GetBleDeviceInfoUseCase()

    /**
     * handle navigation's pop operation.
     */
    handleNavigationPop = () => {
        this.enableBackHandler(false)
        navigation.pop()
    }

    /**
     * handle back button click event. (android)
     * @returns {boolean}
     */
    const handleBackButtonClick = () => {
        this.handleNavigationPop()
        return true
    }

    /**
     * handle header's back icon press event.
     */
    const onPressHeaderBackIcon = () => {
        logDebug(LOG_TAG, "<<< header back icon is pressed")
        this.handleNavigationPop()
    }

    /**
     * enable or disable back handler.
     */
    enableBackHandler = (enabled) => {
        if (enabled) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
        } else {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
        }
    }

    /**
     * load device firmware information.
     */
    function fetchFirmwareInformation() {
        setLatest(true)
        setFirmwareInfo(DEFAULT_INFORMATION)
        logDebug(LOG_TAG, ">>> loading: " + loading
            + ", firmware: latest: " + latest
            + ", firmwareInfo: " + firmwareInfo)
    }

    /**
     * handle event occurred when software update menu is pressed.
     */
    function onPressSoftwareUpdate() {
        showAlertWithOneButton("Warning", "A software update function will be added later.", "OK")
    }

    /**
     * load device name information.
     */
    function fetchDeviceName() {
        executeGetBleDeviceNameUseCase().then((deviceName) => {
            logDebug(LOG_TAG, "<<< deviceName: " + deviceName)
            setDeviceName(deviceName)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by executeGetBleDeviceNameUseCase")
            setLoading(false)
        })
    }

    /**
     * load device iccid information.
     */
    function fetchDeviceIccid() {
        executeGetBleDeviceMacAddressUseCase().then((deviceMacAddress) => {
            logDebug(LOG_TAG, "<<< deviceMacAddress: " + deviceMacAddress)
            setIccid(deviceMacAddress)
            setLoading(false)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by executeGetBleDeviceMacAddressUseCase")
            setLoading(false)
        })
    }

    /**
     * handle disconnect button press event.
     */
    function onHandleDisconnectDevice() {
        pushToNextScreen(navigation, DISCONNECTION_SCREEN, NAVIGATION_NO_DELAY_TIME)
    }

    /**
     * execute logic before ui rendering and painting.
     */
    useLayoutEffect(() => {
        fetchFirmwareInformation()
        fetchDeviceName()
        fetchDeviceIccid()
        enableBackHandler(true)

        return () => { }
    }, [])

    return (
        <DeviceInfoComponent
            loading={loading}
            deviceName={deviceName}
            iccid={iccid}
            latest={latest}
            firmwareInfo={firmwareInfo}
            onHandleDisconnectDevice={onHandleDisconnectDevice}
            onPressHeaderBackIcon={onPressHeaderBackIcon}
            onPressSoftwareUpdate={onPressSoftwareUpdate}
        />
    )
}

export default DeviceInfoContainer