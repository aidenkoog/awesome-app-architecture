import { SafeAreaView, StyleSheet, RefreshControl, FlatList, Image, TouchableOpacity, View } from "react-native"
import { Images, Colors, Fonts } from "../../../utils/theme"
import { Container } from "../../components"
import HomeCardComponent from "./HomeCardComponent"


const USER_SIZE = 1

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function HomeComponent(props) {

    /**
     * props delivered from HomeContainer.
     */
    const {
        userName, userImageUrl, userGender, isRefreshing, homeCardItems, onAddDevice, onSwipeRefresh,
        isDeviceRegistered, bleConnectionCompleteState, bleDeviceBatteryLevel, refreshedTime,
        onPressCardItem, onPressRefreshArea
    } = props

    /**
     * home separator for dividing card area. (it will be used only when there are multiple items.)
     */
    getHomeCardSeparator = () => {
        return (<View style={{ height: 10, width: "100%", backgroundColor: Colors.athensGray }} />)
    }

    /**
     * home screen footer.
     * (add new device / edit item ordering.)
     */
    getItemFooter = (data, length) => {
        return (
            <View style={{ flexDirection: 'column', marginTop: 15, flex: 1 }}>
                <TouchableOpacity onPress={onAddDevice} disabled={!bleConnectionCompleteState}>
                    <View style={styles.addView}>
                        <Image style={{ width: 40, height: 40 }} source={Images.icAdd} />
                    </View>
                </TouchableOpacity>
                {length >= 2 &&
                    <TouchableOpacity onPress={() => { }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <Image style={styles.orderBtn} source={Images.btnOrder} />
                        </View>
                    </TouchableOpacity>}
            </View>

        )
    }

    return (
        <SafeAreaView style={styles.homeSafeAreaStyle}>
            <Container style={styles.homeContainerStyle}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onSwipeRefresh}
                        />
                    }
                    data={homeCardItems}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({ item, index, separators }) => {
                        return <HomeCardComponent
                            userName={userName}
                            userImageUrl={userImageUrl}
                            userGender={userGender}
                            isDeviceRegistered={isDeviceRegistered}
                            bleConnectionCompleteState={bleConnectionCompleteState}
                            bleDeviceBatteryLevel={bleDeviceBatteryLevel}
                            refreshedTime={refreshedTime}
                            onPressCardItem={onPressCardItem}
                            onPressRefreshArea={onPressRefreshArea}
                        />
                    }}

                    scrollEventThrottle={16}
                    ItemSeparatorComponent={getHomeCardSeparator}
                    ListFooterComponent={true ? getItemFooter("", USER_SIZE) : null}
                    stickyHeaderIndices={[0]}
                />
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeSafeAreaStyle: {
        flex: 1,
        backgroundColor: "#f2f2f6"
    },
    homeContainerStyle: {
        marginTop: 10.7,
        margin: 9,
        backgroundColor: "#f2f2f6"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 2,
    },
    title: {
        fontSize: 32,
    },
    editView: {
        width: 76,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E1E1E6",
        marginBottom: 50,
        marginRight: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderBtn: {
        width: 24,
        height: 24,
        margin: 10,
        marginBottom: 30
    },
    addBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.lightishBlue,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addView: {
        height: 80,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.borderColorDateTime,
        shadowColor: Colors.borderColorDateTime,
        margin: 5,
        elevation: 4,
        shadowOpacity: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editText: {
        fontFamily: Fonts.family.Medium,
        fontSize: 20,
        color: Colors.darkGrey
    }
})