import { logDebug, logDebugWithLine, outputErrorLog } from "../../utils/logger/Logger"
import HomeComponent from "./HomeComponent"
import { useLayoutEffect, useState } from "react"
import GetLocationInfoUseCase from "../../domain/usecases/GetLocationInfoUseCase"
import MeasureInfo from "../../domain/entities/MeasureInfo"
import { locationInfoAtom } from "../../data/adapters/recoil/LocationInfoAtom"
import { useSetRecoilState } from "recoil"

const LOG_TAG = "HomePage"

/**
 * home page.
 * @returns {JSX.Element}
 */
export default function HomeContainer() {

    /**
     * use state for ui interaction.
     */
    const [activities, setActivities] = useState([])

    /**
     * usecases.
     */
    const { executeGetLocationInfoUseCase } = GetLocationInfoUseCase()

    /**
     * state management atom.
     */
    const setLocationInfoAtom = useSetRecoilState(locationInfoAtom)

    /**
     * @deprecated
     * create response custom object list.
     * refs. 
     * function styled component doesn't cognize the arrow styled function.
     * so, createResponseInfoList has to be made as function style.
     * @param {Any}
     * @returns {Array}
     */
    function createResponseInfoList(response) {
        let responseList = []
        for (const item of response) {
            responseList.push(new MeasureInfo(
                item.eventType,
                item.provider,
                item.lat,
                item.lng,
                item.altitude,
                item.accuracy,
                item.battery,
                item.locationType,
                item.wearing,
                item.idle,
                item.status,
                item.delay,
                item.measureDate,
                item.createDate))
        }
        return responseList
    }

    /**
     * it's called before ui rendering and painting.
     */
    useLayoutEffect(() => {
        executeGetLocationInfoUseCase().then((response) => {

            logDebugWithLine(LOG_TAG, "<<< response length: " + response.length + ", response: " + response)

            const responseJsonString = JSON.stringify(response)
            const responseJsonParsed = JSON.parse(responseJsonString)

            logDebug(LOG_TAG, "<<< responseJsonString: " + responseJsonString)
            logDebug(LOG_TAG, "<<< responseJsonParsed: " + responseJsonParsed)

            // update use state for updating table list.
            setActivities(response)
            setLocationInfoAtom(response)

        }).catch((e) => {
            outputErrorLog(LOG_TAG, e + " occurred by executeGetLocationInfoUseCase")
        })

    }, [])

    /**
     * handle event occurred when copy link button is pressed.
     */
    function onPressCopyLink() {
        logDebug(LOG_TAG, "<<< copy link button is pressed")
    }

    /**
     * handle event occurred when collect data button is pressed.
     */
    function onPressCollectData() {
        logDebug(LOG_TAG, "<<< collect data button is pressed")
    }

    return (
        <>
            <HomeComponent
                activities={activities}
                onPressCopyLink={onPressCopyLink}
                onPressCollectData={onPressCollectData}
            />
        </>
    )
}
