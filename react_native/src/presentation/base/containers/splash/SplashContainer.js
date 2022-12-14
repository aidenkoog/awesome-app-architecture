import SplashComponent from './SplashComponent'
import { useLayoutEffect } from 'react'

/**
 * splash screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const SplashContainer = ({ navigation }) => {

    useLayoutEffect(() => {
        setTimeout(() => {
            navigation.replace("PERMISSION_SCREEN")
        }, 1500)
    }, [])

    return (
        <SplashComponent />
    )
}
export default SplashContainer