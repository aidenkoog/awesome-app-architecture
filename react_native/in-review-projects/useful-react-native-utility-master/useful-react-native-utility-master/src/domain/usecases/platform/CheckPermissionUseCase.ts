import {
    checkBluetoothPermission, checkCallPhonePermission,
    checkCameraPermission, checkReadContactPermission,
    checkSendSmsPermission
} from '../../../utils/permission/PermissionUtil'
import Constants from '../../../utils/Constants'
import { logDebugWithLine } from '../../../utils/logger/Logger'


const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const CheckPermissionUseCase = () => {

    /**
     * execute usecase of checking bluetooth related permissions.
     */
    const executeBluetoothPermissionUseCase = (onResult: any) => {
        logDebugWithLine(LOG_TAG, "execute BluetoothPermissionUseCase with callback")

        checkBluetoothPermission((accepted: any) => {
            onResult(accepted)
        })
    }

    /**
     * execute usecase of checking camera related premissions.
     * @return {Promise}
     */
    const executeCheckCameraPermission = (): Promise<any> => {
        logDebugWithLine(LOG_TAG, "execute CheckCameraPermission")

        return new Promise((fulfill, reject) => {
            checkCameraPermission().then((accepted: any) => {
                fulfill(accepted)

            }).catch((e: any) => {
                reject(e)
            })
        })
    }

    /**
     * exeucte usecase of checking read-contact permission.
     */
    const executeCheckReadContactPermission = (onResult: any) => {
        logDebugWithLine(LOG_TAG, "execute CheckReadContactPermission")

        checkReadContactPermission((accepted: any) => {
            onResult(accepted)
        })
    }

    /**
     * execute usecase of checking call-phone permission.
     */
    const executeCheckCallPhonePermission = (onResult: (arg: any) => void) => {
        logDebugWithLine(LOG_TAG, "execute CheckCallPhonePermission")

        checkCallPhonePermission((accepted: any) => {
            onResult(accepted)
        })
    }

    /**
     * execute usecase of checking send-sms permission.
     */
    const executeCheckSendSmsPermission = (onResult: (arg: any) => void) => {
        logDebugWithLine(LOG_TAG, "execute CheckSendSmsPermission")

        checkSendSmsPermission((accepted: any) => {
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