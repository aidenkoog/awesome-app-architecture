import { useEffect, useState } from 'react';
import { logDebug, outputErrorLog } from '../../../../utils/logger/Logger';
import HiddenBluetoothComponent from './HiddenBluetoothComponent';
import { useRecoilValue } from 'recoil';
import {
  bleCharacteristcChangeAtom,
  bleConnectionCompleteStateAtom,
  bleDeviceNameAtom,
  bleDeviceSettingInfoAtom,
  bleMacOrUuidAtom,
  bleWriteResponseAtom,
} from '../../../../data';
import SendBleLogUseCase from '../../../../domain/usecases/bluetooth/feature/log/SendBleLogUseCase';
import { showAlertWithOneButton } from '../../../../utils/alert/AlertUtil';
import GetBatteryLevelUseCase from '../../../../domain/usecases/bluetooth/basic/GetBatteryLevelUseCase';
import {
  bleBatteryUuidNotificationStateAtom,
  bleFlowControlUuidNotificationStateAtom,
  bleTxUuidNotificationStateAtom,
} from '../../../../data/adapters/recoil/bluetooth/BleNotificationAtom';
import SetMtuUseCase from '../../../../domain/usecases/bluetooth/basic/detail/SetMtuUseCase';
import ConnectBleUseCase from '../../../../domain/usecases/bluetooth/basic/ConnectBleUseCase';
import {
  BATTERY_CHARACTERISTIC_UUID,
  BATTERY_SERVICE_UUID,
  RX_CHARACTERISTIC_UUID,
  SERVICE_UUID,
  TX_CHARACTERISTIC_UUID,
} from '../../../../utils/ble/BleConfig';
import { Platform } from 'react-native';
import { getCurrentTime } from '../../../../utils/time';
import EnableBleLogUseCase from '../../../../domain/usecases/bluetooth/feature/log/EnableBleLogUseCase';
import Constants from '../../../../utils/Constants';

const LOG_TAG = Constants.LOG.HIDDEN_BT_UI_LOG;
const WELCOME_MESSAGE = '>>> Welcome to the Bluetooth test screen.';

/**
 * flag for the purpose of determining whether it is the first entry.
 */
let isFirstEntry = false;

/**
 * device name and mac address for reconnecting device.
 */
let deviceName = '';
let deviceMacAddress = '';

/**
 * auto test mode.
 */
let isAutoTestMode = false;
let autoTestIndex = 0;

/**
 * check if ble custom message is sent to device.
 */
let isBleMessageSent = false;

/**
 * bluetooth api test screen.
 * @return {JSX.Element}
 */
