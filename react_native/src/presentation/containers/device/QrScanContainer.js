import QrScanComponent from './QrScanComponent'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import Constants from '../../../utils/Constants'
import React, { useState } from 'react'
import { storeBleDeviceName, storeIsDeviceRegistered } from '../../../utils/storage/StorageUtil'
import { navigateToNextScreen, pushToNextScreen } from '../../../utils/navigation/NavigationUtil'

const LOG_TAG = Constants.LOG.QR_SCAN

const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME
const NAVIGATION_PURPOSE_NORMAL = Constants.NAVIGATION.PURPOSE.NORMAL
const NAVIGATION_PURPOSE_ADD_DEVICE = Constants.NAVIGATION.PURPOSE.ADD_DEVICE

/**
 * next screen information.
 */
const NEXT_SCREEN = Constants.SCREEN.BLUETOOTH
const NEXT_SCREEN_BY_NOT_NOW = Constants.SCREEN.HOME

/**
 * qr scan screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const QrScanContainer = ({ route, navigation }) => {

    /**
     * useState code for ui interaction.
     */
    const [contentError] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [isDisable, setIsDisable] = useState(true)
    const [bottomHeight, setBottomHeight] = useState(0)
    const [square, setSquare] = useState(0)

    /**
     * load navigation's purpose.
     */
    const { purposeWhat } = route.params

    /**
     * qr scanner's reference.
     */
    const scanner = React.useRef('')

    /**
     * received device name when qr scan is executed successfully.
     */
    onQrScanSuccess = (deviceName) => {
        logDebug(LOG_TAG, "<<< deviceName by QR scan: " + deviceName)

        // store device name to local storage and navigate to bluetooth pairing / connection screen. 
        storeBleDeviceName(deviceName).then(() => {
            if (purposeWhat == NAVIGATION_PURPOSE_ADD_DEVICE) {
                pushToNextScreen(navigation, NEXT_SCREEN, NAVIGATION_NO_DELAY_TIME, NAVIGATION_PURPOSE_ADD_DEVICE)

            } else {
                navigateToNextScreen(navigation, NEXT_SCREEN, NAVIGATION_NO_DELAY_TIME, NAVIGATION_PURPOSE_NORMAL)
            }

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by storeBleDeviceName")
        })
    }

    /**
     * when the user manually inputs information on the qr scan screen, 
     * check whether the value is valid and activates the 'Next' button if it is valid.
     */
    updateState = (value) => {
        setInputValue(value)
        setIsDisable(value.length === 15 && /^\d+$/.test(value) ? false : true)
    }

    /**
     * return to the previous screen.
     */
    onPressBackIcon = () => navigation.pop()

    /**
     * move to home screen with the flag indicates that 'Now now' button is pressed.
     */
    onNotNowPressed = () => {
        storeIsDeviceRegistered(false).then(() => {
            if (purposeWhat == NAVIGATION_PURPOSE_ADD_DEVICE) {
                navigation.pop()

            } else {
                navigateToNextScreen(navigation, NEXT_SCREEN_BY_NOT_NOW, NAVIGATION_NO_DELAY_TIME, NAVIGATION_PURPOSE)
            }

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e)
        })
    }

    return (
        <QrScanComponent
            contentError={contentError}
            inputValue={inputValue}
            isDisable={isDisable}
            onQrScanSuccess={onQrScanSuccess}
            onPressBackIcon={onPressBackIcon}
            setSquare={setSquare}
            scanner={scanner}
            setBottomHeight={setBottomHeight}
            bottomHeight={bottomHeight}
            square={square}
            updateState={updateState}
            onNotNowPressed={onNotNowPressed}
        />
    )
}
export default QrScanContainer