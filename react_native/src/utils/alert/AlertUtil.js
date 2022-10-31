import { Alert, BackHandler } from "react-native"

/**
 * show alert.
 * @param {string} title 
 * @param {string} message 
 * @param {string} cancelTitle 
 * @param {string} confirmTitle 
 * @param {boolean} isCancelable 
 */
export const showAlert = (title, message, cancelTitle, confirmTitle, isCancelable) => {
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