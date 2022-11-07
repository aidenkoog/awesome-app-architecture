import { useEffect, useState } from "react"
import Constants from "../../../../utils/Constants"
import { logDebug } from "../../../../utils/logger/Logger"
import HiddenHomeComponent from "./HiddenHomeComponent"

const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * hidden home main screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const HiddenHomeContainer = () => {

    useEffect(() => {
        logDebug(LOG_TAG, "useEffect is executed")
    }, [])

    return (
        <HiddenHomeComponent />
    )
}

export default HiddenHomeContainer
