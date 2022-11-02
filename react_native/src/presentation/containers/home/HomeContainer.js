import { useLayoutEffect, useState } from "react"
import Constants from "../../../utils/Constants"
import { logDebug } from "../../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"

const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * home main screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
function HomeContainer({ route }) {

    useLayoutEffect(() => {
        logDebug(LOG_TAG, "useEffect is executed")

    }, [])

    return (
        <HomeComponent
            isDeviceRegistered={route.params.isDeviceRegistered}
        />
    )
}

export default HomeContainer
