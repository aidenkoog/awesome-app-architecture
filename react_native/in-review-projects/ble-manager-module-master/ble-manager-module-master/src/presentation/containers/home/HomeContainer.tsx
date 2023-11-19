import { bleConnectionCompleteStateAtom, bleConnectionStateAtom } from '../../../data'
import { navigateToNextScreen } from "../../../utils/navigation/NavigationUtil"
import { useLayoutEffect, useEffect } from "react"
import Constants from "../../../utils/Constants"
import { logDebugWithLine } from "../../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"
import { useRecoilValue } from 'recoil'
import { useIsFocused } from "@react-navigation/native"


const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * screen navigation related constants.
 */
const HIDDEN_SPLASH_SCREEN = Constants.SCREEN.HIDDEN.SPLASH
const NAVIGATION_PURPOSE_NORMAL = Constants.NAVIGATION.PURPOSE.NORMAL
const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME


/**
 * home main screen.
 * @param {any} navigation 
 * @return {JSX.Element}
 */
function HomeContainer({ navigation }: any): JSX.Element {

    /**
     * indicate whether home is currently focused or not
     * the reason for using the focus flag below is to change the values 
     * when returning to the home screen after editing the user profile.
     */
    const isHomeFocused = useIsFocused()

    /**
     * state management variables to change UI according to Bluetooth operation state change
     */
    const bleConnectionState = useRecoilValue(bleConnectionStateAtom)
    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)

    /**
     * execute logic when screen is focused.
     */
    useEffect(() => {
        if (isHomeFocused) {
            //TODO:
        }
    }, [isHomeFocused])

    /**
     * execute logic before ui rendering and painting.
     */
    useLayoutEffect(() => {
        logDebugWithLine(LOG_TAG, "bleConnectionState: " + bleConnectionState
            + ", bleConnectionCompleteState: " + bleConnectionCompleteState)

    }, [bleConnectionState, bleConnectionCompleteState])

    /**
     * enter the hidden menu for testing ble messages.
     */
    const onEnterHiddenMenu = () => {
        navigateToNextScreen(
            navigation, HIDDEN_SPLASH_SCREEN, NAVIGATION_NO_DELAY_TIME, NAVIGATION_PURPOSE_NORMAL
        )
    }

    return (
        <HomeComponent onEnterHiddenMenu={onEnterHiddenMenu} />
    )
}

export default HomeContainer
