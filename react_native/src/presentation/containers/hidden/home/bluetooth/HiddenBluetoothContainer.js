import { useEffect, useState } from 'react'
import Constants from '../../../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../../../utils/logger/Logger'
import HiddenBluetoothComponent from './HiddenBluetoothComponent'
import RequestAuthUseCase from '../../../../../domain/usecases/bluetooth/feature/authentication/RequestAuthUseCase'
import { useRecoilState } from 'recoil'
import { bleWriteResponseAtom } from '../../../../../data'
import SendBleLogUseCase from '../../../../../domain/usecases/bluetooth/feature/log/SendBleLogUseCase'

const LOG_TAG = Constants.LOG.HIDDEN_BT_UI_LOG

const HiddenBluetoothContainer = ({ }) => {

    /**
     * use state for UI interacting.
     */
    const [logMessages, setLogMessages] = useState([])

    /**
     * usecases.
     */
    const { executeRequestAuthUseCase } = RequestAuthUseCase()
    const { executeSendBleLogUseCase } = SendBleLogUseCase()

    /**
     * state management variables to change UI according to Bluetooth operation state change.
     * Refs. recoil doesn't send any event if atom data is the same with previous's.
     */
    const [bleWriteResponse] = useRecoilState(bleWriteResponseAtom)

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

        switch (itemId) {
            case 'bt_t1':
                addLogMessageHandler(">>> execute Authenticate-Device")
                executeRequestAuthUseCase().catch((e) => {
                    outputErrorLog(LOG_TAG, e + " occurred by executeRequestAuthUseCase")
                })
                break

            case 'bt_t2':
                addLogMessageHandler(">>> execute Sync-Device-Info")
                break

            case 'bt_t3':
                addLogMessageHandler(">>> execute Disconnect-Device")
                break

            case 'bt_t4':
                addLogMessageHandler(">>> execute Upgrade-FW")
                break

            case 'bt_t5':
                addLogMessageHandler(">>> execute Battery-Level")
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
     * execute logic when screen is focused.
     */
    useEffect(() => {
        logDebug(LOG_TAG, "<<< useEffect is called")
        addLogMessageHandler(bleWriteResponse)

    }, [bleWriteResponse])

    return (
        <HiddenBluetoothComponent
            logMessages={logMessages}
            onPressTestCase={onPressTestCase}
        />
    )
}
export default HiddenBluetoothContainer