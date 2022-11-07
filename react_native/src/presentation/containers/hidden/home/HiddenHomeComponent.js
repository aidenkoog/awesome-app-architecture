import { StyleSheet, Text, View, FlatList, Button } from "react-native"

const HiddenHomeComponent = (props) => {

    return (
        <View style={styles.appContainer}>
            <Button onPress={onWriteWithoutResponse} title="Write (Without response)"></Button>
            <View style={styles.goalsContainer}>
                <FlatList
                    data={{}}
                    renderItem={(itemData) => {
                        return (
                            <View style={styles.goalItem}>
                                <Text style={styles.goalText}>{itemData.item.text}</Text>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    alwaysBounceVertical={false}
                />
            </View>
        </View>
    )
}

export default HiddenHomeComponent

const styles = StyleSheet.create({
    homeText: {
        color: "#000000"
    },
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8,
    },
    goalsContainer: {
        flex: 5,
    },
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
    },
    goalText: {
        color: 'white',
    },
})