import Constants from '../../../../../utils/Constants.js'
import { logDebugWithLine } from '../../../../../utils/logger/Logger.js'
import BleRepository from '../../../../../data/repositories/ble/BleRepository.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const EnableBleLogUseCase = () => {

    /**
     * ble repository's api that sends ble characteristic message.
     */
    const {
        enableBleLog,
        getCurrentLogEnableState
    } = BleRepository()

    /**
     * execute usecase of enabling ble log.
     */
    executeEnableBleLogUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute EnableBleLogUseCase")
        enableBleLog(true)
    }

    /**
     * execute usecase of disabling ble log.
     */
    executeDisableBleLogUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute DisableBleLogUseCase")
        enableBleLog(false)
    }

    /**
     * execute usecase of getting current log enable state.
     * @returns {boolean}
     */
    executeGetLogEnableState = () => {
        return getCurrentLogEnableState()
    }

    return {
        executeEnableBleLogUseCase,
        executeDisableBleLogUseCase,
        executeGetLogEnableState
    }
}

export default EnableBleLogUseCase