import PermissionComponent from './PermissionComponent'
import { useLayoutEffect } from 'react'

/**
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
const PermissionContainer = ({ navigation }) => {

    useLayoutEffect(() => {

    }, [])

    onPressOkBtn = () => {
        setTimeout(() => {
            navigation.navigate("APP_SELECTION_SCREEN")
        }, 0)
    }

    return (
        <PermissionComponent
            onPressOkBtn={onPressOkBtn}
        />
    )
}
export default PermissionContainer