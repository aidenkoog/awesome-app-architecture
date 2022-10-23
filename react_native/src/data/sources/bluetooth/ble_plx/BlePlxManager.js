import { BleManager } from 'react-native-ble-plx';

/**
 * ble manager class.
 * library: react-native-ble-plx
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
                // Handle error (scanning will be stopped automatically)
                return
            }
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === '') {
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();

                // Proceed with connection.
            }
        });
    }
}

export default new BlePlxManager()
