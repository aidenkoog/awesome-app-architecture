import { useLayoutEffect, useState } from "react"
import Constants from "../../../utils/Constants"
import { logDebug, outputErrorLog } from "../../../utils/logger/Logger"
import { getIsDeviceRegistered } from "../../../utils/storage/StorageUtil"
import HomeComponent from "./HomeComponent"
import {
    bleConnectionCompleteStateAtom, bleConnectionStateAtom
} from '../../../data/adapters/recoil/bluetooth/ConnectionStateAtom'
import { useRecoilValue } from 'recoil'
import GetBatteryLevelUseCase from "../../../domain/usecases/bluetooth/basic/GetBatteryLevelUseCase"
import RequestDeviceInfoUseCase from "../../../domain/usecases/bluetooth/feature/device/RequestDeviceInfoUseCase"
import { formatRefreshTime } from "../../../utils/time/TimeUtil"
import GetProfileInfoUseCase from "../../../domain/usecases/common/GetProfileInfoUseCase"

const LOG_TAG = Constants.LOG.HOME_UI_LOG

/**
 * item's id information that exists in home card.
 */
const ITEM_ID_STEP = 2
const ITEM_ID_HEART_RATE = 3
const ITEM_ID_SLEEP = 4

/**
 * home main screen.
 * @param {Any} navigation 
 * @returns {JSX.Element}
 */
function HomeContainer({ }) {

    /**
     * useState code for ui interaction.
     */
    const [isDeviceRegistered, setIsDeviceRegistered] = useState(true)
    const [bleDeviceBatteryLevel, setBleDeviceBatteryLevel] = useState("--")
    const [refreshedTime, setRefreshedTime] = useState("--")

    /**
     * usecase function for getting to the battery level of ble device.
     */
    const { executeGetBatteryLevelUseCase } = GetBatteryLevelUseCase()

    /**
     * usecase function for getting the stored profile data.
     */
    const { executeGetProfileInfoUseCase } = GetProfileInfoUseCase()

    /**
     * usecase funtions for requesting device information.
     */
    const {
        executeRefreshDeviceInfoUseCase,
        executeGetStepInfoUseCase,
        executeGetHrInfoUseCase,
        executeGetSleepInfoUseCase

    } = RequestDeviceInfoUseCase()

    /**
     * state management variables to change UI according to Bluetooth operation state change
     */
    const bleConnectionState = useRecoilValue(bleConnectionStateAtom)
    const bleConnectionCompleteState = useRecoilValue(bleConnectionCompleteStateAtom)

    /**
     * callback that is called when item in home card is pressed.
     */
    onPressCardItem = (item) => {
        switch (item.id) {
            case ITEM_ID_STEP:
                executeGetStepInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e))
                break

            case ITEM_ID_HEART_RATE:
                executeGetHrInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e))
                break

            case ITEM_ID_SLEEP:
                executeGetSleepInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e))
                break
        }
    }

    /**
     * callback that is called when user presses the refresh icon or text view.
     */
    onPressRefreshArea = () => {
        executeRefreshDeviceInfoUseCase().then(() => {
            setRefreshedTime(formatRefreshTime())

            executeGetBatteryLevelUseCase().then((batteryLevel) => {
                setBleDeviceBatteryLevel(batteryLevel)
            })

        }).catch((e) => outputErrorLog(LOG_TAG, e))
    }

    /**
     * executed logic before ui rendering and painting.
     */
    useLayoutEffect(() => {
        logDebug(LOG_TAG, "<<< bleConnectionState: " + bleConnectionState
            + ", bleConnectionCompleteState: " + bleConnectionCompleteState)

        getIsDeviceRegistered().then((registered) => {
            logDebug(LOG_TAG, "<<< device is registered ? " + registered)
            setIsDeviceRegistered(registered)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e)
        })

        executeGetBatteryLevelUseCase().then((batteryLevel) => {
            setBleDeviceBatteryLevel(batteryLevel)
        })

        executeGetProfileInfoUseCase(userProfileInfo => {
            logDebug(LOG_TAG, "<<< userProfileInfo: " + JSON.stringify(userProfileInfo))
            logDebug(LOG_TAG, "<<< profileImageUrl: " + userProfileInfo.profileImageUrl)
            logDebug(LOG_TAG, "<<< profileName: " + userProfileInfo.profileName)
            logDebug(LOG_TAG, "<<< profileGender: " + userProfileInfo.profileGender)
            logDebug(LOG_TAG, "<<< profileBirthday: " + userProfileInfo.profileBirthday)
            logDebug(LOG_TAG, "<<< profileHeight: " + userProfileInfo.profileHeight)
            logDebug(LOG_TAG, "<<< profileWeight: " + userProfileInfo.profileWeight)
        })

    }, [])

    return (
        <HomeComponent
            isDeviceRegistered={isDeviceRegistered}
            bleConnectionCompleteState={bleConnectionCompleteState}
            bleDeviceBatteryLevel={bleDeviceBatteryLevel}
            refreshedTime={refreshedTime}
            onPressCardItem={onPressCardItem.bind(this)}
            onPressRefreshArea={onPressRefreshArea}
        />
    )
}

export default HomeContainer
