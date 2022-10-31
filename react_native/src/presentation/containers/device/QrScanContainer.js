import QrScanComponent from './QrScanComponent'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import Constants from '../../../utils/Constants'
import React, { useState } from 'react'
import { storeBleDeviceName } from '../../../utils/storage/StorageUtil'

const LOG_TAG = Constants.LOG.QR_SCAN

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
const QrScanContainer = ({ navigation }) => {

    /**
     * useState code for ui interaction.
     */
    const [contentError] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [isDisable, setIsDisable] = useState(true)
    const [bottomHeight, setBottomHeight] = useState(0)
    const [square, setSquare] = useState(0)

    /**
     * qr scanner's reference.
     */
    const scanner = React.useRef('')

    /**
     * received device name when qr scan is executed successfully.
     */
    onSuccess = (deviceName) => {
        logDebug(LOG_TAG, "<<< deviceName by qr scan: " + deviceName)

        // store device name to local storage and navigate to bluetooth pairing / connection screen. 
        storeBleDeviceName(deviceName).then(() => {
            navigation.navigate(NEXT_SCREEN)

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
    navigatePop = () => navigation.pop

    /**
     * move to home screen with the flag indicates that 'Now now' button is pressed.
     */
    onNotNowPressed = () => navigation.navigate(NEXT_SCREEN_BY_NOT_NOW, { byNotNow: true })

    return (
        <QrScanComponent
            contentError={contentError}
            inputValue={inputValue}
            isDisable={isDisable}
            onSuccess={onSuccess}
            back={navigatePop}
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