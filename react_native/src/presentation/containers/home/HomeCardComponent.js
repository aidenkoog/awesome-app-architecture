import { Image, StyleSheet, Text, TouchableOpacity, FlatList, View, } from "react-native"
import { Colors, Fonts, Images, Strings } from "../../../utils/theme"
import _ from "lodash"
import { sosTimeFormat } from "../../../utils/time/TimeUtil"
import moment from "moment"
import SuperscriptDateText from "../../components/SuperscriptDateText"

const strings = Strings.home
const itemLeftMargin = 15

const HomeCardComponent = ({ isDeviceRegistered }) => {

  this.isDeviceRegistered = isDeviceRegistered
  const homeCardContentList = [
    {
      id: 1,
      name: isDeviceRegistered ? "Carescend Watch" : "-",
      status: isDeviceRegistered ? "Connected" : "-",
      image: Images.watch,
      width: 42,
      height: 58,
      marginLeft: itemLeftMargin - 5,
      textMarginLeft: 15,
      subTextMarginLeft: 16,
    },
    {
      id: 2,
      name: isDeviceRegistered ? "50 steps" : "-",
      status: isDeviceRegistered ? "1.2 km" : "-",
      image: Images.icHealthStep,
      tintColor: "#73a494",
      width: 32,
      height: 34,
      marginLeft: itemLeftMargin,
      textMarginLeft: 19,
      subTextMarginLeft: 20,
    },
    {
      id: 3,
      name: isDeviceRegistered ? "76 bpm" : "-",
      status: isDeviceRegistered ? "55 bpm" : "-",
      image: Images.icHealthHeart,
      tintColor: "#c27171",
      width: 32,
      height: 34,
      marginLeft: itemLeftMargin,
      textMarginLeft: 19,
      subTextMarginLeft: 20,
    },
    {
      id: 4,
      name: isDeviceRegistered ? "6h 30m" : "-",
      status: isDeviceRegistered ? "Good" : "-",
      image: Images.icHealthSleep,
      tintColor: "#8798b1",
      width: 32,
      height: 34,
      marginLeft: itemLeftMargin,
      textMarginLeft: 19,
      subTextMarginLeft: 20,
    },
  ]

  onPressItem = (item) => {
    console.log("test", item.id)
    switch (item.id) {
      case 2: // step
        break
      case 3: // heart rate
        break
      case 4: // sleep
        break
    }
  }

  onPressRefresh = () => { }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("test", "onPress called !")
          item.id !== 1 && this.onPressItem(item)
        }}
      >
        <View style={styles.row}>

          <Image source={item.image}
            style={{
              ...styles.pic, tintColor: item.tintColor, width: item.width,
              height: item.height, marginLeft: item.marginLeft
            }} />

          <View>
            <View style={styles.nameContainer}>
              <Text
                style={{ ...styles.nameTxt, marginLeft: item.textMarginLeft }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {this.isDeviceRegistered ? item.name : "-"}
              </Text>

              {item.id !== 1 ? (
                <Image
                  source={Images.btnArrowRight}
                  style={{ width: 24, height: 27, alignItems: "center" }}
                />
              ) : (
                <View></View>
              )}
            </View>

            <View style={styles.msgContainer}>
              {item.id == 1 ? (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text style={{ ...styles.msgTxt, marginLeft: item.subTextMarginLeft, }}>
                    {this.isDeviceRegistered ? "-" : "-"}
                  </Text>

                  {/* battrey level */}
                  <Text style={{ marginLeft: 100 }}>
                    Battery {this.isDeviceRegistered ? "-" : "-"}%
                  </Text>
                </View>

              ) : (
                <Text style={{ ...styles.msgTxt, marginLeft: item.subTextMarginLeft }}>
                  <Text style={styles.msgTxt}>{item.status}</Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  loadUserImage = () => {
    return <Image style={styles.image} source={Images.icMaleUser} />
  }

  getWearerName = () => { return "Tester" }

  let isAbleToRefresh = true

  return (
    <View>
      <View style={{ ...styles.container, backgroundColor: Colors.white }}>

        {/* header */}
        <View style={{ ...styles.header }}>
          <Text style={{ textAlign: "right", color: "#333435", marginRight: 5 }}>
            {this.isDeviceRegistered ? "-" : "-"}
          </Text>

          <View style={{ flexDirection: "row" }}>
            {this.loadUserImage()}
            <View style={{ paddingTop: 10, paddingLeft: 28, flex: 1, justifyContent: "center", }}>
              <View style={styles.sectionName}>
                <Text numberOfLines={1} style={styles.name}>
                  {this.getWearerName()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* content */}
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

      {/* refresh */}
      <TouchableOpacity
        onPress={() => { this.onPressRefresh() }}
        style={{ marginLeft: "auto", marginRight: 8 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Image style={{ width: 17, height: 19, resizeMode: "contain", marginRight: 6 }}
            source={isAbleToRefresh ? Images.icRefresh : Images.icRefreshDisable} />

          <View style={styles.timeView}>
            {true ? (
              <Text style={styles.lastDeviceEventTime}>
                {this.hasWatchDevice ? "Last updated on 12:00 PM" : "-"}
              </Text>

            ) : (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.lastDeviceEventTime}>
                  {strings.updatedOn.replace(/\{0\}/g, "")}
                </Text>

                <SuperscriptDateText style={styles.lastDeviceEventTime}>
                  {sosTimeFormat(moment(100).utc())}
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
    elevation: 4,
    shadowOpacity: 2,
  },
  header: {
    flexDirection: "column",
    borderRadius: 8,
    padding: 10,
    marginLeft: 17,
    paddingBottom: 20,
  },
  image: {
    aspectRatio: 1,
    height: 64,
    width: 64,
    borderRadius: 32,
    marginTop: 10,
  },
  watchImage: {
    height: 58,
    width: 42,
  },
  main: {
    backgroundColor: "#ffffff80",
    marginRight: 8,
    paddingHorizontal: 4,
    paddingVertical: 0.2,
    borderRadius: 4,
    borderWidth: 1.1,
  },
  sub: {
    backgroundColor: "#ffffff80",
    marginRight: 8,
    paddingHorizontal: 4,
    paddingVertical: 0.2,
    borderRadius: 4,
    borderWidth: 1.1,
    borderColor: Colors.coolGrey,
  },
  mainTxt: {
    color: Colors.black,
  },
  subTxt: {
    color: Colors.coolGrey,
  },
  imageMain: {
    height: 22,
    width: 44,
    borderRadius: 4,
    marginRight: 10,
    resizeMode: "contain",
  },
  registerWatch: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.coral,
    paddingVertical: 2,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  timeView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.borderColorBox,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  name: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: Fonts.poppinsFamily.Medium,
    fontWeight: "500",
    flex: 1,
  },
  statusWatch: {
    fontSize: 17,
    color: Colors.darkGrey,
    fontWeight: "normal",
    fontFamily: Fonts.poppinsFamily.Regular,
  },
  nextIcon: {
    width: 24,
    height: 24,
  },
  sectionName: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  role: {
    fontFamily: Fonts.family.Medium,
    fontSize: 16,
  },
  registerView: {
    backgroundColor: Colors.green,
    borderRadius: 3,
    height: 40,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    height: 100,
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.6,
    borderRadius: 10,
    backgroundColor: Colors.athensGray,
  },
  lastDeviceEventTime: {
    fontSize: 14,
    fontFamily: Fonts.robotoFamily.Regular,
    color: Colors.darkGrey,
    textAlign: "center",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#f6f6f6",
  },
  listContainer: {
    alignItems: "center",
  },
  card: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: "#e2e2e2",
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 15,
    marginLeft: 15,
    marginRight: 15
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
    marginLeft: 18,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 17,
    width: 170,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 18,
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15,
  },
})