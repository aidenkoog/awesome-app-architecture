import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const CheckPermissionUseCase = () => {

    executeBluetoothPermissionUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeBluetoothPermissionUseCase")
    }

    executeCheckReadContactPermission = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeCheckReadContactPermission")
    }

    executeCheckCallPhonePermission = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeCheckCallPhonePermission")
    }

    executeCheckSendSmsPermission = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeCheckSendSmsPermission")
    }

    executeCheckCameraPermission = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeCheckCameraPermission")
    }

    return {
        executeBluetoothPermissionUseCase,
        executeCheckReadContactPermission,
        executeCheckCallPhonePermission,
        executeCheckSendSmsPermission,
        executeCheckCameraPermission
    }
}

export default CheckPermissionUseCase