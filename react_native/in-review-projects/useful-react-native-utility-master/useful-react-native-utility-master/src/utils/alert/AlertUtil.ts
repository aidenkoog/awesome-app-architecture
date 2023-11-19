import { Alert, BackHandler } from "react-native"

/**
 * show alert with two buttons.
 * @param {string} title 
 * @param {string} message 
 * @param {string} cancelTitle 
 * @param {string} confirmTitle 
 * @param {boolean} isCancelable 
 */
export const showAlert = (
    title: string,
    message: string,
    cancelTitle: string,
    confirmTitle: string,
    isCancelable: boolean) => {

    Alert.alert(title, message, [{
        text: cancelTitle,
        onPress: () => { },
        style: 'cancel'
    }, {
        text: confirmTitle,
        onPress: () => BackHandler.exitApp()
    },], { cancelable: isCancelable }
    )
}

/**
 * show alert with only one button.
 * @param {string} title 
 * @param {string} message 
 * @param {string} confirmTitle 
 * @param {boolean} isCancelable 
 * @param {any} onPressOk
 */
export const showAlertWithOneButton = (
    title: string,
    message: string,
    confirmTitle: string,
    isCancelable: boolean,
    onPressOk: any) => {

    Alert.alert(title, message, [
        { text: confirmTitle, onPress: onPressOk },
    ], { cancelable: isCancelable })
}