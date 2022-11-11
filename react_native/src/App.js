import { RecoilRoot } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashContainer from './presentation/containers/splash/SplashContainer'
import ProfileContainer from './presentation/containers/profile/ProfileContainer'
import QrScanContainer from './presentation/containers/device/QrScanContainer'
import BluetoothContainer from './presentation/containers/bluetooth/BluetoothContainer'
import HomeContainer from './presentation/containers/home/HomeContainer'
import SettingsContainer from './presentation/containers/settings/SettingsContainer'
import SoftwareUpdateContainer from './presentation/containers/settings/device/SoftwareUpdateContainer'
import EditProfileContainer from './presentation/containers/settings/edit_profile/EditProfileContainer'

import HiddenHomeContainer from './presentation/containers/hidden/home/HiddenHomeContainer'
import HiddenSplashContainer from './presentation/containers/hidden/splash/HiddenSplashContainer'
import HiddenBluetoothContainer from './presentation/containers/hidden/home/bluetooth/HiddenBluetoothContainer'
import HiddenCommonContainer from './presentation/containers/hidden/home/common/HiddenCommonContainer'
import HiddenPlatformContainer from './presentation/containers/hidden/home/platform/HiddePlatformContainer'
import HiddenServerContainer from './presentation/containers/hidden/home/server/HiddenServerContainer'

import Constants from './utils/Constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'
import { Colors, Strings, Images } from './utils/theme'
import styles from './presentation/stylesheets/StyleSet'
import HrMonitoringSettingContainer from './presentation/containers/settings/hr_monitoring/HrMonitoringSettingContainer'

/**
 * bottom tab navigation's screen display name.
 */
const strings = Strings.home.bottomTabBar

/**
 * feature screens.
 */
const SPLASH_SCREEN = Constants.SCREEN.SPLASH
const PROFILE_SCREEN = Constants.SCREEN.PROFILE
const QR_SCAN_SCREEN = Constants.SCREEN.QR_SCAN
const BLUETOOTH_SCREEN = Constants.SCREEN.BLUETOOTH
const HOME_SCREEN = Constants.SCREEN.HOME
const HOME_BOTTOM_TAB_SCREEN = Constants.SCREEN.HOME_BOTTOM_TAB_SCREEN
const SETTINGS_SCREEN = Constants.SCREEN.SETTINGS
const SW_UPDATE_SCREEN = Constants.SCREEN.SW_UPDATE
const EDIT_PROFILE_SCREEN = Constants.SCREEN.EDIT_PROFILE
const HR_MONITORING_SCREEN = Constants.SCREEN.HR_MONITORING

/**
 * hidden feature screens.
 */
const HIDDEN_SPLASH_SCREEN = Constants.SCREEN.HIDDEN.SPLASH
const HIDDEN_HOME_SCREEN = Constants.SCREEN.HIDDEN.HOME
const HIDDEN_BLUETOOTH_SCREEN = Constants.SCREEN.HIDDEN.BLUETOOTH
const HIDDEN_PLATFORM_SCREEN = Constants.SCREEN.HIDDEN.PLATFORM
const HIDDEN_COMMON_SCREEN = Constants.SCREEN.HIDDEN.COMMON
const HIDDEN_SERVER_SCREEN = Constants.SCREEN.HIDDEN.SERVER


const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

/**
 * configure bottom tab navigator.
 * @returns {JSX.Element}
 */
function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            // initial tab screen: home container.
            initialRouteName={HOME_SCREEN}
            screenOptions={{
                tabBarActiveTintColor: Colors.black,
                tabBarInactiveTintColor: Colors.slateGrey,
            }}>
            {/* home screen. */}
            <BottomTab.Screen
                name={HOME_SCREEN}
                component={HomeContainer}
                options={{
                    tabBarLabel: strings.home,
                    tabBarIcon: ({ focused }) => (
                        focused ? <Image source={Images.icHomeOn} style={styles.homeBottomTabIconMenu} />
                            : <Image source={Images.icHomeOff} style={styles.homeBottomTabIconMenu} />
                    ),
                    headerShown: false,
                    tabBarStyle: styles.homeBottomTabBar
                }}
            />

            {/* settings screen. */}
            <BottomTab.Screen
                name={SETTINGS_SCREEN}
                component={SettingsContainer}
                options={{
                    tabBarLabel: strings.setting,
                    tabBarIcon: ({ focused }) => (
                        focused ? <Image source={Images.icSettingOn} style={styles.homeBottomTabIconMenu} />
                            : <Image source={Images.icSettingOff} style={styles.homeBottomTabIconMenu} />
                    ),
                    headerShown: false,
                    tabBarStyle: styles.homeBottomTabBar
                }}
            />
        </BottomTab.Navigator>
    )
}

export default function App() {
    return (
        <>
            {/* state management tool. */}
            <RecoilRoot>
                <NavigationContainer>
                    {/* initial screen: splash container */}
                    <Stack.Navigator initialRouteName={SPLASH_SCREEN}>
                        {/* feature screen stack. */}
                        <Stack.Screen
                            name={SPLASH_SCREEN}
                            component={SplashContainer}
                            options={{ headerShown: false }} />
                        <Stack.Screen
                            name={PROFILE_SCREEN}
                            component={ProfileContainer}
                            options={{ headerShown: false }} />
                        <Stack.Screen
                            name={QR_SCAN_SCREEN}
                            component={QrScanContainer}
                            options={{ headerShown: false }} />
                        <Stack.Screen
                            name={BLUETOOTH_SCREEN}
                            component={BluetoothContainer}
                            options={{ headerShown: false }} />
                        <Stack.Screen
                            name={HOME_BOTTOM_TAB_SCREEN}
                            component={BottomTabNavigator}
                            options={{ headerShown: false }} />
                        <Stack.Screen
                            name={SW_UPDATE_SCREEN}
                            component={SoftwareUpdateContainer}
                            options={{ headerShown: false }} />
                        <Stack.Screen
                            name={EDIT_PROFILE_SCREEN}
                            component={EditProfileContainer}
                            options={{ headerShown: false }} />
                        <Stack.Screen
                            name={HR_MONITORING_SCREEN}
                            component={HrMonitoringSettingContainer}
                            options={{ headerShown: false }} />

                        {/* hidden feature screen stack. */}
                        <Stack.Screen
                            name={HIDDEN_SPLASH_SCREEN}
                            component={HiddenSplashContainer}
                            options={{ headerShown: false }} />
                        <Stack.Screen name={HIDDEN_HOME_SCREEN} component={HiddenHomeContainer} />
                        <Stack.Screen name={HIDDEN_BLUETOOTH_SCREEN} component={HiddenBluetoothContainer} />
                        <Stack.Screen name={HIDDEN_COMMON_SCREEN} component={HiddenCommonContainer} />
                        <Stack.Screen name={HIDDEN_PLATFORM_SCREEN} component={HiddenPlatformContainer} />
                        <Stack.Screen name={HIDDEN_SERVER_SCREEN} component={HiddenServerContainer} />

                    </Stack.Navigator>
                </NavigationContainer>
            </RecoilRoot>
        </>
    )
}