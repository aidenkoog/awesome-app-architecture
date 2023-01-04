import { Colors, Fonts, Images } from '../../utils/theme'
import { Image, StyleSheet, Text, View } from 'react-native'

/**
 * Refs. TouchableOpacity's onPress method is not working if 'react-native-gesture-handler' library is applied.
 */
import { TouchableOpacity } from 'react-native'

export default function HeaderWithBack(props) {

    const { title, onPressHeaderBackIcon, action = false, actionText = '', onAction } = props

    return (
        <View style={{ flexDirection: 'row', height: 70, width: '100%', backgroundColor: '', marginBottom: 0 }}>
            <TouchableOpacity onPress={onPressHeaderBackIcon}>
                <View style={{ justifyContent: 'center', width: 50, height: 70, alignItems: 'center' }}>
                    <Image style={{ width: 24, height: 24 }} source={Images.iconArrowLeft} />
                </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', height: 70, alignItems: 'flex-start', flex: 1 }}>
                <Text numberOfLines={1} style={styles.signUpText}>{title}</Text>
            </View>
            {action && <TouchableOpacity onPress={onAction}>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 70 }}>
                    <Text style={styles.actionText}>{actionText}</Text>
                </View>
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    signUpText: {
        fontFamily: Fonts.family.Medium,
        fontSize: 22,
        color: Colors.darkGrey,
    },
    actionText: {
        fontSize: 20,
        fontFamily: Fonts.family.Medium,
        color: Colors.lightishBlue,
        textAlign: 'center',
        paddingHorizontal: 15
    }
})