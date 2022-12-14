import AppSelectionComponent from './AppSelectionComponent'
import { useLayoutEffect } from 'react'

/**
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const AppSelectionContainer = ({ navigation }) => {

    useLayoutEffect(() => {

    }, [])

    onPressApp = (id) => {
        switch (id) {
            case "a1":
                navigation.navigate("APP_1_SPLASH_SCREEN")
                break
            case "a2":
                navigation.navigate("APP_2_SPLASH_SCREEN")
                break;
        }
    }

    return (
        <AppSelectionComponent
            onPressApp={onPressApp}
        />
    )
}
export default AppSelectionContainer