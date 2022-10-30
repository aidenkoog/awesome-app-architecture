import { View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { logDebug } from "../../../utils/logger/Logger"
import Constants from "../../../utils/Constants"

const LOG_TAG = Constants.LOG.BT_UI_LOG

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function BluetoothComponent(props) {

    const navigation = useNavigation()
    const { bleDeviceFound, bleConnectionState, bleConnectCompleteStaste } = props

    logDebug(LOG_TAG, "<<< bleConnectCompleteState: " + bleConnectCompleteStaste)
    if (bleConnectCompleteStaste) {
        
    }

    return (
        <View>
            <Text> Bluetooth </Text>
        </View>
    )
}