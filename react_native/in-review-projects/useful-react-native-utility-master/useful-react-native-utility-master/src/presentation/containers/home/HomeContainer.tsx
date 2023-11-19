import { bleConnectionCompleteStateAtom, bleConnectionStateAtom } from '../../../data'
import { useLayoutEffect, useEffect } from "react"
import Constants from "../../../utils/Constants"
import { logDebugWithLine } from "../../../utils/logger/Logger"
import { useRecoilValue } from 'recoil'
import { useIsFocused } from "@react-navigation/native"
import HomeComponent from './HomeComponent'


const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * home main screen.
 * @return {JSX.Element}
 */
function HomeContainer(): JSX.Element {

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
        if (isHomeFocused) { }
    }, [isHomeFocused])

    /**
     * execute logic before ui rendering and painting.
     */
    useLayoutEffect(() => {
        logDebugWithLine(LOG_TAG, "bleConnectionState: " + bleConnectionState
            + ", bleConnectionCompleteState: " + bleConnectionCompleteState)

    }, [bleConnectionState, bleConnectionCompleteState])

    return (
        <HomeComponent />
    )
}

export default HomeContainer
