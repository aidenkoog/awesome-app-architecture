import { RecoilRoot } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RootContainer from './presentation/containers/root/RootContainer'
import SplashContainer from './presentation/containers/splash/SplashContainer'
import ProfileContainer from './presentation/containers/profile/ProfileContainer'
import QrScanContainer from './presentation/containers/device/QrScanContainer'
import BluetoothContainer from './presentation/containers/bluetooth/BluetoothContainer'
import HomeContainer from './presentation/containers/home/HomeContainer'

import HiddenHomeContainer from './presentation/containers/hidden/home/HiddenHomeContainer'
import HiddenSplashContainer from './presentation/containers/hidden/splash/HiddenSplashContainer'
import HiddenBluetoothContainer from './presentation/containers/hidden/test/bluetooth/HiddenBluetoothContainer'
import HiddenCommonContainer from './presentation/containers/hidden/test/common/HiddenCommonContainer'
import HiddenPlatformContainer from './presentation/containers/hidden/test/platform/HiddePlatformContainer'
import HiddenServerContainer from './presentation/containers/hidden/test/server/HiddenServerContainer'

import Constants from './utils/Constants'

/**
 * feature screens.
 */
const ROOT_SCREEN = Constants.SCREEN.ROOT
const SPLASH_SCREEN = Constants.SCREEN.SPLASH
const PROFILE_SCREEN = Constants.SCREEN.PROFILE
const QR_SCAN_SCREEN = Constants.SCREEN.QR_SCAN
const BLUETOOTH_SCREEN = Constants.SCREEN.BLUETOOTH
const HOME_SCREEN = Constants.SCREEN.HOME

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

export default function App() {
    return (
        <>
            {/* state management tool. */}
            <RecoilRoot>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={ROOT_SCREEN}>
                        {/* feature screen stack. */}
                        <Stack.Screen name={ROOT_SCREEN} component={RootContainer} />
                        <Stack.Screen name={SPLASH_SCREEN} component={SplashContainer} />
                        <Stack.Screen name={PROFILE_SCREEN} component={ProfileContainer} />
                        <Stack.Screen name={QR_SCAN_SCREEN} component={QrScanContainer} />
                        <Stack.Screen name={BLUETOOTH_SCREEN} component={BluetoothContainer} />
                        <Stack.Screen name={HOME_SCREEN} component={HomeContainer} />

                        {/* hidden feature screen stack. */}
                        <Stack.Screen name={HIDDEN_SPLASH_SCREEN} component={HiddenSplashContainer} />
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