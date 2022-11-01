
/**
 * navigate screen.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const navigateToNextScreen = (navigation, screenToBeMoved, delay) => {
    setTimeout(() => {
        navigation.navigate(screenToBeMoved)
    }, delay)
}