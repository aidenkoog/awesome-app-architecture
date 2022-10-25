import { NativeModules } from 'react-native'
import Constants from '../../../../utils/Constants'
import { logDebug, outputErrorLog } from '../../../../utils/Logger'

/**
 * load ble manager from native modules.
 */
const bleManager = NativeModules.BleManager
const LOG_TAG = Constants.LOG.BT_BLE_MANAGER

/**
 * uuid information that exists in ble device.
 */
let readServiceUuids = []
let readCharacteristicUuids = []
let writeWithResponseServiceUuids = []
let writeWithResponseCharacteristicUuids = []
let writeWithoutResponseServiceUuids = []
let writeWithoutResponseCharacteristicUuids = []
let nofityServiceUuids = []
let nofityCharacteristicUuids = []

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
   * @returns {Promise} 
   */
  read(peripheralId, serviceUuid, characteristicUuid) {
    return new Promise((fulfill, reject) => {
      bleManager.read(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        (error, data) => {
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
   * @returns {Promise} 
   */
  readRSSI(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.readRSSI(peripheralId, (error, rssi) => {
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
   * @returns {Promise} 
   */
  refreshCache(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.refreshCache(peripheralId, (error, result) => {
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
   * @returns {Promise} 
   */
  retrieveServices(peripheralId, services) {
    return new Promise((fulfill, reject) => {
      bleManager.retrieveServices(
        peripheralId,
        services,
        (error, peripheral) => {
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
   * @param {Any} data 
   * @param {Any} maxByteSize 
   * @returns {Promise} 
   */
  write(peripheralId, serviceUuid, characteristicUuid, data, maxByteSize) {
    if (maxByteSize == null) {
      maxByteSize = 20
    }
    return new Promise((fulfill, reject) => {
      bleManager.write(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        data,
        maxByteSize,
        error => {
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
   * @param {Any} data 
   * @param {Any} maxByteSize 
   * @param {Any} queueSleepTime 
   * @returns {Promise} 
   */
  writeWithoutResponse(
    peripheralId,
    serviceUuid,
    characteristicUuid,
    data,
    maxByteSize,
    queueSleepTime,
  ) {
    if (maxByteSize == null) {
      maxByteSize = 20
    }
    if (queueSleepTime == null) {
      queueSleepTime = 10
    }
    return new Promise((fulfill, reject) => {
      bleManager.writeWithoutResponse(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        data,
        maxByteSize,
        queueSleepTime,
        error => {
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
   * @returns {Promise}
   */
  connect(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.connect(peripheralId, error => {
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
   * @param {Any} peripheralPin 
   * @returns {Promise}
   */
  createBond(peripheralId, peripheralPin = null) {
    return new Promise((fulfill, reject) => {
      bleManager.createBond(peripheralId, peripheralPin, error => {
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
   * @returns {Promise}
   */
  removeBond(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.removeBond(peripheralId, error => {
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
   * @returns {Promise}
   */
  disconnect(peripheralId, force = true) {
    return new Promise((fulfill, reject) => {
      bleManager.disconnect(peripheralId, force, error => {
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
   * @returns {Promise}
   */
  startNotification(peripheralId, serviceUuid, characteristicUuid) {
    return new Promise((fulfill, reject) => {
      bleManager.startNotification(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        error => {
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
   * @param {Any} buffer 
   * @returns {Promise}
   */
  startNotificationUseBuffer(
    peripheralId,
    serviceUuid,
    characteristicUuid,
    buffer,
  ) {
    return new Promise((fulfill, reject) => {
      bleManager.startNotificationUseBuffer(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        buffer,
        error => {
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
   * @returns {Promise}
   */
  stopNotification(peripheralId, serviceUuid, characteristicUuid) {
    return new Promise((fulfill, reject) => {
      bleManager.stopNotification(
        peripheralId,
        serviceUuid,
        characteristicUuid,
        error => {
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
   * @param {Any} options 
   * @returns {Promise}
   */
  start(options) {
    return new Promise((fulfill, reject) => {
      if (options == null) {
        options = {}
      }
      logDebug(LOG_TAG, "initialize ble manager")
      bleManager.start(options, error => {
        if (error) {
          logError(error)
          reject(error)
        } else {
          fulfill()
        }
      })
    })
  }

  /**
   * start to scan ble devices.
   * @param {string[]} serviceUuids 
   * @param {number} seconds 
   * @param {boolean} allowDuplicates 
   * @param {Any} scanningOptions 
   * @returns {Promise}
   */
  scan(serviceUuids, seconds, allowDuplicates, scanningOptions = {}) {
    logDebug(LOG_TAG, "start scanning the device")
    return new Promise((fulfill, reject) => {
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
        error => {
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
   * @returns {Promise}
   */
  stopScan() {
    return new Promise((fulfill, reject) => {
      bleManager.stopScan(error => {
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
   * @returns {Promise}
   */
  enableBluetooth() {
    return new Promise((fulfill, reject) => {
      bleManager.enableBluetooth(error => {
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
   * @returns {Promise}
   */
  getConnectedPeripherals(serviceUuids) {
    return new Promise((fulfill, reject) => {
      bleManager.getConnectedPeripherals(serviceUuids, (error, result) => {
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
   * @returns {Promise}
   */
  getBondedPeripherals() {
    return new Promise((fulfill, reject) => {
      bleManager.getBondedPeripherals((error, result) => {
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
   * @returns {Promise}
   */
  getDiscoveredPeripherals() {
    return new Promise((fulfill, reject) => {
      bleManager.getDiscoveredPeripherals((error, result) => {
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
   * @returns {Promise}
   */
  removePeripheral(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.removePeripheral(peripheralId, error => {
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
   * @param {string[]} serviceUuids 
   * @returns {boolean}
   */
  isPeripheralConnected(peripheralId, serviceUuids) {
    return this.getConnectedPeripherals(serviceUuids).then(result => {
      if (result.find(p => p.id === peripheralId)) {
        return true
      }
      return false
    })
  }

  /**
   * set-up the priority of peripheral device connection.
   * @param {string} peripheralId 
   * @param {number} connectionPriority 
   * @returns {Promise}
   */
  requestConnectionPriority(peripheralId, connectionPriority) {
    return new Promise((fulfill, reject) => {
      bleManager.requestConnectionPriority(
        peripheralId,
        connectionPriority,
        (error, status) => {
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
   * @returns {Promise}
   */
  requestMtu(peripheralId, mtu) {
    return new Promise((fulfill, reject) => {
      bleManager.requestMtu(peripheralId, mtu, (error, mtu) => {
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
  setName(name) {
    bleManager.setName(name)
  }

  /**
   * get uuid list ( notify, read, write, writeWithoutResponse service uuid, characteristic uuid )
   * @param {Any} peripheralInfo 
   * @returns {string[]}
   */
  getUuidList(peripheralInfo) {
    for (let item of peripheralInfo.characteristics) {
      item.characteristic = fullUuid(item.characteristic)
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
    return JSON.stringify(nofityServiceUuids) + "\n" + JSON.stringify(nofityCharacteristicUuids) + "\n"
      + JSON.stringify(readServiceUuids) + "\n" + JSON.stringify(readCharacteristicUuids) + "\n"
      + JSON.stringify(writeWithResponseServiceUuids) + "\n" + JSON.stringify(writeWithResponseCharacteristicUuids) + "\n"
      + JSON.stringify(writeWithoutResponseServiceUuids) + "\n" + JSON.stringify(writeWithoutResponseCharacteristicUuids) + "\n"
  }

  /**
   * convert uuid to full 128bit.
   * @param {string} uuid 16bit, 32bit or 128bit UUID.
   * @returns {string} 128bit UUID.
   */
  getFullUuid(uuid) {
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
