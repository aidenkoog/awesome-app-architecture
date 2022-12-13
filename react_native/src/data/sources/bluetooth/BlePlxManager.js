import { BleManager } from 'react-native-ble-plx'

/**
 * ble manager class.
 * library: react-native-ble-plx
 * To be implemented perfectly.
 */
class BlePlxManager {
    constructor() {
        super();
        this.blePlxManager = new BleManager()
    }

    /**
     * scan and connect ble device.
     */
    scanAndConnect() {
        this.blePlxManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                return
            }
            if (device.name === '') {
                this.manager.stopDeviceScan();
            }
        });
    }
}

export default new BlePlxManager()
