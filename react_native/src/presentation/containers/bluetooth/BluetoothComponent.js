import { View, Text } from "react-native"

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function BluetoothComponent(props) {

    const { bleDeviceFound, bleConnectionState, bleCOnnectCompleteStaste } = props
    return (
        <View>
            <Text> Bluetooth </Text>
        </View>
    )
}