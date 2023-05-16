import { StyleSheet } from "react-native"
import { Colors, Fonts, Metrics } from "../../../utils/theme"

export const graphStyles = StyleSheet.create({
    container: {
        minHeight: Metrics.screenWidth - 50,
        backgroundColor: Colors.white,
        borderRadius: 12,
        margin: 10,
        shadowColor: "rgba(120, 122, 124, 0.12)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 10,
    },
    avgNumber: {
        marginLeft: 17,
        marginTop: 14,
        fontFamily: Fonts.robotoFamily.Medium,
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.darkGrey
    },
    rhrTitle: {
        fontFamily: Fonts.robotoFamily.Medium,
        fontSize: 14,
        fontWeight: "500",
        color: Colors.coral
    },
    avgTitle: {
        fontSize: 14,
        fontWeight: "normal",
        fontFamily: Fonts.robotoFamily.Regular,
        color: "#64696e"
    },
    headLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    yAxisTitle: {
        color: Colors.slateGrey,
        fontSize: 14,
        fontFamily: Fonts.robotoFamily.Regular,
        marginRight: 20
    },
    sleepHour: {
        fontFamily: Fonts.robotoFamily.Regular,
        fontSize: 17,
        color: Colors.hourGray
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2,
        backgroundColor: Colors.hourGray,
        marginRight: 5
    }
})