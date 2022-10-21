const React = require('react-native');

/* load ble manager from native modules. */
const bleManager = React.NativeModules.BleManager;

/* ble manager class. */
class BleManager {
  constructor() {
    /* represent if peripheral is connected or not. */
    this.isPeripheralConnected = this.isPeripheralConnected.bind(this);
  }

  /* read characteristic data. */
  read(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise((fulfill, reject) => {
      bleManager.read(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            fulfill(data);
          }
        },
      );
    });
  }

  /* read rssi ( received signal strength indication ) */
  readRSSI(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.readRSSI(peripheralId, (error, rssi) => {
        if (error) {
          reject(error);
        } else {
          fulfill(rssi);
        }
      });
    });
  }

  /* refresh cache which ble manager has. */
  refreshCache(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.refreshCache(peripheralId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          fulfill(result);
        }
      });
    });
  }

  /* retrieve services corresponding to peripheral from parameter. */
  retrieveServices(peripheralId, services) {
    return new Promise((fulfill, reject) => {
      bleManager.retrieveServices(
        peripheralId,
        services,
        (error, peripheral) => {
          if (error) {
            reject(error);
          } else {
            fulfill(peripheral);
          }
        },
      );
    });
  }

  /* write characteristic data. */
  write(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize) {
    if (maxByteSize == null) {
      maxByteSize = 20;
    }
    return new Promise((fulfill, reject) => {
      bleManager.write(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        data,
        maxByteSize,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  /* write characteristic data with no response. */
  writeWithoutResponse(
    peripheralId,
    serviceUUID,
    characteristicUUID,
    data,
    maxByteSize,
    queueSleepTime,
  ) {
    if (maxByteSize == null) {
      maxByteSize = 20;
    }
    if (queueSleepTime == null) {
      queueSleepTime = 10;
    }
    return new Promise((fulfill, reject) => {
      bleManager.writeWithoutResponse(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        data,
        maxByteSize,
        queueSleepTime,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  /* connect ble device corresponding to peripheral id from parameter. */
  connect(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.connect(peripheralId, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  /* create bond about peripheral. */
  createBond(peripheralId, peripheralPin = null) {
    return new Promise((fulfill, reject) => {
      bleManager.createBond(peripheralId, peripheralPin, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  /* remove bond about peripheral. */
  removeBond(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.removeBond(peripheralId, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  /*
   * diconnect ble device corresponding to peripheral id from parameter.
   * (default option force : true)
   */
  disconnect(peripheralId, force = true) {
    return new Promise((fulfill, reject) => {
      bleManager.disconnect(peripheralId, force, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  /* set-up notification about characteristic uuid. */
  startNotification(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise((fulfill, reject) => {
      bleManager.startNotification(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  /* enable notification about characteristic uuid with using buffer. */
  startNotificationUseBuffer(
    peripheralId,
    serviceUUID,
    characteristicUUID,
    buffer,
  ) {
    return new Promise((fulfill, reject) => {
      bleManager.startNotificationUseBuffer(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        buffer,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  /* disable notification about characteristic uuid. */
  stopNotification(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise((fulfill, reject) => {
      bleManager.stopNotification(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  /* check ble manager state. */
  checkState() {
    bleManager.checkState();
  }

  /* initialize ble manager module. */
  start(options) {
    return new Promise((fulfill, reject) => {
      if (options == null) {
        options = {};
      }
      bleManager.start(options, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  /* start to scan ble devices. */
  scan(serviceUUIDs, seconds, allowDuplicates, scanningOptions = {}) {
    return new Promise((fulfill, reject) => {
      if (allowDuplicates == null) {
        allowDuplicates = false;
      }

      // (ANDROID) Match as many advertisement per filter as hw could allow
      // dependes on current capability and availability of the resources in hw.
      if (scanningOptions.numberOfMatches == null) {
        scanningOptions.numberOfMatches = 3;
      }

      // (ANDROID) Defaults to MATCH_MODE_AGGRESSIVE
      if (scanningOptions.matchMode == null) {
        scanningOptions.matchMode = 1;
      }

      // (ANDROID) Defaults to SCAN_MODE_LOW_POWER on android
      if (scanningOptions.scanMode == null) {
        scanningOptions.scanMode = 0;
      }

      if (scanningOptions.reportDelay == null) {
        scanningOptions.reportDelay = 0;
      }

      bleManager.scan(
        serviceUUIDs,
        seconds,
        allowDuplicates,
        scanningOptions,
        error => {
          if (error) {
            reject(error);
          } else {
            fulfill();
          }
        },
      );
    });
  }

  /* stop to scan ble device. */
  stopScan() {
    return new Promise((fulfill, reject) => {
      bleManager.stopScan(error => {
        if (error != null) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  /* enable bluetooth option. */
  enableBluetooth() {
    return new Promise((fulfill, reject) => {
      bleManager.enableBluetooth(error => {
        if (error != null) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  /* get the connected peripheral device data. */
  getConnectedPeripherals(serviceUUIDs) {
    return new Promise((fulfill, reject) => {
      bleManager.getConnectedPeripherals(serviceUUIDs, (error, result) => {
        if (error) {
          reject(error);
        } else if (result != null) {
          fulfill(result);
        } else {
          fulfill([]);
        }
      });
    });
  }

  /* get the bonded peripheral device data. */
  getBondedPeripherals() {
    return new Promise((fulfill, reject) => {
      bleManager.getBondedPeripherals((error, result) => {
        if (error) {
          reject(error);
        } else if (result != null) {
          fulfill(result);
        } else {
          fulfill([]);
        }
      });
    });
  }

  /* get the peripheral devices that is discovered after scanning. */
  getDiscoveredPeripherals() {
    return new Promise((fulfill, reject) => {
      bleManager.getDiscoveredPeripherals((error, result) => {
        if (error) {
          reject(error);
        } else if (result != null) {
          fulfill(result);
        } else {
          fulfill([]);
        }
      });
    });
  }

  /* remove cached peripheral device. */
  removePeripheral(peripheralId) {
    return new Promise((fulfill, reject) => {
      bleManager.removePeripheral(peripheralId, error => {
        if (error) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

  /* check if peripheral device corresponding to peripheral id is connected or not. */
  isPeripheralConnected(peripheralId, serviceUUIDs) {
    return this.getConnectedPeripherals(serviceUUIDs).then(result => {
      if (result.find(p => p.id === peripheralId)) {
        return true;
      }
      return false;
    });
  }

  /* set-up the priority of peripheral device connection. */
  requestConnectionPriority(peripheralId, connectionPriority) {
    return new Promise((fulfill, reject) => {
      bleManager.requestConnectionPriority(
        peripheralId,
        connectionPriority,
        (error, status) => {
          if (error) {
            reject(error);
          } else {
            fulfill(status);
          }
        },
      );
    });
  }

  /* set mtu ( maximum transmission unit ) */
  requestMTU(peripheralId, mtu) {
    return new Promise((fulfill, reject) => {
      bleManager.requestMTU(peripheralId, mtu, (error, mtu) => {
        if (error) {
          reject(error);
        } else {
          fulfill(mtu);
        }
      });
    });
  }

  /* set-up name. */
  setName(name) {
    bleManager.setName(name);
  }

  /* get uuid list ( notify, read, write, writeWithoutResponse service uuid, characteristic uuid ) */
  getUuidList(peripheralInfo) {
    for (let item of peripheralInfo.characteristics) {
      item.characteristic = fullUUID(item.characteristic);
      if (Platform.OS == "android") {
        if (item.properties.Notify == "Notify") {
          nofityServiceUUID.push(item.service);
          nofityCharacteristicUUID.push(item.characteristic);
        }
        if (item.properties.Read == "Read") {
          readServiceUUID.push(item.service);
          readCharacteristicUUID.push(item.characteristic);
        }
        if (item.properties.Write == "Write") {
          writeWithResponseServiceUUID.push(item.service);
          writeWithResponseCharacteristicUUID.push(item.characteristic);
        }
        if (item.properties.Write == "WriteWithoutResponse") {
          writeWithoutResponseServiceUUID.push(item.service);
          writeWithoutResponseCharacteristicUUID.push(item.characteristic);
        }

      } else {
        for (let property of item.properties) {
          if (property == "Notify") {
            nofityServiceUUID.push(item.service);
            nofityCharacteristicUUID.push(item.characteristic);
          }
          if (property == "Read") {
            readServiceUUID.push(item.service);
            readCharacteristicUUID.push(item.characteristic);
          }
          if (property == "Write") {
            writeWithResponseServiceUUID.push(item.service);
            writeWithResponseCharacteristicUUID.push(item.characteristic);
          }
          if (property == "WriteWithoutResponse") {
            writeWithoutResponseServiceUUID.push(item.service);
            writeWithoutResponseCharacteristicUUID.push(item.characteristic);
          }
        }
      }
    }
    //TODO:
    return ""
  }

  /**
   * convert uuid to full 128bit.
   * @param {UUID} uuid 16bit, 32bit or 128bit UUID.
   * @returns {UUID} 128bit UUID.
   */
  getFullUuid(uuid) {
    if (uuid.length === 4) {
      return "0000" + uuid.toUpperCase() + "-0000-1000-8000-00805F9B34FB";
    }
    if (uuid.length === 8) {
      return uuid.toUpperCase() + "-0000-1000-8000-00805F9B34FB";
    }
    return uuid.toUpperCase();
  }
}

/* export ble manager module. */
module.exports = new BleManager();
