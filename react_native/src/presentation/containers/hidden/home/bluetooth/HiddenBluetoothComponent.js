import { View, FlatList, StyleSheet, Text } from "react-native"
import { BT_TEST_CASE_LIST } from "../../../../../test/data/TestCases"
import TestCaseButton from "../../../../components/hidden/TestCaseButton"
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist"

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function HiddenBluetoothComponent(props) {

    /**
     * props delivered from HiddenBluetoothContainer.
     */
    const { onPressTestCase, logMessages } = props

    /**
     * render test category items.
     * @param {Any} itemData 
     * @returns 
     */
    function renderFlatListItem(itemData) {
        function pressHandler() {
            onPressTestCase(itemData.item.id)
        }
        return (
            <TestCaseButton
                title={itemData.item.title}
                color={itemData.item.color}
                onPress={pressHandler}
            />
        )
    }

    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
                <FlatList
                    data={BT_TEST_CASE_LIST}
                    keyExtractor={(item) => item.id}
                    renderItem={renderFlatListItem}
                    numColumns={1}
                />
            </View>

            <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#000000" }}>
                <AutoScrollFlatList
                    data={logMessages}
                    renderItem={(itemData) => {
                        return (
                            <View style={styles.logItem}>
                                <Text style={styles.logText}>{itemData.item.text} </Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => {
                        return item.id
                    }}
                    alwaysBounceVertical={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logItem: {
        width: null,
        height: null,
        margin: 3,
        alignSelf: 'stretch',
        textAlign: 'left',
        padding: 3,
        borderRadius: 6,
        backgroundColor: '#000000',
    },
    logText: {
        color: '#bbff40',
        alignSelf: 'stretch',
        textAlign: 'left',
    },
})