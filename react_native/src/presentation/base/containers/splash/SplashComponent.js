import { View, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"

const loadingLottieAnim = require("../../../../assets/anims/splash_lottie.json")

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function SplashComponent() {
    return (
        <View style={styles.container}>
            <LottieView source={loadingLottieAnim} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1
    },
})