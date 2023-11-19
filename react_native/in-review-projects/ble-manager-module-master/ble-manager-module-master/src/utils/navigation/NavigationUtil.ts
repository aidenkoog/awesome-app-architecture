import Constants from "../Constants"

const NAVIGATION_PURPOSE_NORMAL = Constants.NAVIGATION.PURPOSE.NORMAL
const SPLASH_SCREEN = Constants.SCREEN.SPLASH
const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME

/**
 * navigate screen.
 * @param {any} navigation 
 * @param {string} screenToBeMoved 
 */
export const navigateToNextScreen = (
    navigation: any,
    screenToBeMoved: string,
    delay = NAVIGATION_NO_DELAY_TIME,
    purpose = NAVIGATION_PURPOSE_NORMAL) => {

    setTimeout(() => {
        navigation.navigate(screenToBeMoved, { purposeWhat: purpose })
    }, delay)
}

/**
 * navigate to device status screen.
 * @param {any} navigation 
 * @param {string} screenToBeMoved 
 * @param {string} statusType
 */
export const navigateToDeviceStatusScreen = (
    navigation: any,
    screenToBeMoved: string,
    delay = NAVIGATION_NO_DELAY_TIME,
    purpose = NAVIGATION_PURPOSE_NORMAL,
    statusType: string) => {

    setTimeout(() => {
        navigation.navigate(
            screenToBeMoved,
            { purposeWhat: purpose, statusType: statusType })
    }, delay)
}

/**
 * push screen.
 * Refs. use 'push' method if there's the same route.
 * @param {any} navigation 
 * @param {string} screenToBeMoved 
 */
export const pushToNextScreen = (
    navigation: any,
    screenToBeMoved: string,
    delay = NAVIGATION_NO_DELAY_TIME,
    purpose = NAVIGATION_PURPOSE_NORMAL) => {

    setTimeout(() => {
        navigation.push(screenToBeMoved, { purposeWhat: purpose })
    }, delay)
}

/**
 * reset stacks.
 * @param {any} navigation 
 */
export const resetNavigationStacks = (
    navigation: any,
    delay = NAVIGATION_NO_DELAY_TIME) => {

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
 * @param {any} navigation 
 * @param {string} screenToBeMoved 
 */
export const replaceToNextScreen = (
    navigation: any,
    screenToBeMoved: string,
    delay = NAVIGATION_NO_DELAY_TIME,
    purpose = NAVIGATION_PURPOSE_NORMAL) => {

    setTimeout(() => {
        navigation.replace(screenToBeMoved, { purposeWhat: purpose })
    }, delay)
}