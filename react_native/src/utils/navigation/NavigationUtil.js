
/**
 * navigate screen.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const navigateToNextScreen = (navigation, screenToBeMoved, delay, purpose) => {
    setTimeout(() => {
        navigation.navigate(screenToBeMoved, { purposeWhat: purpose })
    }, delay)
}

/**
 * push screen.
 * Refs. use 'push' method if there's the same route.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const pushToNextScreen = (navigation, screenToBeMoved, delay, purpose) => {
    setTimeout(() => {
        navigation.push(screenToBeMoved, { purposeWhat: purpose })
    }, delay)
}