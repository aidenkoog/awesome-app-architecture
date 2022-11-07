import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors, Images } from '../../utils/theme'

const Avatar = ({ onPress, photoUrl, genderType = 0, role = "Senior" }) => {
    return (
        <View styles={styles.container}>
            <Image
                source={photoUrl == null || photoUrl === "" || photoUrl == undefined
                    ? role === 'Senior'
                        ? genderType === 0
                            ? Images.icMaleUser
                            : Images.icFemaleUser
                        : Images.icMaleCarer
                    : { uri: photoUrl }}
                style={styles.image} resizeMode='cover' />
            <View style={styles.cameraView}>
                <TouchableOpacity onPress={() => { onPress() }} >
                    <Image source={Images.icCamera} style={styles.camera} resizeMode='stretch' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 55,
    },
    cameraView: {
        zIndex: 1,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: -10,
        right: -10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "rgba(155, 155, 155, 0.5)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    camera: {
        width: 24,
        height: 24,
    }
})