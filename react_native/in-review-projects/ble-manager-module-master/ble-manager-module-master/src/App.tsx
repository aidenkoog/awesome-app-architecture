import { RecoilRoot } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashContainer from './presentation/containers/splash/SplashContainer'
import BluetoothContainer from './presentation/containers/bluetooth/BluetoothContainer'
import HomeContainer from './presentation/containers/home/HomeContainer'

import HiddenHomeContainer from './test/hidden_menu/home/HiddenHomeContainer'
import HiddenSplashContainer from './test/hidden_menu/splash/HiddenSplashContainer'
import HiddenBluetoothContainer from './test/hidden_menu/home/bluetooth/HiddenBluetoothContainer'

import Constants from './utils/Constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'
import { Colors, Strings, Images } from './utils/theme'
import styles from './presentation/stylesheets/StyleSet'


/**
 * bottom tab navigation's screen display name.
 */
const strings = Strings.tabBar
/**
 * feature screens.
 */
const SPLASH_SCREEN = Constants.SCREEN.SPLASH
const BLUETOOTH_SCREEN = Constants.SCREEN.BLUETOOTH
const HOME_SCREEN = Constants.SCREEN.HOME
const HOME_BOTTOM_TAB_SCREEN = Constants.SCREEN.HOME_BOTTOM_TAB_SCREEN

/**
 * hidden feature screens.
 */
const HIDDEN_SPLASH_SCREEN = Constants.SCREEN.HIDDEN.SPLASH
const HIDDEN_HOME_SCREEN = Constants.SCREEN.HIDDEN.HOME
const HIDDEN_BLUETOOTH_SCREEN = Constants.SCREEN.HIDDEN.BLUETOOTH


const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

/**
 * configure bottom tab navigator.
 * @return {JSX.Element}
 */
function BottomTabNavigator(): JSX.Element {
    return (
        <BottomTab.Navigator
            /* initial tab screen: home container. */
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

            {/* settings screen. there's no content about settings, just show bottom menu. */}
            <BottomTab.Screen
                name={"Setting"}
                component={HomeContainer}
                options={{
                    tabBarLabel: strings.Setting,
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
                            name={BLUETOOTH_SCREEN}
                            component={BluetoothContainer}
                            options={{ headerShown: false }} />
                        <Stack.Screen
                            name={HOME_BOTTOM_TAB_SCREEN}
                            component={BottomTabNavigator}
                            options={{ headerShown: false }} />

                        {/* hidden feature screen stack. */}
                        <Stack.Screen
                            name={HIDDEN_SPLASH_SCREEN}
                            component={HiddenSplashContainer}
                            options={{ headerShown: false }} />

                        <Stack.Screen name={HIDDEN_HOME_SCREEN}
                            component={HiddenHomeContainer}
                            options={{ headerShown: true }} />

                        <Stack.Screen name={HIDDEN_BLUETOOTH_SCREEN}
                            component={HiddenBluetoothContainer}
                            options={{ headerShown: true }} />

                    </Stack.Navigator>
                </NavigationContainer>
            </RecoilRoot>
        </>
    )
}