const HiddenBluetoothContainer = (): JSX.Element => {
  /**
   * use state for UI interacting.
   */
  const [logMessages, setLogMessages] = useState([] as any);
  const [popupVisible, setPopupVisible] = useState(false);
  const [nameErrorHintMessage, setNameErrorHintMessage] = useState('');
  const [macAddressErrorHintMessage, setMacAddressErrorHintMessage] =
    useState('');
  const [okButtonDisable, setOkButtonDisable] = useState(true);

  /**
   * usecases.
   */
  const { executeSendBleLogUseCase } = SendBleLogUseCase();
  const { executeGetBatteryLevelUseCase } = GetBatteryLevelUseCase();
  const { executeSetMtuUseCase } = SetMtuUseCase();

  const { executeStartScanUseCase, executeReconnectBleDeviceUseCase } =
    ConnectBleUseCase();

  const {
    executeEnableBleLogUseCase,
    executeDisableBleLogUseCase,
    executeGetLogEnableState,
  } = EnableBleLogUseCase();

  /**
   * state management variables to change UI according to Bluetooth operation state change.
   * Refs. recoil doesn't send any event if atom data is the same with previous's.
   */
  const bleWriteResponse = useRecoilValue(bleWriteResponseAtom);
  const bleConnectionCompleteState = useRecoilValue(
    bleConnectionCompleteStateAtom,
  );
  const bleTxUuidNotificationState = useRecoilValue(
    bleTxUuidNotificationStateAtom,
  );
  const bleFlowControlUuidNotificationState = useRecoilValue(
    bleFlowControlUuidNotificationStateAtom,
  );
  const bleBatteryUuidNotificationState = useRecoilValue(
    bleBatteryUuidNotificationStateAtom,
  );
  const bleDeviceName = useRecoilValue(bleDeviceNameAtom);
  const bleMacOrUuid = useRecoilValue(bleMacOrUuidAtom);
  const bleCharacteristcChange = useRecoilValue(bleCharacteristcChangeAtom);
  const bleDeviceSettingInfo = useRecoilValue(bleDeviceSettingInfoAtom);

  /**
   * store log message by sender or receiver.
   * and then it is delivered to HiddenBluetoothComponent for logs.
   * @param {string} logMessageToAdd
   */
  function addLogMessageHandler(logMessageToAdd: any) {
    if (logMessageToAdd == null || logMessageToAdd == '') {
      return;
    }
    setLogMessages((currentLogMessages: any) => [
      ...currentLogMessages,
      {
        text: '[' + getCurrentTime() + ']' + logMessageToAdd,
        id: Math.random().toString(),
      },
    ]);
  }

  /**
   * test items automatically.
   */
  const executeAutoTestCase = () => {
    isAutoTestMode = true;
    autoTestIndex = 0;
    onPressTestCase('bt_t00');
  };

  /**
   * execute next testcase (only in case of auto test mode)
   */
  const executeNextTestCase = () => {
    if (!isAutoTestMode) {
      return;
    }
    if (autoTestIndex == 10) {
      autoTestIndex = 0;
      isAutoTestMode = false;
      addLogMessageHandler(
        '\n---------------------------------------------------\nAuto Test Finished',
      );
      return;
    }
    const nextTestCaseId = 'bt_t' + autoTestIndex++;
    logDebug(LOG_TAG, '>>> nextTestCase id: ' + nextTestCaseId);
    onPressTestCase(nextTestCaseId);
  };

  /**
   * detect event occurred when testcase item is pressed.
   * [ Testcases ]
   */
  const onPressTestCase = (itemId: string) => {
    logDebug(LOG_TAG, '<<< pressed item id: ' + itemId);

    if (!bleConnectionCompleteState) {
      addLogMessageHandler('BLE disconnected. cannot execute testcase !!!');
      return;
    }

    switch (itemId) {
      case 'bt_t01':
        addLogMessageHandler(
          '>>> execute Auto-Test\n---------------------------------------------------\n',
        );
        executeAutoTestCase();
        break;

      case 'bt_t00':
        addLogMessageHandler('>>> execute Clear-Screen');
        setLogMessages([]);
        executeNextTestCase();
        break;

      case 'bt_t0':
        executeGetBatteryLevelUseCase()
          .then(batteryLevel => {
            addLogMessageHandler(
              '<<< Succeeded to get battery level of device',
            );
            addLogMessageHandler(getWelcomeMessage(batteryLevel));
            addLogMessageHandler('<<< Succeeded to show welcome message');
            executeNextTestCase();
          })
          .catch(e => {
            outputErrorLog(
              LOG_TAG,
              e + ' occurred by executeGetBatteryLevelUseCase',
            );
            addLogMessageHandler('<<< Failed to get battery level of device');
            executeNextTestCase();
          });
        break;

      case 'bt_t1':
        addLogMessageHandler('>>> execute Authenticate-Device');
        isBleMessageSent = true;

        addLogMessageHandler('<<< No Apis');
        executeNextTestCase();
        break;

      case 'bt_t2':
        addLogMessageHandler('>>> execute Sync-Device-Info');
        isBleMessageSent = true;

        addLogMessageHandler('<<< No Apis');
        executeNextTestCase();
        break;

      case 'bt_t3':
        addLogMessageHandler('>>> execute Disconnect-Device');
        isBleMessageSent = true;

        addLogMessageHandler('<<< No Apis');
        executeNextTestCase();
        break;

      case 'bt_t4':
        addLogMessageHandler('>>> execute Upgrade-FW');
        addLogMessageHandler('<<< Upgrade-FW is NOT supported yet !!!');
        executeNextTestCase();
        break;

      case 'bt_t5':
        addLogMessageHandler('>>> execute Battery-Level');
        executeGetBatteryLevelUseCase()
          .then(batteryLevel => {
            addLogMessageHandler(
              '<<< Succeeded to get battery level of device',
            );
            addLogMessageHandler('<<< [Battery Level]: ' + batteryLevel);
            executeNextTestCase();
          })
          .catch(e => {
            outputErrorLog(
              LOG_TAG,
              e + ' occurred by executeGetBatteryLevelUseCase',
            );
            addLogMessageHandler('<<< Failed to get battery level of device');
            executeNextTestCase();
          });
        break;

      case 'bt_t6':
        addLogMessageHandler('>>> Show popup for reconnecting BLE device');
        setPopupVisible(true);

        if (isAutoTestMode) {
          setTimeout(() => {
            setPopupVisible(false);
            executeNextTestCase();
          }, 1000);
        }
        break;

      case 'bt_t7':
        addLogMessageHandler('>>> execute Send-Custom-Log');
        isBleMessageSent = true;

        executeSendBleLogUseCase()
          .then(() => {
            addLogMessageHandler('<<< [ SEND-CUSTOM-LOG ] Succeeded to write');
            executeNextTestCase();
          })
          .catch(e => {
            isBleMessageSent = false;
            outputErrorLog(
              LOG_TAG,
              e + ' occurred by executeSendBleLogUseCase',
            );
            addLogMessageHandler('<<< Failed to send ble log message');
            executeNextTestCase();
          });
        break;

      case 'bt_t8':
        addLogMessageHandler('>>> execute Send-Custom-Message');
        isBleMessageSent = true;

        executeSendBleLogUseCase()
          .then(() => {
            addLogMessageHandler(
              '<<< [ SEND-CUSTOM-MESSAGE ] Succeeded to write',
            );
            executeNextTestCase();
          })
          .catch(e => {
            isBleMessageSent = false;
            outputErrorLog(
              LOG_TAG,
              e + ' occurred by executeSendBleLogUseCase',
            );
            addLogMessageHandler('<<< Failed to send ble custom message');
            executeNextTestCase();
          });
        break;

      case 'bt_t9':
        addLogMessageHandler('>>> execute Set-MTU 512');
        executeSetMtuUseCase(512)
          .then(mtu => {
            addLogMessageHandler('<<< Succeeded to set MTU: ' + mtu);
            executeNextTestCase();
          })
          .catch(e => {
            outputErrorLog(LOG_TAG, e + ' occurred by executeSetMtuUseCase');
            addLogMessageHandler('<<< Failed to set MTU');
            executeNextTestCase();
          });
        break;

      case 'bt_t10':
        addLogMessageHandler('>>> execute Start-Scan');
        executeStartScanUseCase().catch(e => {
          outputErrorLog(LOG_TAG, e + ' occurred by executeStartScanUseCase');
        });
        break;

      case 'bt_t11':
        addLogMessageHandler('>>> execute En/Disable-Log');
        if (executeGetLogEnableState()) {
          executeDisableBleLogUseCase();
        } else {
          executeEnableBleLogUseCase();
        }
        break;
    }
  };

  /**
   * create welcome message.
   * @return {string}
   */
  const getWelcomeMessage = (batteryLevel: any): string => {
    const welcomeMessage =
      WELCOME_MESSAGE +
      '\n' +
      '---------------------------------------------------\n' +
      '1. [Battery Level]: ' +
      batteryLevel +
      '\n' +
      '2. [BLE Connection]: ' +
      bleConnectionCompleteState +
      '\n' +
      '3. [TX Enable]: ' +
      bleTxUuidNotificationState +
      '\n' +
      '4. [Flow-Control Enable]: ' +
      bleFlowControlUuidNotificationState +
      '\n' +
      '5. [BAS Enable]: ' +
      bleBatteryUuidNotificationState +
      '\n' +
      '6. [Device Name]: ' +
      bleDeviceName +
      '\n' +
      '7. [OS]: ' +
      (Platform.OS === 'android' ? 'Android' : 'iOS') +
      '\n' +
      '8. [Device MAC(UUID)]: ' +
      bleMacOrUuid +
      '\n' +
      '9. [iccid]: ' +
      bleDeviceSettingInfo.iccid +
      '\n' +
      '10. [BT MAC]: ' +
      bleDeviceSettingInfo.btMacAddress +
      '\n' +
      '11. [WiFi MAC]: ' +
      bleDeviceSettingInfo.wifiMacAddress +
      '\n' +
      '12. [Modem SW Version]: ' +
      bleDeviceSettingInfo.modemSwVersion +
      '\n' +
      '13. [Modem HW Version]: ' +
      bleDeviceSettingInfo.modemHwVersion +
      '\n' +
      '14. [Sensor SW Version]: ' +
      bleDeviceSettingInfo.sensorSwVersion +
      '\n' +
      '------------------- UUIDs -------------------\n' +
      '1. [Service]: ' +
      SERVICE_UUID +
      '\n' +
      '2. [RX]: ' +
      RX_CHARACTERISTIC_UUID +
      '\n' +
      '3. [TX]: ' +
      TX_CHARACTERISTIC_UUID +
      '\n' +
      '4. [BAS Service]: ' +
      BATTERY_SERVICE_UUID +
      '\n' +
      '5. [BAS]: ' +
      BATTERY_CHARACTERISTIC_UUID +
      '\n' +
      '6. [Flow-Control]: ' +
      BATTERY_CHARACTERISTIC_UUID +
      '\n' +
      '---------------------------------------------------\n';
    return welcomeMessage;
  };

  /**
   * execute logic when screen is focused.
   */
  useEffect(() => {
    logDebug(LOG_TAG, '<<< isFirstEntry: ' + isFirstEntry);

    if (!isFirstEntry) {
      executeGetBatteryLevelUseCase()
        .then(batteryLevel => {
          addLogMessageHandler(getWelcomeMessage(batteryLevel));
        })
        .catch(e => {
          outputErrorLog(
            LOG_TAG,
            e + ' occurred by executeGetBatteryLevelUseCase',
          );
        });
      isFirstEntry = true;
    }

    if (!bleConnectionCompleteState) {
      addLogMessageHandler('BLE Disconnected !!!');
      showAlertWithOneButton(
        'Error',
        'Bluetooth is disconnected',
        'OK',
        false,
        () => { },
      );
    }

    if (isBleMessageSent) {
      if (
        bleWriteResponse != null &&
        bleWriteResponse != undefined &&
        bleWriteResponse != ''
      ) {
        addLogMessageHandler(bleWriteResponse);
      }
      isBleMessageSent = false;
    }

    if (
      bleCharacteristcChange != null &&
      bleCharacteristcChange != undefined &&
      bleCharacteristcChange != ''
    ) {
      logDebug(
        LOG_TAG,
        'check bleCharacteristic before setting log: ' + bleCharacteristcChange,
      );
      addLogMessageHandler(
        '\n---------------------------------------------------\n' +
        '<<< response:\n' +
        bleCharacteristcChange +
        '\n---------------------------------------------------\n',
      );
    }
  }, [
    bleWriteResponse,
    bleCharacteristcChange,
    bleConnectionCompleteState,
    isFirstEntry,
  ]);

  /**
   * handle OK button event of popup for reconnecting ble device.
   */
  const handleOkPopup = () => {
    setPopupVisible(false);

    if (
      deviceName.length < 15 ||
      deviceName == '' ||
      deviceMacAddress.length < 12 ||
      deviceMacAddress == ''
    ) {
      outputErrorLog(LOG_TAG, 'wrong device information input');
      return;
    }

    let macAddressWithColon = '';
    const deviceMacAddressLength = deviceMacAddress.length;

    for (let i = 0; i < deviceMacAddressLength / 2; i++) {
      if (i == deviceMacAddressLength / 2 - 1) {
        macAddressWithColon += deviceMacAddress.substring(i + i, i + i + 2);
      } else {
        macAddressWithColon +=
          deviceMacAddress.substring(i + i, i + i + 2) + ':';
      }
    }
    logDebug(LOG_TAG, '>>> macAddressWithColon: ' + macAddressWithColon);

    addLogMessageHandler(
      '>>> trying to reconnect ble device...\n' +
      '1. Device Name to connect: ' +
      deviceName +
      '\n' +
      '2. MAC Address to connect: ' +
      macAddressWithColon,
    );

    executeReconnectBleDeviceUseCase(deviceName, macAddressWithColon).catch(
      e => {
        outputErrorLog(
          LOG_TAG,
          e + ' occurred by executeReconnectBleDeviceUseCase',
        );
        addLogMessageHandler('<<< Failed to reconnect device !!!');
      },
    );
  };

  /**
   * handle event occurred when cancel button is pressed.
   */
  const handleCancelPopup = () => {
    setPopupVisible(false);
  };

  /**
   * handle event occurred when device name is input.
   */
  const onDeviceNameChanged = (value: string) => {
    deviceName = value;
    if (deviceName == '') {
      setNameErrorHintMessage('');
      setOkButtonDisable(true);
    } else {
      if (deviceName.length < 15) {
        setNameErrorHintMessage('Please enter 15 digits.');
        setOkButtonDisable(true);
      } else {
        setNameErrorHintMessage('');
        setOkButtonDisable(false);
      }
    }
  };

  /**
   * handle event occurred when device mac address is input.
   */
  const onDeviceMacAddressChanged = (value: string) => {
    deviceMacAddress = value;
    if (deviceMacAddress == '') {
      setMacAddressErrorHintMessage('');
      setOkButtonDisable(true);
    } else {
      if (deviceMacAddress.length < 12) {
        setMacAddressErrorHintMessage(
          'Please enter 12 digits without colon(:).',
        );
        setOkButtonDisable(true);
      } else {
        setMacAddressErrorHintMessage('');
        setOkButtonDisable(false);
      }
    }
  };

  return (
    <HiddenBluetoothComponent
      logMessages={logMessages}
      onPressTestCase={onPressTestCase}
      handleOkPopup={handleOkPopup}
      handleCancelPopup={handleCancelPopup}
      onDeviceNameChanged={onDeviceNameChanged}
      onDeviceMacAddressChanged={onDeviceMacAddressChanged}
      popupVisible={popupVisible}
      nameErrorHintMessage={nameErrorHintMessage}
      macAddressErrorHintMessage={macAddressErrorHintMessage}
      okButtonDisable={okButtonDisable}
    />
  );
};
export default HiddenBluetoothContainer;
