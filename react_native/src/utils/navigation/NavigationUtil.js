import Constants from "../Constants"

const NAVIGATION_PURPOSE_NORMAL = Constants.NAVIGATION.PURPOSE.NORMAL
const SPLASH_SCREEN = Constants.SCREEN.SPLASH
const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME

/**
 * navigate screen.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const navigateToNextScreen = (
    navigation, screenToBeMoved, delay = NAVIGATION_NO_DELAY_TIME, purpose = NAVIGATION_PURPOSE_NORMAL) => {
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
export const pushToNextScreen = (
    navigation, screenToBeMoved, delay = NAVIGATION_NO_DELAY_TIME, purpose = NAVIGATION_PURPOSE_NORMAL) => {
    setTimeout(() => {
        navigation.push(screenToBeMoved, { purposeWhat: purpose })
    }, delay)
}

/**
 * reset stacks.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const resetNavigationStacks = (navigation, delay = NAVIGATION_NO_DELAY_TIME) => {
    setTimeout(() => {
        navigation.reset({
            routes: [{ name: SPLASH_SCREEN }, {
                params: { reset: 'reset' },
            }]
        })
    }, delay)
}

/**
 * replace screen.
 * Refs. use 'replace' method, it's not stack the screen but just replace it.
 * @param {Any} navigation 
 * @param {string} screenToBeMoved 
 */
export const replaceToNextScreen = (
    navigation, screenToBeMoved, delay = NAVIGATION_NO_DELAY_TIME, purpose = NAVIGATION_PURPOSE_NORMAL) => {
    setTimeout(() => {
        navigation.replace(screenToBeMoved, { purposeWhat: purpose })
    }, delay)
}