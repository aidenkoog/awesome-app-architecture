import Constants from "../../../utils/Constants"
import { logDebug } from "../../../utils/Logger"

const LOG_TAG = Constants.LOG.SERVER_REPO_LOG

/**
 * implemented apis related to server mobile functions.
 * @returns {Any}
 */
const ServerRepository = () => {

    signUp = () => {
        logDebug(LOG_TAG, ">>> sign up")
    }

    login = () => {
        logDebug(LOG_TAG, ">>> login")

    }

    logout = () => {
        logDebug(LOG_TAG, ">>> logout")

    }

    withdraw = () => {
        logDebug(LOG_TAG, ">>> withdraw")
    }

    registerDevice = () => {
        logDebug(LOG_TAG, ">>> register device")

    }

    return {
        signUp,
        login,
        logout,
        withdraw,
        registerDevice
    }
}

export default ServerRepository