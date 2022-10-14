/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

import Splash from '../../../presentation/containers/splash/SplashContainer';

/* navigation screen stack */
const AppStack = createStackNavigator(
    { Splash: { screen: Splash } },
    { initialRouteName: 'Splash', headerMode: 'none' },
);

export default createAppContainer(AppStack);
