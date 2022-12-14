import { View, StyleSheet, FlatList, Text } from "react-native"
import { APPS } from "../../../../data/testcases/Apps"
import GridTile from "../../components/GridTile"

const TEST_GUIDE_MESSAGE =
    "[ Guide ]\n\n" +
    "Please choose the app you want to launch."

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function AppSelectionComponent(props) {

    const { onPressApp } = props

    renderAppItem = (itemData) => {
        pressHandler = () => {
            onPressApp(itemData.item.id)
        }

        return (
            <GridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onPress={pressHandler}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.guideContainer}>
                {TEST_GUIDE_MESSAGE}
            </Text>
            <FlatList
                data={APPS}
                keyExtractor={(item) => item.id}
                renderItem={renderAppItem}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#adb5bd',
        flex: 1
    },
    guideContainer: {
        color: "#000000",
        fontSize: 18,
        padding: 15,
        fontWeight: "900",
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: "#ffd500"
    }
})