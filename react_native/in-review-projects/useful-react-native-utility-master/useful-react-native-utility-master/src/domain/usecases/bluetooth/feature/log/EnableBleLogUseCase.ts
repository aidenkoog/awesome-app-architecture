import BleRepository from '../../../../../data/repositories/ble/BleRepository'
import Constants from '../../../../../utils/Constants'
import { logDebugWithLine } from '../../../../../utils/logger/Logger'

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
    const executeEnableBleLogUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute EnableBleLogUseCase")
        enableBleLog(true)
    }

    /**
     * execute usecase of disabling ble log.
     */
    const executeDisableBleLogUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute DisableBleLogUseCase")
        enableBleLog(false)
    }

    /**
     * execute usecase of getting current log enable state.
     * @return {boolean}
     */
    const executeGetLogEnableState = (): boolean => {
        return getCurrentLogEnableState()
    }

    return {
        executeEnableBleLogUseCase,
        executeDisableBleLogUseCase,
        executeGetLogEnableState
    }
}

export default EnableBleLogUseCase