import Constants from "../Constants"

const NAVIGATION_PURPOSE_NORMAL = Constants.NAVIGATION.PURPOSE.NORMAL

/**
 * navigate screen.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const navigateToNextScreen = (navigation, screenToBeMoved, delay, purpose = NAVIGATION_PURPOSE_NORMAL) => {
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

/**
 * replace screen.
 * Refs. use 'replace' method, it's not stack the screen but just replace it.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const replaceToNextScreen = (navigation, screenToBeMoved, delay, purpose) => {
    setTimeout(() => {
        navigation.replace(screenToBeMoved, { purposeWhat: purpose })
    }, delay)
}