import React, { useState } from 'react'
import { Strings } from '../../../utils/theme'
import { BackHandler } from 'react-native'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { emptyField, getOnlyNumber, imageOptions } from "../../../utils/common/CommonUtil"
import { formatDateToString } from '../../../utils/time/TimeUtil'
import { requestCameraPermission } from '../../../utils/permission/PermissionUtil'
import Constants from '../../../utils/Constants'
import SetProfileInfoUseCase from '../../../domain/usecases/common/SetProfileInfoUseCase'
import { logDebug, outputErrorLog } from '../../../utils/logger/Logger'
import { showAlert } from '../../../utils/alert/AlertUtil'
import ProfileComponent from './ProfileComponent'
import { navigateToNextScreen } from '../../../utils/navigation/NavigationUtil'
import { UserProfile } from '../../../domain/entities/user/UserProfile'

const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME
const REGISTER_USER_STRINGS = Strings.registerSenior
const LOG_TAG = Constants.LOG.PROFILE_UI_LOG

/**
 * next screen information.
 */
const NEXT_SCREEN = Constants.SCREEN.QR_SCAN

/**
 * profile registration screen.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function ProfileContainer(props) {

    /**
     * useState code for ui interaction.
     */
    const [modalPhotoVisible, setModalPhotoVisible] = useState(false)
    const [modalDatePickerVisible, setModalDatePickerVisible] = useState(false)
    const [photoUrl, setPhotoUrl] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState(0)
    const [date, setDate] = useState(REGISTER_USER_STRINGS.placeHolderBirthday)
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")

    /**
     * usecase function for setting profile info.
     */
    const { executeSetProfileInfoUseCase } = SetProfileInfoUseCase()

    /**
     * handle back button click event. (android)
     * @returns {boolean}
     */
    const handleBackButtonClick = () => {
        showAlert("Warning", "Do you want to terminate app?", "Cancel", "OK", false)
        return true
    }

    /**
     * handle the event that occurs when 'Done' button is pressed.
     */
    onClickDoneButton = () => {
        executeSetProfileInfoUseCase(getUserProfileInfo(), (succeeded) => {
            if (succeeded) {
                navigateToNextScreen(props.navigation, NEXT_SCREEN, NAVIGATION_NO_DELAY_TIME)
            }
        })
    }

    /**
     * get user profile information.
     */
    getUserProfileInfo = () => {
        UserProfile.imageUrl = photoUrl
        UserProfile.name = name
        UserProfile.gender = gender
        UserProfile.birthday = birthday
        UserProfile.height = height
        UserProfile.weight = weight

        return UserProfile
    }

    /**
     * set whether to show the modal corresponding to the key parameter.
     * @param {string} key
     * @param {boolean} visible
     */
    setModalVisibilty = (key, visible) => {
        switch (key) {
            case 'modalPhotoVisible':
                setModalPhotoVisible(visible)
                break
            case 'modalDatePickerVisible':
                setModalDatePickerVisible(visible)
                break
        }
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
    }

    /**
     * handle state' change of name, height and weight.
     */
    onChangeState = (key, value) => {
        switch (key) {
            case "name":
                setName(value)
                break
            case "height":
                setHeight(value)
                break
            case "weight":
                setWeight(value)
                break
            case "gender":
                setGender(value)
                break
        }
    }

    /**
     * handle the event that occurs when 'Done' button is pressed in birthday modal.
     */
    onSelectDateOfBirthday = (date) => {
        setDate(formatDateToString(date))
    }

    /**
     * request camera permission and execute camera if permission is granted.
     */
    takePhotoAction = async () => {
        setModalVisibilty('modalPhotoVisible', false)
        try {
            if (requestCameraPermission()) {
                logDebug(LOG_TAG, "<<< camera permission given")
                launchCamera(imageOptions, (response) => {
                    logDebug(LOG_TAG, "<<< photoFileName: " + response.fileName
                        + ", photoUri: " + response.uri
                        + ", photoType: " + response.type)

                    if (response.uri != null) {
                        logDebug(LOG_TAG, ">>> photo response uri: " + response.uri)
                        setPhotoUrl(response.uri)
                        setModalVisibilty('modalPhotoVisible', false)

                    } else {
                        outputErrorLog(LOG_TAG, e)
                    }
                })
            }
        } catch (e) {
            outputErrorLog(LOG_TAG, e)
        }
    }

    /**
     * launch image libary.
     */
    selectGallery = () => {
        setModalVisibilty('modalPhotoVisible', false)
        launchImageLibrary(imageOptions, (response) => {
            logDebug(LOG_TAG, "<<< photoFileName: " + response.fileName
                + ", photoUri: " + response.uri
                + ", photoType: " + response.type)

            if (response.uri != null) {
                logDebug(LOG_TAG, ">>> photo response uri: " + response.uri)
                setPhotoUrl(response.uri)

            } else {
                outputErrorLog(LOG_TAG, e)
            }
        })
    }

    /**
     * determine if 'Done' button can be enabled or not.
     */
    disableDoneButton = () => {
        return emptyField(name)
            || emptyField(getOnlyNumber(height))
            || emptyField(getOnlyNumber(weight))
            || emptyField(date)
    }

    return (
        <ProfileComponent
            modalPhotoVisible={modalPhotoVisible}
            modalDatePickerVisible={modalDatePickerVisible}
            setModalVisibilty={setModalVisibilty}
            gender={gender}
            photoUrl={photoUrl}
            date={date}
            disableDoneButton={disableDoneButton}
            onClickDoneButton={onClickDoneButton}
            onSelectDateOfBirthday={onSelectDateOfBirthday}
            selectGallery={selectGallery}
            takePhotoAction={takePhotoAction}
            onChangeState={onChangeState}
        />
    )
}