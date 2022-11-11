import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'
import { checkBluetoothPermission } from '../../../utils/permission/PermissionUtil.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const CheckPermissionUseCase = () => {

    executeBluetoothPermissionUseCase = () => {
        logDebugWithLine(LOG_TAG, "execute BluetoothPermissionUseCase")

        return new Promise((fulfill) => {
            checkBluetoothPermission((accepted) => {
                fulfill(accepted)
            })
        })
    }

    executeCheckReadContactPermission = () => {
        logDebugWithLine(LOG_TAG, "execute CheckReadContactPermission")
    }

    executeCheckCallPhonePermission = () => {
        logDebugWithLine(LOG_TAG, "execute CheckCallPhonePermission")
    }

    executeCheckSendSmsPermission = () => {
        logDebugWithLine(LOG_TAG, "execute CheckSendSmsPermission")
    }

    executeCheckCameraPermission = () => {
        logDebugWithLine(LOG_TAG, "execute CheckCameraPermission")
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