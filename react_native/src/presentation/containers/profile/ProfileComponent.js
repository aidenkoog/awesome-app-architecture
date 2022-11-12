import { Colors, Fonts, Strings, Metrics } from '../../../utils/theme'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native'
import {
    Avatar, ChoosePhotoPopup, PrimaryTextInput, TextButton, BottomPopup, DatePickerComponent, SuperscriptDateText
} from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from "react-navigation"
import { formatBirthdayDate, formatDate } from '../../../utils/time/TimeUtil'
import { KEY_GENDER_STATE, KEY_HEIGHT_STATE, KEY_MODAL_DATE_PICKER_VISIBLE, KEY_MODAL_PHOTO_VISIBLE, KEY_NAME_STATE, KEY_WEIGHT_STATE } from './ProfileContainer'


const REGISTER_SENIOR_STRINGS = Strings.registerSenior
const COMMON_STRINGS = Strings.common

/**
 * use this value instead of numeric in keyboardType props of TextInput.
 */
const numberKeyboard = Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'

/**
 * component ui that is used in container.
 * @returns {JSX.Element}
 */
export default function ProfileComponent(props) {

    /**
     * props delivered from ProfileContainer.
     */
    const {
        modalPhotoVisible, modalDatePickerVisible, setModalVisibilty, gender, photoUrl, date,
        disableDoneButton, onClickDoneButton, onSelectDateOfBirthday, selectGallery, takePhotoAction,
        onChangeState
    } = props

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.viewArea}>
                <KeyboardAwareScrollView
                    extraScrollHeight={0}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    style={{
                        paddingHorizontal: 20, marginTop: 70
                    }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.containerContent}>
                            {/* user image. */}
                            <View style={styles.avatar}>
                                <Avatar
                                    genderType={gender}
                                    photoUrl={photoUrl}
                                    onPress={() => { setModalVisibilty(KEY_MODAL_PHOTO_VISIBLE, true) }} />
                            </View>

                            {/* user name. */}
                            <View style={styles.rowBirthday}>
                                <Text style={styles.fieldText}>{REGISTER_SENIOR_STRINGS.titleName}</Text>
                                <PrimaryTextInput style={{ ...styles.viewInput }}
                                    placeholder={REGISTER_SENIOR_STRINGS.placeHolderName}
                                    onChange={text => onChangeState(KEY_NAME_STATE, text)}
                                />
                            </View>

                            {/* user gender. */}
                            <View style={styles.rowGender}>
                                <Text style={styles.fieldText}>{REGISTER_SENIOR_STRINGS.genderTitle}</Text>
                                <View style={{ ...styles.viewInput, flexDirection: 'row' }} >
                                    {
                                        REGISTER_SENIOR_STRINGS.gender.map(item => {
                                            return (
                                                <TouchableOpacity
                                                    style={styles.gender}
                                                    onPress={(e) => onChangeState(KEY_GENDER_STATE, item.id)}
                                                    key={item.id}>
                                                    <TouchableOpacity
                                                        style={{
                                                            ...styles.circle,
                                                            borderColor: gender === item.id ? Colors.red : Colors.black
                                                        }}
                                                        onPress={(e) => onChangeState(KEY_GENDER_STATE, item.id)}>
                                                        {gender === item.id && (<View style={styles.checkItem} />)}
                                                    </TouchableOpacity>
                                                    <Text style={styles.textGender}>{item.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                            </View>

                            {/* user birthday. */}
                            <View style={styles.rowBirthday} >
                                <Text style={styles.fieldText}>{REGISTER_SENIOR_STRINGS.birthday}</Text>
                                <TouchableWithoutFeedback
                                    style={{ alignItems: 'center' }}
                                    onPress={(e) => { setModalVisibilty(KEY_MODAL_DATE_PICKER_VISIBLE, true) }}>
                                    {date === REGISTER_SENIOR_STRINGS.placeHolderBirthday ?
                                        <Text style={{
                                            ...styles.textInput,
                                            ...styles.viewInput,
                                            color: Colors.coolGrey
                                        }}>
                                            {REGISTER_SENIOR_STRINGS.placeHolderBirthday}
                                        </Text>
                                        :
                                        <SuperscriptDateText
                                            style={{ ...styles.textInput, ...styles.viewInput }}>
                                            {formatBirthdayDate(date)}
                                        </SuperscriptDateText>
                                    }
                                </TouchableWithoutFeedback>

                            </View>

                            {/* user height. */}
                            <View style={styles.rowBirthday}>
                                <Text style={styles.fieldText}>{REGISTER_SENIOR_STRINGS.height}</Text>
                                <PrimaryTextInput style={{ ...styles.viewInput }}
                                    placeholder={REGISTER_SENIOR_STRINGS.placeHolderHeight}
                                    typeInput={numberKeyboard}
                                    onChange={text => onChangeState(KEY_HEIGHT_STATE, text)}
                                    maxLength={3}
                                    unit={REGISTER_SENIOR_STRINGS.cm}
                                />
                            </View>

                            {/* user weight. */}
                            <View style={styles.rowBirthday}>
                                <Text style={styles.fieldText}>{REGISTER_SENIOR_STRINGS.weight}</Text>
                                <PrimaryTextInput style={{ ...styles.viewInput }}
                                    placeholder={REGISTER_SENIOR_STRINGS.placeHolderWeight}
                                    typeInput={numberKeyboard}
                                    onChange={text => onChangeState(KEY_WEIGHT_STATE, text)}
                                    maxLength={3}
                                    unit={REGISTER_SENIOR_STRINGS.kg}
                                />
                            </View>
                        </View>

                    </TouchableWithoutFeedback>

                </KeyboardAwareScrollView>

                {/* complete button. */}
                <View style={{ paddingHorizontal: 20, paddingBottom: 27 }}>
                    <TextButton
                        disabled={disableDoneButton()}
                        onClick={onClickDoneButton.bind(this)}
                        style={styles.bottomButton}>
                        {COMMON_STRINGS.done}
                    </TextButton>
                </View>

                {/* user birthday popup. */}
                <BottomPopup
                    visible={modalDatePickerVisible}
                    onRequestClose={() => { setModalVisibilty(KEY_MODAL_DATE_PICKER_VISIBLE, false) }}>
                    <View style={styles.bottomViewDatePicker}>
                        <DatePickerComponent
                            onChange={onSelectDateOfBirthday}
                            date={formatDate(date)}
                            onClose={() => { setModalVisibilty(KEY_MODAL_DATE_PICKER_VISIBLE, false) }} />
                    </View>
                </BottomPopup>

                {/* user image selection popup. */}
                <BottomPopup
                    visible={modalPhotoVisible}
                    onRequestClose={() => { setModalVisibilty(KEY_MODAL_PHOTO_VISIBLE, false) }}>
                    <View style={styles.bottomView}>
                        <ChoosePhotoPopup
                            onClose={() => { setModalVisibilty(KEY_MODAL_PHOTO_VISIBLE, false) }}
                            takePhotoAction={() => { takePhotoAction() }}
                            selectGallery={() => { selectGallery() }}
                            useDefaultImage={() => { setModalVisibilty(KEY_MODAL_PHOTO_VISIBLE, false) }} />
                    </View>
                </BottomPopup>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white
    },
    viewArea: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.white
    },
    containerContent: {
        justifyContent: 'space-between',
        flex: 1,
    },
    contentTop: {
        justifyContent: "center",
    },
    fieldText: {
        flex: 3,
        color: Colors.darkGrey,
        fontSize: 16,
        fontFamily: Fonts.family.Re
    },
    rowBirthday: {
        flexDirection: 'row',
        minHeight: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColorEdit,
    },
    rowAddress: {
        height: 90,
        justifyContent: 'flex-start',
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColorEdit,
    },
    rowGender: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
    },
    gender: {
        flexDirection: 'row',
        flex: 3
    },
    avatar: {
        width: 110,
        height: 110,
        alignSelf: 'center',
        marginBottom: 40
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22 + Metrics.screenPaddingTop,
        height: 200,
    },
    bottomViewDatePicker: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        height: 325,
    },
    bottomButton: {
        borderColor: Colors.transparent,
    },
    circle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.coolGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textGender: {
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.regular,
        color: Colors.darkGreyTwo,
        marginLeft: 8,
    },
    checkItem: {
        width: 11,
        height: 11,
        borderRadius: 7,
        backgroundColor: Colors.red,
    },
    viewInput: {
        flex: 7
    },
    textInput: {
        fontSize: 18,
        fontFamily: Fonts.family.Medium,
        color: Colors.darkGreyTwo
    },
    textUnit: {
        fontSize: 17,
        fontFamily: Fonts.family.Medium,
        color: Colors.slateGrey,
        marginLeft: 5,
        flex: 1
    }
})