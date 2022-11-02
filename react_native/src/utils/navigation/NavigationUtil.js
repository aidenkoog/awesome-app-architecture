
/**
 * navigate screen.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const navigateToNextScreen = (navigation, screenToBeMoved, delay, isDeviceRegistered = true) => {
    setTimeout(() => {
        navigation.navigate(screenToBeMoved, { isDeviceRegistered: isDeviceRegistered })
    }, delay)
}