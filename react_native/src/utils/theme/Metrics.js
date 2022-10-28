import { Dimensions, Platform } from 'react-native'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

export const tiny = 5
export const small = tiny * 2 // 10
export const normal = tiny * 3 // 15
export const medium = normal * 2 // 30
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const IS_IOS = Platform.OS === 'ios'
export default {
  IS_IOS,
  screenWidth,
  screenHeight,
  drawerWidth: 280,
  tiny,
  small,
  normal,
  medium,
  screenPaddingTop: getStatusBarHeight(),
  screenPaddingBottom: getBottomSpace(),
  headerHeight: getStatusBarHeight() + 59,
  tailHeight: getBottomSpace() + 69,
  bottomMargin: {
    marginBottom: normal,
  },
  mediumBottomMargin: {
    marginBottom: medium,
  },

  tinyVerticalMargin: {
    marginVertical: tiny,
  },
  smallVerticalMargin: {
    marginVertical: small,
  },
  verticalMargin: {
    marginVertical: normal,
  },
  mediumVerticalMargin: {
    marginVertical: medium,
  },

  tinyHorizontalMargin: {
    marginHorizontal: tiny,
  },
  smallHorizontalMargin: {
    marginHorizontal: small,
  },
  horizontalMargin: {
    marginHorizontal: normal,
  },
  mediumHorizontalMargin: {
    marginHorizontal: medium,
  },

  tinyHorizontalPadding: {
    paddingHorizontal: tiny,
  },
  smallHorizontalPadding: {
    paddingHorizontal: small,
  },
  horizontalPadding: {
    paddingHorizontal: normal,
  },
  mediumHorizontalPadding: {
    paddingHorizontal: medium,
  },

  tinyVerticalPadding: {
    paddingVertical: tiny,
  },
  smallVerticalPadding: {
    paddingVertical: small,
  },
  verticalPadding: {
    paddingVertical: normal,
  },
  mediumVerticalPadding: {
    paddingVertical: medium,
  },
}
