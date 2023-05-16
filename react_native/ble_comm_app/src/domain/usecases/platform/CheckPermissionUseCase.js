import { checkBluetoothPermission, checkCallPhonePermission, checkCameraPermission, checkReadContactPermission, checkSendSmsPermission } from '../../../utils/permission/PermissionUtil.js'
import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'


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
            checkCameraPermission().then((accepted) => {
                fulfill(accepted)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * exeucte usecase of checking read-contact permission.
     */
    executeCheckReadContactPermission = (onResult) => {
        logDebugWithLine(LOG_TAG, "execute CheckReadContactPermission")

        checkReadContactPermission(accepted => {
            onResult(accepted)
        })
    }

    /**
     * execute usecase of checking call-phone permission.
     */
    executeCheckCallPhonePermission = (onResult) => {
        logDebugWithLine(LOG_TAG, "execute CheckCallPhonePermission")

        checkCallPhonePermission(accepted => {
            onResult(accepted)
        })
    }

    /**
     * execute usecase of checking send-sms permission.
     */
    executeCheckSendSmsPermission = (onResult) => {
        logDebugWithLine(LOG_TAG, "execute CheckSendSmsPermission")

        checkSendSmsPermission(accepted => {
            onResult(accepted)
        })
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