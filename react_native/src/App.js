import { RecoilRoot } from 'recoil'
import { LogBox } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashContainer from './src/containers/SplashContainer'
import AppSelectionContainer from './src/containers/AppSelectionContainer'
import App1SplashContainer from './src/containers/App1SplashContainer'

LogBox.ignoreAllLogs()

const SPLASH_SCREEN = "SPLASH_SCREEN"
const APP_SELECTION_SCREEN = "APP_SELECTION_SCREEN"
const APP_1_SPLASH_SCREEN = "APP_1_SPLASH_SCREEN"

const Stack = createNativeStackNavigator()

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
              name={APP_SELECTION_SCREEN}
              component={AppSelectionContainer}
              options={{ headerShown: false }} />
            <Stack.Screen
              name={APP_1_SPLASH_SCREEN}
              component={App1SplashContainer}
              options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </>
  )
}