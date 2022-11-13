import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'
import { checkBluetoothPermission, requestCameraPermission } from '../../../utils/permission/PermissionUtil.js'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const CheckPermissionUseCase = () => {

    /**
     * execute usecase of checking bluetooth related permissions.
     */
    executeBluetoothPermissionUseCase = (onResult) => {
        logDebugWithLine(LOG_TAG, "execute BluetoothPermissionUseCase with callback")

        checkBluetoothPermission((accepted) => {
            onResult(accepted)
        })
    }

    /**
     * execute usecase of checking camera related premissions.
     * @returns {Promise}
     */
    executeCheckCameraPermission = () => {
        logDebugWithLine(LOG_TAG, "execute CheckCameraPermission")

        return new Promise((fulfill, reject) => {
            requestCameraPermission().then((accepted) => {
                fulfill(accepted)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * @Deprecated
     */
    executeCheckReadContactPermission = () => {
        logDebugWithLine(LOG_TAG, "execute CheckReadContactPermission")
    }

    /**
     * @Deprecated
     */
    executeCheckCallPhonePermission = () => {
        logDebugWithLine(LOG_TAG, "execute CheckCallPhonePermission")
    }

    /**
     * @Deprecated
     */
    executeCheckSendSmsPermission = () => {
        logDebugWithLine(LOG_TAG, "execute CheckSendSmsPermission")
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