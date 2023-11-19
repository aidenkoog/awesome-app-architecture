import { NativeModules, Platform } from 'react-native'
import Constants from '../../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../../utils/logger/Logger'

/**
 * load ble manager from native modules.
 */
const bleManager = NativeModules.BleManager
const LOG_TAG = Constants.LOG.BT_BLE_MANAGER

/**
 * max byte size
 * react-native-ble-manager's previous default value: 20 byte.
 */
const WRITE_MAX_BYTE_SIZE: number = 512

/**
 * uuid information that exists in ble device.
 */
let readServiceUuids: any[] = []
let readCharacteristicUuids: any[] = []
let writeWithResponseServiceUuids: any[] = []
let writeWithResponseCharacteristicUuids: any[] = []
let writeWithoutResponseServiceUuids: any[] = []
let writeWithoutResponseCharacteristicUuids: any[] = []
let nofityServiceUuids: any[] = []
let nofityCharacteristicUuids: any[] = []

/**
 * ble manager class.
 * library: react-native-ble-manager
 */
class BleManager {
  constructor() {
    /**
     * represent if peripheral is connected or not.
     */
    this.isPeripheralConnected = this.isPeripheralConnected.bind(this)
  }

  /**
   * read characteristic data.
   * @param {string} peripheralId 
   * @param {string} serviceUuid 
   * @param {string} characteristicUuid 
   * @return {Promise} 
   */
  read(
    peripheralId: string,
    serviceUuid: string,
    characteristicUuid: string): Promise<any> {

    return new Promise((fulfill, reject) => {
      bleManager.read(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        (error: any, data: any) => {
          if (error) {
            outputErrorLog(LOG_TAG, error)
            reject(error)
          } else {
            fulfill(data)
          }
        },
      )
    })
  }

