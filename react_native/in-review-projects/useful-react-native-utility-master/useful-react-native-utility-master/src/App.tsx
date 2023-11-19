import { RecoilRoot } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashContainer from './presentation/containers/splash/SplashContainer'
import HomeContainer from './presentation/containers/home/HomeContainer'

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
const HOME_SCREEN = Constants.SCREEN.HOME
const HOME_BOTTOM_TAB_SCREEN = Constants.SCREEN.HOME_BOTTOM_TAB_SCREEN

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
                            name={HOME_BOTTOM_TAB_SCREEN}
                            component={BottomTabNavigator}
                            options={{ headerShown: false }} />

                    </Stack.Navigator>
                </NavigationContainer>
            </RecoilRoot>
        </>
    )
}