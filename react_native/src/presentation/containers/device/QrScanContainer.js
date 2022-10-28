import QrScanComponent from './QrScanComponent'
import { logDebug } from '../../../utils/logger/Logger'
import Constants from '../../../utils/Constants'
import React, { useState } from 'react'

const LOG_TAG = Constants.LOG.QR_SCAN
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
    const [isShow, setIsShow] = useState(false)
    const [contentError] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [isDisable, setIsDisable] = useState(true)
    const [bottomHeight, setBottomHeight] = useState(0)
    const [square, setSquare] = useState(0)

    onSuccess = (deviceName) => {
        logDebug(LOG_TAG, "<<< deviceName by qr scan: " + deviceName)
        navigation.navigate(NEXT_SCREEN)
    }

    updateState = (value) => {
        setInputValue(value)
        setIsDisable(value.length === 15 && /^\d+$/.test(value) ? false : true)
    }

    navigatePop = () => navigation.pop

    onNotNowPressed = () => navigation.navigate(NEXT_SCREEN_BY_NOT_NOW, { byNotNow: true })

    return (
        <QrScanComponent
            isShow={isShow}
            contentError={contentError}
            inputValue={inputValue}
            isDisable={isDisable}
            onSuccess={onSuccess}
            back={navigatePop}
            setSquare={setSquare}
            setBottomHeight={setBottomHeight}
            bottomHeight={bottomHeight}
            square={square}
            updateState={updateState}
            onNotNowPressed={onNotNowPressed}
            setIsShow={setIsShow}
        />
    )
}
export default QrScanContainer