import { useEffect, useState } from "react"
import Constants from "../../../utils/Constants"
import { logDebug, outputErrorLog } from "../../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"
import RequestAuthUseCase from "../../../domain/usecases/bluetooth/feature/authentication/RequestAuthUseCase"

const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * home main screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const HomeContainer = () => {

    /**
     * use state for ble command testing result.
     */
    const [bleTestingResult, setBleTestingResult] = useState([])

    /**
     * usecase functions for controlling ble data.
     */
    const { executeRequestAuthUseCase } = RequestAuthUseCase()

    /**
     * add ble command testing result.
     */
    addBleTestingResult = () => {
        setBleTestingResult((currentCourseGoals) => [
            ...currentCourseGoals,
            { text: enteredGoalText, id: Math.random().toString() },
        ])
    }

    onWriteWithoutResponse = () => {
        executeRequestAuthUseCase().then(() => {
            logDebug(LOG_TAG, "<<< succeeded to execute request authentication use case")

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by executeRequestAuthUseCase")
        })
    }

    useEffect(() => {
        logDebug(LOG_TAG, "useEffect is executed")


    }, [])

    return (
        <HomeComponent
            onWriteWithoutResponse={onWriteWithoutResponse}
            bleTestingResult={bleTestingResult}
        />
    )
}

export default HomeContainer
