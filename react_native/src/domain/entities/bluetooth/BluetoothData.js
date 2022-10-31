
/**
 * define bluetooth related data class.
 */
export class BluetoothData {
    constructor(isConnected, connectedDeviceName, connectedDeviceMacAddress) {
        this.isConnected = isConnected;
        this.connectedDeviceName = connectedDeviceName
        this.connectedDeviceMacAddress = connectedDeviceMacAddress
    }
}