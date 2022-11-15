import { View, Image, StyleSheet } from "react-native"
import { Images } from "../../../utils/theme"

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function SplashComponent() {
    return (
        <View style={styles.container}>
            {/* background image */}
            <View style={styles.splashImageContainer}>
                <Image resizeMode='contain'
                    style={styles.splashImage}
                    source={Images.icSplashCarescend} />
            </View>
            {/* carescend logo */}
            <View style={styles.splashLogoContainer}>
                <Image resizeMode='contain'
                    style={styles.splashLogo}
                    source={Images.icLogoClip} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff7271',
        flex: 1
    },
    splashImageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    splashImage: {
        width: 135,
        height: 102
    },
    splashLogoContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    splashLogo: {
        width: 68,
        height: 32
    }
})