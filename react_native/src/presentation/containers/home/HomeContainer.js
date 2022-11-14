import GetBatteryLevelUseCase from "../../../domain/usecases/bluetooth/basic/GetBatteryLevelUseCase"
import SyncDeviceInfoUseCase from "../../../domain/usecases/bluetooth/feature/device/SyncDeviceInfoUseCase"
import GetDeviceRegistrationUseCase from "../../../domain/usecases/common/GetDeviceRegistrationUseCase"
import { formatRefreshTime } from "../../../utils/time/TimeUtil"
import GetProfileInfoUseCase from "../../../domain/usecases/common/GetProfileInfoUseCase"
import { useLayoutEffect, useState } from "react"
import Constants from "../../../utils/Constants"
import { logDebugWithLine, outputErrorLog } from "../../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"
import { bleConnectionCompleteStateAtom, bleConnectionStateAtom } from '../../../data'
import { useRecoilValue } from 'recoil'


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
    const [userName, setUserName] = useState("-")
    const [userImageUrl, setUserImageUrl] = useState("-")
    const [userGender, setUserGender] = useState("-")
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [homeCardItems, addHomeCardItem] = useState([{ id: 999, name: "HOME CARD" }])

    /**
     * usecases.
     */
    const { executeGetBatteryLevelUseCase } = GetBatteryLevelUseCase()
    const { executeGetProfileInfoUseCase } = GetProfileInfoUseCase()
    const { executeSyncDeviceInfoUseCase } = SyncDeviceInfoUseCase()
    const { executeGetDeviceRegistrationUseCase } = GetDeviceRegistrationUseCase()

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
                executeSyncDeviceInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e + " occurred by executeSyncDeviceInfoUseCase"))
                break

            case ITEM_ID_HEART_RATE:
                executeSyncDeviceInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e + " occurred by executeSyncDeviceInfoUseCase"))
                break

            case ITEM_ID_SLEEP:
                executeSyncDeviceInfoUseCase().then(() => {

                }).catch((e) => outputErrorLog(LOG_TAG, e + " occurred by executeSyncDeviceInfoUseCase"))
                break
        }
    }

    /**
     * callback that is called when user presses the refresh icon or text view.
     */
    onPressRefreshArea = () => {
        executeSyncDeviceInfoUseCase().then(() => {
            setRefreshedTime(formatRefreshTime())

            executeGetBatteryLevelUseCase().then((batteryLevel) => {
                setBleDeviceBatteryLevel(batteryLevel)

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by executeGetBatteryLevelUseCase")
            })

        }).catch((e) => outputErrorLog(LOG_TAG, e + " occurred by executeSyncDeviceInfoUseCase"))
    }

    /**
     * get user profile information and update them for rendering ui.
     */
    loadUserProfile = () => {
        executeGetProfileInfoUseCase(userProfileInfo => {
            const userProfile = JSON.parse(userProfileInfo)
            const userImageUrl = userProfile.imageUrl

            setUserName(userProfile.name)
            setUserImageUrl(userImageUrl == null || userImageUrl == "" ? "-" : userImageUrl)
            setUserGender(userProfile.gender)
        })
    }

    /**
     * get value that represents if device is already registered and update it for rendering ui.
     */
    loadDeviceRegistrationData = () => {
        executeGetDeviceRegistrationUseCase().then((registered) => {
            setIsDeviceRegistered(registered)

        }).catch((e) => { outputErrorLog(LOG_TAG, e) })
    }

    /**
     * get ble battery level, update it, and update refresh time information for rendering ui.
     */
    loadBleBatteryLevel = () => {
        return new Promise((fulfill, reject) => {
            executeGetBatteryLevelUseCase().then(batteryLevel => {
                setBleDeviceBatteryLevel(batteryLevel)
                setRefreshedTime(formatRefreshTime())
                fulfill()

            }).catch((e) => {
                outputErrorLog(LOG_TAG, e + " occurred by executeGetBatteryLevelUseCase")
                reject(e)
            })
        })
    }

    /**
     * add new device.
     */
    onAddDevice = () => {
        pushToNextScreen(navigation, NEXT_SCREEN_QR_SCAN, NAVIGATION_NO_DELAY_TIME, NAVIGATION_PURPOSE)
    }

    /**
     * handle the swipe refreshing event.
     */
    onSwipeRefresh = () => {
        setIsRefreshing(true)
        this.loadBleBatteryLevel().then(() => {
            setIsRefreshing(false)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by loadBleBatteryLevel")
            setIsRefreshing(false)
        })
    }

    /**
     * executed logic before ui rendering and painting.
     */
    useLayoutEffect(() => {
        logDebugWithLine(LOG_TAG, "bleConnectionState: " + bleConnectionState
            + ", bleConnectionCompleteState: " + bleConnectionCompleteState)

        this.loadDeviceRegistrationData()
        this.loadBleBatteryLevel()
        this.loadUserProfile()
        addHomeCardItem([{ id: 999, name: "HOME CARD" }])

    }, [])

    return (
        <HomeComponent
            userName={userName}
            userImageUrl={userImageUrl}
            userGender={userGender}
            isRefreshing={isRefreshing}
            onSwipeRefresh={onSwipeRefresh}
            homeCardItems={homeCardItems}
            onAddDevice={onAddDevice}
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
