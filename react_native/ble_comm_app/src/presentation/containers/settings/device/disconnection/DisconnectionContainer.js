import DisconnectionComponent, { ABOUT_WATCH_STRING } from "./DisconnectionComponent"
import { useState, useLayoutEffect } from "react"
import RequestDisconnectDeviceUseCase from "../../../../../domain/usecases/bluetooth/feature/device/RequestDisconnectDeviceUseCase"
import { logDebug, outputErrorLog } from "../../../../../utils/logger/Logger"
import Constants from "../../../../../utils/Constants"
import { BackHandler } from "react-native"
import { Strings } from "../../../../../utils/theme"
import { bleDisconnectionSuccessAtom } from "../../../../../data"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { showAlertWithOneButton } from "../../../../../utils/alert/AlertUtil"

const LOG_TAG = Constants.LOG.DISCONNECTION_UI_LOG

/**
 * set to check whether a disconnect request has been made or not.
 */
let isDisconnectionTriggered = false

/**
 * device disconnection screen.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function DisconnectionContainer({ navigation }) {

  /**
   * useState code for ui interaction.
   */
  const [isDisplayPopupTwoButton, setIsDisplayPopupTwoButton] = useState(false)
  const [isDisplayPopupOneButton, setIsDisplayPopupOneButton] = useState(false)
  const [popupOneButtonMessage, setPopupOneButtonMessage] = useState("")
  const [loading] = useState(false)

  /**
   * usecase.
   */
  const { executeDisconnectDeviceUseCase } = RequestDisconnectDeviceUseCase()

  /**
   * state management variables to change UI according to Bluetooth operation state change
   */
  const bleDisconnectionSuccess = useRecoilValue(bleDisconnectionSuccessAtom)
  // added setter for testing.
  const setBleDisconnectionSuccess = useSetRecoilState(bleDisconnectionSuccessAtom)

  /**
   * when header's back icon is pressed.
   */
  onPressHeaderBackIcon = () => {
    logDebug(LOG_TAG, "<<< header back icon is pressed")
    this.handleNavigationPop()
  }

  /**
   * handle navigation's pop operation.
   */
  handleNavigationPop = () => {
    this.enableBackHandler(false)
    isDisconnectionTriggered = false
    setBleDisconnectionSuccess(false)
    navigation.pop()
  }

  /**
   * handle back key event.
   */
  handleBackButtonClick = () => {
    return isDisplayPopupTwoButton || isDisplayPopupOneButton
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
   * when pressing 'Cancel' button in the screen in which there are 'Cancel' and 'Disconnect' buttons.
   */
  onClickCancelButton = () => {
    this.handleNavigationPop()
  }

  /**
   * when pressing 'OK' button in popup with one or two buttons.
   */
  onClickOkPopup = () => {
    setIsDisplayPopupOneButton(false)

    if (popupOneButtonMessage === ABOUT_WATCH_STRING.popup.messageCompleted
      || popupOneButtonMessage === ABOUT_WATCH_STRING.popup.messageCompleted2
      || popupOneButtonMessage === ' ') {

      logDebug(LOG_TAG, "<<< 'OK' button in popup is pressed, pop navigation")
      this.handleNavigationPop()
    }
  }

  /**
   * executed logic before ui rendering and painting.
   */
  useLayoutEffect(() => {
    if (isDisconnectionTriggered) {
      if (bleDisconnectionSuccess) {
        setIsDisplayPopupOneButton(true)
        setPopupOneButtonMessage(ABOUT_WATCH_STRING.popup.messageCompleted)

        showAlertWithOneButton(ABOUT_WATCH_STRING.popup.title,
          ABOUT_WATCH_STRING.popup.messageCompleted, Strings.common.popup.ok, false, () => {
            this.onClickOkPopup()
          })

      } else {
        setIsDisplayPopupOneButton(true)
        setPopupOneButtonMessage(ABOUT_WATCH_STRING.popup.messageError)

        showAlertWithOneButton(ABOUT_WATCH_STRING.popup.title,
          ABOUT_WATCH_STRING.popup.messageError, Strings.common.popup.ok, false, () => {
            this.onClickOkPopup()
          })
      }

    } else {
      this.enableBackHandler(true)
    }
  }, [isDisconnectionTriggered, bleDisconnectionSuccess])

  /**
   * when 'Disconnect' button ui is pressed.
   */
  onClickDisconnectButton = () => {
    isDisconnectionTriggered = true

    executeDisconnectDeviceUseCase().then(() => {
      logDebug(LOG_TAG, "<<< succeeded to send disconnect message to device")
      isDisconnectionTriggered = true
      setBleDisconnectionSuccess(true)

    }).catch((e) => {
      outputErrorLog(LOG_TAG, e + " occurred by executeDisconnectDeviceUseCase")
      isDisconnectionTriggered = false
    })
  }

  /**
   * when pressing 'Cancel' button in popup with two buttons.
   */
  onCancelPopup = () => {
    setIsDisplayPopupTwoButton(false)
    setIsDisplayPopupOneButton(false)
  }

  return (
    <DisconnectionComponent
      onPressHeaderBackIcon={onPressHeaderBackIcon}
      onClickCancelButton={onClickCancelButton}
      onClickDisconnectButton={onClickDisconnectButton}
      onCancelPopup={onCancelPopup}
      onClickOkPopup={onClickOkPopup}
      loading={loading}
      isDisplayPopupTwoButton={isDisplayPopupTwoButton}
      popupOneButtonMessage={popupOneButtonMessage}
      isDisplayPopupOneButton={isDisplayPopupOneButton}
    />
  )
}