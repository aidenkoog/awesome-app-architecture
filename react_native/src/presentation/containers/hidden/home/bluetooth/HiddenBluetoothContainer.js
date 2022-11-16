import { useEffect, useState } from 'react'
import Constants from '../../../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../../../utils/logger/Logger'
import HiddenBluetoothComponent from './HiddenBluetoothComponent'
import RequestAuthUseCase from '../../../../../domain/usecases/bluetooth/feature/authentication/RequestAuthUseCase'
import { useRecoilValue } from 'recoil'
import { bleCharacteristcChangeAtom, bleConnectionCompleteStateAtom, bleDeviceNameAtom, bleMacOrUuidAtom, bleWriteResponseAtom } from '../../../../../data'
import SendBleLogUseCase from '../../../../../domain/usecases/bluetooth/feature/log/SendBleLogUseCase'
import { showAlertWithOneButton } from '../../../../../utils/alert/AlertUtil'
import GetBatteryLevelUseCase from '../../../../../domain/usecases/bluetooth/basic/GetBatteryLevelUseCase'
import { bleBatteryUuidNotificationStateAtom, bleFlowControlUuidNotificationStateAtom, bleTxUuidNotificationStateAtom } from '../../../../../data/adapters/recoil/bluetooth/BleNotificationAtom'
import SyncDeviceInfoUseCase from '../../../../../domain/usecases/bluetooth/feature/device/SyncDeviceInfoUseCase'
import RequestDisconnectDeviceUseCase from '../../../../../domain/usecases/bluetooth/feature/device/RequestDisconnectDeviceUseCase'

const LOG_TAG = Constants.LOG.HIDDEN_BT_UI_LOG
const WELCOME_MESSAGE = "Welcome to the Bluetooth test screen."

/**
 * flag for the purpose of determining whether it is the first entry.
 */
let isFirstEntry = false

/**
 * bluetooth api test screen.
 * @returns {JSX.Element}
 */
const HiddenBluetoothContainer = ({ }) => {

    /**
     * use state for UI interacting.
     */
    const [logMessages, setLogMessages] = useState([])

    /**
     * usecases.
     */
    const { executeRequestAuthUseCase } = RequestAuthUseCase()
    const { executeSyncDeviceInfoUseCase } = SyncDeviceInfoUseCase()
    const { executeDisconnectDeviceUseCase } = RequestDisconnectDeviceUseCase()
    const { executeSendBleLogUseCase } = SendBleLogUseCase()
    const { executeGetBatteryLevelUseCase } = GetBatteryLevelUseCase()

    /**
     * state management variables to change UI according to Bluetooth operation state change.
     * Refs. recoil doesn't send any event if atom data is the same with previous's.
     */
    const bleWriteResponse = useRecoilValue(bleWriteResponseAtom)
    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)
    const bleTxUuidNotificationState = useRecoilValue(bleTxUuidNotificationStateAtom)
    const bleFlowControlUuidNotificationState = useRecoilValue(bleFlowControlUuidNotificationStateAtom)
    const bleBatteryUuidNotificationState = useRecoilValue(bleBatteryUuidNotificationStateAtom)
    const bleDeviceName = useRecoilValue(bleDeviceNameAtom)
    const bleMacOrUuid = useRecoilValue(bleMacOrUuidAtom)
    const bleCharacteristcChange = useRecoilValue(bleCharacteristcChangeAtom)

    /**
     * store log message by sender or receiver.
     * @param {string} logMessageToAdd 
     */
    function addLogMessageHandler(logMessageToAdd) {
        setLogMessages((currentLogMessages) => [
            ...currentLogMessages,
            { text: logMessageToAdd, id: Math.random().toString() },
        ])
    }

    /**
     * detect event occurred when testcase item is pressed.
     */
    onPressTestCase = (itemId) => {
        logDebug(LOG_TAG, "<<< pressed item id: " + itemId)

        if (!bleConnectionCompleteState) {
            addLogMessageHandler("BLE disconnected. cannot execute testcase !!!")
            return
        }

        switch (itemId) {
            case 'bt_t0':
                executeGetBatteryLevelUseCase().then((batteryLevel) => {
                    addLogMessageHandler(this.getWelcomeMessage(batteryLevel))

                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeGetBatteryLevelUseCase")
                })
                break

            case 'bt_t1':
                addLogMessageHandler(">>> execute Authenticate-Device")
                executeRequestAuthUseCase().catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeRequestAuthUseCase")
                })
                break

            case 'bt_t2':
                addLogMessageHandler(">>> execute Sync-Device-Info")
                executeSyncDeviceInfoUseCase().catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeSyncDeviceInfoUseCase")
                })
                break

            case 'bt_t3':
                addLogMessageHandler(">>> execute Disconnect-Device")
                executeDisconnectDeviceUseCase().catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeDisconnectDeviceUseCase")
                })
                break

            case 'bt_t4':
                addLogMessageHandler(">>> execute Upgrade-FW")
                break

            case 'bt_t5':
                addLogMessageHandler(">>> execute Battery-Level")
                executeGetBatteryLevelUseCase().then((batteryLevel) => {
                    addLogMessageHandler("<<< [Battery Level]: " + batteryLevel)

                }).catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeGetBatteryLevelUseCase")
                })
                break

            case 'bt_t6':
                addLogMessageHandler(">>> execute Device-Info")
                break

            case 'bt_t7':
                addLogMessageHandler(">>> execute Send-Custom-Log")
                executeSendBleLogUseCase().catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeRequestAuthUseCase")
                })
                break

            case 'bt_t8':
                addLogMessageHandler(">>> execute Send-Custom-Message")
                break

            case 'bt_t9':
                addLogMessageHandler(">>> execute Set-MTU 512")
                break

            case 'bt_t10':
                addLogMessageHandler(">>> execute Start-Scan")
                break
        }
    }

    /**
     * create welcome message.
     * @returns {string}
     */
    getWelcomeMessage = (batteryLevel) => {
        const welcomeMessage =
            WELCOME_MESSAGE + "\n"
            + "[Battery Level]: " + batteryLevel + "\n"
            + "[BLE Connection]: " + bleConnectionCompleteState + "\n"
            + "[TX Enable]: " + bleTxUuidNotificationState + "\n"
            + "[Flow-Control Enable]: " + bleFlowControlUuidNotificationState + "\n"
            + "[BAS Enable]: " + bleBatteryUuidNotificationState + "\n"
            + "[Device Name]: " + bleDeviceName + "\n"
            + "[Device MAC(UUID)]: " + bleMacOrUuid + "\n"
        return welcomeMessage
    }

    /**
     * execute logic when screen is focused.
     */
    useEffect(() => {
        if (!isFirstEntry) {
            executeGetBatteryLevelUseCase().then((batteryLevel) => {
                addLogMessageHandler(this.getWelcomeMessage(batteryLevel))

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by executeGetBatteryLevelUseCase")
            })
            isFirstEntry = true
        }

        if (!bleConnectionCompleteState) {
            addLogMessageHandler("BLE disconnected !!!")
            showAlertWithOneButton("Error", "Bluetooth is disconnected", "OK", false, () => { })
        }

        addLogMessageHandler(bleWriteResponse)
        addLogMessageHandler("<<< response:\n" + bleCharacteristcChange)

    }, [bleWriteResponse])

    return (
        <HiddenBluetoothComponent
            logMessages={logMessages}
            onPressTestCase={onPressTestCase}
        />
    )
}
export default HiddenBluetoothContainer