  /**
   * read rssi ( received signal strength indication )
   * @param {string} peripheralId 
   * @return {Promise} 
   */
  readRSSI(peripheralId: string): Promise<any> {
    return new Promise((fulfill, reject) => {
      bleManager.readRSSI(peripheralId, (error: any, rssi: any) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill(rssi)
        }
      })
    })
  }

  /**
   * refresh cache which ble manager has.
   * @param {string} peripheralId 
   * @return {Promise} 
   */
  refreshCache(peripheralId: string): Promise<any> {
    return new Promise((fulfill, reject) => {
      bleManager.refreshCache(peripheralId, (error: any, result: any) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill(result)
        }
      })
    })
  }

  /**
   * retrieve services corresponding to peripheral from parameter.
   * @param {string} peripheralId 
   * @param {string[]} services 
   * @return {Promise} 
   */
  retrieveServices(peripheralId: any, services: any): Promise<any> {
    return new Promise((fulfill, reject) => {
      bleManager.retrieveServices(
        peripheralId,
        services,
        (error: any, peripheral: any) => {
          if (error) {
            reject(error)
          } else {
            fulfill(peripheral)
          }
        },
      )
    })
  }

  /**
   * write characteristic data.
   * @param {string} peripheralId 
   * @param {string} serviceUuid 
   * @param {string} characteristicUuid 
   * @param {any} data 
   * @param {any} maxByteSize 
   * @return {Promise} 
   */
  write(
    peripheralId: any,
    serviceUuid: any,
    characteristicUuid: any,
    data: any,
    maxByteSize: number | null) {

    if (maxByteSize == null) {
      maxByteSize = WRITE_MAX_BYTE_SIZE
    }

    return new Promise<void>((fulfill, reject) => {
      bleManager.write(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        data,
        maxByteSize,
        (error: string) => {
          if (error) {
            outputErrorLog(LOG_TAG, error)
            reject(error)
          } else {
            fulfill()
          }
        },
      )
    })
  }

  /**
   * write characteristic data with no response.
   * @param {string} peripheralId 
   * @param {string} serviceUuid 
   * @param {string} characteristicUuid 
   * @param {any} data 
   * @param {any} maxByteSize 
   * @param {any} queueSleepTime 
   * @return {Promise} 
   */
  writeWithoutResponse(
    peripheralId: any,
    serviceUuid: any,
    characteristicUuid: any,
    data: any,
    maxByteSize: number | null,
    queueSleepTime: number | null,
  ) {
    if (maxByteSize == null) {
      maxByteSize = WRITE_MAX_BYTE_SIZE
    }
    if (queueSleepTime == null) {
      queueSleepTime = 10
    }
    return new Promise<void>((fulfill, reject) => {
      bleManager.writeWithoutResponse(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        data,
        maxByteSize,
        queueSleepTime,
        (error: string) => {
          if (error) {
            outputErrorLog(LOG_TAG, error)
            reject(error)
          } else {
            fulfill()
          }
        },
      )
    })
  }

  /**
   * connect ble device corresponding to peripheral id from parameter.
   * @param {string} peripheralId 
   * @return {Promise}
   */
  connect(peripheralId: any): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      bleManager.connect(peripheralId, (error: any) => {
        if (error) {
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * create bond about peripheral.
   * @param {string} peripheralId 
   * @param {any} peripheralPin 
   * @return {Promise}
   */
  createBond(peripheralId: any, peripheralPin: any = null): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      bleManager.createBond(peripheralId, peripheralPin, (error: string) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * remove bond about peripheral.
   * @param {string} peripheralId 
   * @return {Promise}
   */
  removeBond(peripheralId: any): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      bleManager.removeBond(peripheralId, (error: string) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * diconnect ble device corresponding to peripheral id from parameter.
   * (default option force : true)
   * @param {string} peripheralId 
   * @param {boolean} force 
   * @return {Promise}
   */
  disconnect(peripheralId: any, force: boolean = true): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      bleManager.disconnect(peripheralId, force, (error: string) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * set-up notification about characteristic uuid.
   * @param {string} peripheralId 
   * @param {string} serviceUuid 
   * @param {string} characteristicUuid 
   * @return {Promise}
   */
  startNotification(
    peripheralId: any,
    serviceUuid: any,
    characteristicUuid: any): Promise<any> {

    return new Promise<void>((fulfill, reject) => {
      bleManager.startNotification(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        (error: any) => {
          if (error) {
            reject(error)
          } else {
            fulfill()
          }
        },
      )
    })
  }

  /**
   * enable notification about characteristic uuid with using buffer.
   * @param {string} peripheralId 
   * @param {string} serviceUuid 
   * @param {string} characteristicUuid 
   * @param {any} buffer 
   * @return {Promise}
   */
  startNotificationUseBuffer(
    peripheralId: any,
    serviceUuid: any,
    characteristicUuid: any,
    buffer: any,
  ): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      bleManager.startNotificationUseBuffer(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        buffer,
        (error: string) => {
          if (error) {
            outputErrorLog(LOG_TAG, error)
            reject(error)
          } else {
            fulfill()
          }
        },
      )
    })
  }

  /**
   * disable notification about characteristic uuid.
   * @param {string} peripheralId 
   * @param {string} serviceUuid 
   * @param {string} characteristicUuid 
   * @return {Promise}
   */
  stopNotification(
    peripheralId: any,
    serviceUuid: any,
    characteristicUuid: any): Promise<any> {

    return new Promise<void>((fulfill, reject) => {
      bleManager.stopNotification(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        (error: string) => {
          if (error) {
            outputErrorLog(LOG_TAG, error)
            reject(error)
          } else {
            fulfill()
          }
        },
      )
    })
  }

  /**
   * check ble manager state.
   */
  checkState() {
    bleManager.checkState()
  }

  /**
   * initialize ble manager module.
   * @param {any} options 
   * @return {Promise}
   */
  start(options: {} | null): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      if (options == null) {
        options = {}
      }
      logDebug(LOG_TAG, "initialize ble manager")
      bleManager.start(options, (error: any) => {
        if (error) {
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * start to scan ble devices.
   * @param {any} serviceUuids 
   * @param {number} seconds 
   * @param {boolean} allowDuplicates 
   * @param {any} scanningOptions 
   * @return {Promise}
   */
  scan(
    serviceUuids: any,
    seconds: number,
    allowDuplicates: boolean | null,
    scanningOptions: any = {}): Promise<any> {

    return new Promise<void>((fulfill, reject) => {
      if (allowDuplicates == null) {
        allowDuplicates = false
      }

      // (ANDROID) Match as many advertisement per filter as hw could allow
      // dependes on current capability and availability of the resources in hw.
      if (scanningOptions.numberOfMatches == null) {
        scanningOptions.numberOfMatches = 3
      }

      // (ANDROID) Defaults to MATCH_MODE_AGGRESSIVE
      if (scanningOptions.matchMode == null) {
        scanningOptions.matchMode = 1
      }

      // (ANDROID) Defaults to SCAN_MODE_LOW_POWER on android
      if (scanningOptions.scanMode == null) {
        scanningOptions.scanMode = 0
      }

      if (scanningOptions.reportDelay == null) {
        scanningOptions.reportDelay = 0
      }

      bleManager.scan(
        serviceUuids,
        seconds,
        allowDuplicates,
        scanningOptions,
        (error: string) => {
          if (error) {
            outputErrorLog(LOG_TAG, error)
            reject(error)
          } else {
            fulfill()
          }
        },
      )
    })
  }

  /**
   * stop to scan ble device.
   * @return {Promise}
   */
  stopScan(): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      bleManager.stopScan((error: string | null) => {
        if (error != null) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * enable bluetooth option.
   * @return {Promise}
   */
  enableBluetooth(): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      bleManager.enableBluetooth((error: string | null) => {
        if (error != null) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * get the connected peripheral device data.
   * @param {string[]} serviceUuids 
   * @return {Promise}
   */
  getConnectedPeripherals(serviceUuids: any): Promise<any> {
    return new Promise((fulfill, reject) => {
      bleManager.getConnectedPeripherals(
        serviceUuids, (error: string, result: any) => {

          if (error) {
            outputErrorLog(LOG_TAG, error)
            reject(error)
          } else if (result != null) {
            fulfill(result)
          } else {
            fulfill([])
          }
        })
    })
  }

  /**
   * get the bonded peripheral device data.
   * @return {Promise}
   */
  getBondedPeripherals(): Promise<any> {
    return new Promise((fulfill, reject) => {
      bleManager.getBondedPeripherals((error: string, result: any) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else if (result != null) {
          fulfill(result)
        } else {
          fulfill([])
        }
      })
    })
  }

  /**
   * get the peripheral devices that is discovered after scanning.
   * @return {Promise}
   */
  getDiscoveredPeripherals(): Promise<any> {
    return new Promise((fulfill, reject) => {
      bleManager.getDiscoveredPeripherals((error: string, result: any) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else if (result != null) {
          fulfill(result)
        } else {
          fulfill([])
        }
      })
    })
  }

  /**
   * remove cached peripheral device.
   * @param {string} peripheralId 
   * @return {Promise}
   */
  removePeripheral(peripheralId: any): Promise<any> {
    return new Promise<void>((fulfill, reject) => {
      bleManager.removePeripheral(peripheralId, (error: string) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * check if peripheral device corresponding to peripheral id is connected or not.
   * @param {string} peripheralId 
   * @param {any} serviceUuids 
   * @return {Promise}
   */
  isPeripheralConnected(peripheralId: string, serviceUuids: any): Promise<any> {
    return this.getConnectedPeripherals(serviceUuids).then(result => {
      if (result.find((p: { id: any }) => p.id === peripheralId)) {
        return true
      }
      return false
    })
  }

  /**
   * set-up the priority of peripheral device connection.
   * @param {string} peripheralId 
   * @param {number} connectionPriority 
   * @return {Promise}
   */
  requestConnectionPriority(peripheralId: any, connectionPriority: any): Promise<any> {
    return new Promise((fulfill, reject) => {
      bleManager.requestConnectionPriority(
        peripheralId,
        connectionPriority,
        (error: string, status: any) => {
          if (error) {
            outputErrorLog(LOG_TAG, error)
            reject(error)
          } else {
            fulfill(status)
          }
        },
      )
    })
  }

  /**
   * set ble mtu ( maximum transmission unit )
   * @param {string} peripheralId 
   * @param {number} mtu 
   * @return {Promise}
   */
  requestMTU(peripheralId: any, mtu: any): Promise<any> {
    return new Promise((fulfill, reject) => {
      bleManager.requestMTU(peripheralId, mtu, (error: string, mtu: any) => {
        if (error) {
          outputErrorLog(LOG_TAG, error)
          reject(error)
        } else {
          fulfill(mtu)
        }
      })
    })
  }

  /**
   * set-up name.
   * @param {string} name 
   */
  setName(name: any) {
    bleManager.setName(name)
  }

  /**
   * get uuid list ( notify, read, write, writeWithoutResponse service uuid, characteristic uuid )
   * this code is from stack overflow.
   * @param {any} peripheralInfo 
   * @return {string[]}
   */
  getUuidList(peripheralInfo: { characteristics: any }): string {
    for (let item of peripheralInfo.characteristics) {
      item.characteristic = this.getFullUuid(item.characteristic)
      if (Platform.OS == "android") {
        if (item.properties.Notify == "Notify") {
          nofityServiceUuids.push(item.service)
          nofityCharacteristicUuids.push(item.characteristic)
        }
        if (item.properties.Read == "Read") {
          readServiceUuids.push(item.service)
          readCharacteristicUuids.push(item.characteristic)
        }
        if (item.properties.Write == "Write") {
          writeWithResponseServiceUuids.push(item.service)
          writeWithResponseCharacteristicUuids.push(item.characteristic)
        }
        if (item.properties.Write == "WriteWithoutResponse") {
          writeWithoutResponseServiceUuids.push(item.service)
          writeWithoutResponseCharacteristicUuids.push(item.characteristic)
        }

      } else {
        for (let property of item.properties) {
          if (property == "Notify") {
            nofityServiceUuids.push(item.service)
            nofityCharacteristicUuids.push(item.characteristic)
          }
          if (property == "Read") {
            readServiceUuids.push(item.service)
            readCharacteristicUuids.push(item.characteristic)
          }
          if (property == "Write") {
            writeWithResponseServiceUuids.push(item.service)
            writeWithResponseCharacteristicUuids.push(item.characteristic)
          }
          if (property == "WriteWithoutResponse") {
            writeWithoutResponseServiceUuids.push(item.service)
            writeWithoutResponseCharacteristicUuids.push(item.characteristic)
          }
        }
      }
    }
    return nofityServiceUuids.toString() + nofityCharacteristicUuids.toString()
      + readServiceUuids.toString() + readCharacteristicUuids.toString()
      + writeWithResponseServiceUuids.toString() + writeWithResponseCharacteristicUuids.toString()
      + writeWithoutResponseServiceUuids.toString() + writeWithoutResponseCharacteristicUuids.toString()
  }

  /**
   * convert uuid to full 128bit.
   * @param {string} uuid 16bit, 32bit or 128bit UUID.
   * @return {string} 128bit UUID.
   */
  getFullUuid(uuid: string): string {
    if (uuid.length === 4) {
      return "0000" + uuid.toUpperCase() + "-0000-1000-8000-00805F9B34FB"
    }
    if (uuid.length === 8) {
      return uuid.toUpperCase() + "-0000-1000-8000-00805F9B34FB"
    }
    return uuid.toUpperCase()
  }
}

/**
 * export ble manager module.
 */
export default new BleManager()
