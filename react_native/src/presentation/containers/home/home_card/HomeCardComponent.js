import { Image, StyleSheet, Text, TouchableOpacity, FlatList, View, } from "react-native"
import { Colors, Fonts, Images, Strings } from "../../../../utils/theme"
import _ from "lodash"
import { refreshTimeFormat } from "../../../../utils/time/TimeUtil"
import moment from "moment"
import SuperscriptDateText from "../../../components/SuperscriptDateText"

const strings = Strings.home

/**
 * dummy data for debugging.
 */
const DUMMY_DEVICE_NAME = "BLE Device 75627"
const DUMMY_DEVICE_STATUS = "Disconnected"
const DUMMY_STEP_NAME = "10000 steps"
const DUMMY_STEP_STATUS = "12000 km"
const DUMMY_HEART_RATE_NAME = "1000 bpm (Latest)"
const DUMMY_HEART_RATE_STATUS = "1000 bpm (Avg)"
const DUMMY_SLEEP_NAME = "1000h 30m"
const DUMMY_SLEEP_STATUS = "Good"

/**
 * home card component ui that is used in HomeComponent.
 * @param {boolean} isDeviceRegistered
 * @returns {JSX.Element}
 */
const HomeCardComponent = (props) => {

  const {
    userName, userImageUrl, userGender,
    bleConnectionCompleteState, isDeviceRegistered, bleDeviceBatteryLevel, refreshedTime,
    onPressCardItem, onPressRefreshArea
  } = props

  /**
   * home card item attributes.
   */
  const ITEM_WIDTH = 32
  const ITEM_HEIGHT = 34
  const ITEM_LEFT_MARGIN = 20
  const ITEM_TEXT_LEFT_MARGIN = 4
  const ITEM_SUB_TEXT_LEFT_MARGIN = 20

  /**
   * home card id
   */
  const ITEM_ID_DEVICE = 1
  const ITEM_ID_STEP = 2
  const ITEM_ID_HEART_RATE = 3
  const ITEM_ID_SLEEP = 4

  /**
   * home card content list information.
   */
  const homeCardContentList = [
    {
      id: ITEM_ID_DEVICE,
      name: isDeviceRegistered ? DUMMY_DEVICE_NAME : DUMMY_DEVICE_NAME,
      status: bleConnectionCompleteState ? "Connected" : DUMMY_DEVICE_STATUS,
      image: Images.watch,
      width: ITEM_WIDTH + 10,
      height: ITEM_HEIGHT + 24,
      marginLeft: ITEM_LEFT_MARGIN - 5,
      textMarginLeft: ITEM_TEXT_LEFT_MARGIN - 3,
      subTextMarginLeft: ITEM_SUB_TEXT_LEFT_MARGIN - 4,
    },
    {
      id: ITEM_ID_STEP,
      name: isDeviceRegistered ? DUMMY_STEP_NAME : DUMMY_STEP_NAME,
      status: isDeviceRegistered ? DUMMY_STEP_STATUS : DUMMY_STEP_STATUS,
      image: Images.icHealthStep,
      tintColor: "#73a494",
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      marginLeft: ITEM_LEFT_MARGIN,
      textMarginLeft: ITEM_TEXT_LEFT_MARGIN,
      subTextMarginLeft: ITEM_SUB_TEXT_LEFT_MARGIN,
    },
    {
      id: ITEM_ID_HEART_RATE,
      name: isDeviceRegistered ? DUMMY_HEART_RATE_NAME : DUMMY_HEART_RATE_NAME,
      status: isDeviceRegistered ? DUMMY_HEART_RATE_STATUS : DUMMY_HEART_RATE_STATUS,
      image: Images.icHealthHeart,
      tintColor: "#c27171",
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      marginLeft: ITEM_LEFT_MARGIN,
      textMarginLeft: ITEM_TEXT_LEFT_MARGIN,
      subTextMarginLeft: ITEM_SUB_TEXT_LEFT_MARGIN,
    },
    {
      id: ITEM_ID_SLEEP,
      name: isDeviceRegistered ? DUMMY_SLEEP_NAME : DUMMY_SLEEP_NAME,
      status: isDeviceRegistered ? DUMMY_SLEEP_STATUS : DUMMY_SLEEP_STATUS,
      image: Images.icHealthSleep,
      tintColor: "#8798b1",
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      marginLeft: ITEM_LEFT_MARGIN,
      textMarginLeft: ITEM_TEXT_LEFT_MARGIN,
      subTextMarginLeft: ITEM_SUB_TEXT_LEFT_MARGIN,
    },
  ]

  /**
   * render the item of FlatList.
   */
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { item.id !== 1 && onPressCardItem(item) }}>

        {/* horizontal direction - start. */}
        <View style={styles.rowItem}>
          <Image source={item.image}
            style={{
              ...styles.userImage, tintColor: item.tintColor, width: item.width,
              height: item.height, marginLeft: item.marginLeft
            }} />

          {/* vertical direction - start. */}
          <View style={{ marginLeft: 25 }}>

            {/* item title. */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 240, marginLeft: item.textMarginLeft }}>
              <Text
                style={{ marginLeft: 15, color: "#333435", fontSize: 17, width: 210 }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
            </View>

            {/* item status. */}
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: item.subTextMarginLeft }}>
              {item.id == 1 ? (
                // device connection state and battery level information.
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                  <Text style={{ fontWeight: "400", color: "#333435", fontSize: 16 }}>
                    {item.status}
                  </Text>

                  {/* battrey level */}
                  <Text style={{ color: "#333435", marginLeft: 55, fontSize: 16 }}>
                    Battery {bleConnectionCompleteState ? bleDeviceBatteryLevel : "-"}%
                  </Text>
                </View>

              ) : (
                // step, heart rate and sleep detailed information.
                <Text style={{ fontWeight: "400", color: "#333435", fontSize: 16 }}>
                  {item.status}
                </Text>
              )}
            </View>

          </View>
          {/* vertical direction - end. */}

          {item.id !== 1 ? (
            <Image
              source={Images.btnArrowRight}
              style={{ width: 24, height: 27, alignItems: "center", justifyContent: "center" }}
            />
          ) : (
            <View></View>
          )}
        </View>
        {/* horizontal direction -end. */}

      </TouchableOpacity>
    )
  }

  /**
   * get user's image.
   * @returns {JSX.Element}
   */
  getUserImage = () => {
    if (userImageUrl == "-") {
      if (userGender == 0) {
        return <Image style={styles.useImageStyle} source={Images.icMaleUser} />

      } else {
        return <Image style={styles.useImageStyle} source={Images.icFemaleUser} />
      }

    } else {
      return <Image style={styles.useImageStyle} source={{ uri: userImageUrl }} />
    }
  }

  return (
    <View>
      <View style={{ ...styles.container, backgroundColor: Colors.white }}>

        {/* header */}
        <View style={{ ...styles.header }}>

          {/* last update time information. */}
          <Text style={{ textAlign: "right", color: "#333435", marginRight: 5 }}>
            Last updated on {refreshedTime}
          </Text>

          {/* user image and name information. */}
          <View style={{ flexDirection: "row" }}>

            {/* user image. */}
            <View>
              {this.getUserImage()}
            </View>

            {/* user name. */}
            <View style={{ paddingTop: 10, paddingLeft: 28, flex: 1, justifyContent: "center" }}>
              <View style={styles.userNameView}>
                <Text numberOfLines={1} style={styles.userName}>{userName}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* content list. */}
        <View style={{ marginBottom: 25 }}>
          <FlatList
            data={homeCardContentList}
            keyExtractor={(item) => {
              return item.id
            }}
            renderItem={this.renderItem}
            ItemSeparatorComponent={null}
          />
        </View>
      </View>

      {/* refresh view. */}
      <TouchableOpacity onPress={onPressRefreshArea} style={{ marginLeft: "auto", marginRight: 8 }}>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          {/* refresh image. */}
          <Image style={{ width: 17, height: 19, resizeMode: "contain", marginRight: 6 }}
            source={true ? Images.icRefresh : Images.icRefreshDisable} />

          {/* refresh message. */}
          <View style={styles.lastUpdateTimeView}>
            {true ? (
              <Text style={styles.lastDeviceEventTime}>Last updated on {refreshedTime}</Text>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.lastDeviceEventTime}>
                  {strings.updatedOn.replace(/\{0\}/g, "")}
                </Text>
                <SuperscriptDateText style={styles.lastDeviceEventTime}>
                  {refreshTimeFormat(moment(100).utc())}
                </SuperscriptDateText>
              </View>
            )}
          </View>
        </View>

      </TouchableOpacity>
    </View>
  )
}

export default HomeCardComponent

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.borderColorDateTime,
    shadowColor: Colors.borderColorDateTime,
    margin: 5,
    marginBottom: 10,
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  header: {
    flexDirection: "column",
    borderRadius: 8,
    padding: 10,
    marginLeft: 17,
    paddingBottom: 20,
  },
  useImageStyle: {
    aspectRatio: 1,
    height: 64,
    width: 64,
    borderRadius: 32,
    marginTop: 10,
  },
  lastUpdateTimeView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.borderColorBox,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  userName: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: Fonts.poppinsFamily.Medium,
    fontWeight: "bold",
    flex: 1,
  },
  userNameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImage: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  lastDeviceEventTime: {
    fontSize: 14,
    fontFamily: Fonts.robotoFamily.Regular,
    color: Colors.darkGrey,
    textAlign: "center",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 7,
    paddingRight: 7,
    marginLeft: 15,
    marginRight: 15
  }
})