import { NAVER_CLIENT_ID } from "../../utils/Constants"
import MapLoadingErrorComponent from "./MapLoadingErrorComponent"
import MapLoadingLottieComponent from "./MapLoadingLottieComponent"
import { RenderAfterNavermapsLoaded } from 'react-naver-maps'
import NaverMapComponent from "../components/NaverMapComponent"
import { logDebug } from "../../utils/logger/Logger"
import MapTableComponent from "./MapTableComponent"
import { MAIN_TITLE } from "../../assets/strings/Strings"

const LOG_TAG = "MainView"

/**
 * Main view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function MainView(props) {

    const {
        currentAddress,
        longitude,
        latitude,
        isReportExpired,
        errorMessage,
        hasError,
        loading,
        recentHistory
    } = props

    logDebug(LOG_TAG, "<<< latitude: " + latitude + ", longitude: " + longitude + ", loading: " + loading)
    logDebug(LOG_TAG, "<<< isReportExpired: " + isReportExpired + ", hasError: " + hasError)

    return (
        <div className="map_root_container">
            {!isReportExpired && !hasError ?
                <div className="map_container">
                    {!isReportExpired && !hasError ?
                        <div style={{ marginTop: 65, marginBottom: 22, marginLeft: 7 }}>
                            <b style={{ fontSize: 21 }}>{MAIN_TITLE}</b>
                        </div>
                        :
                        <b></b>
                    }
                    <MapTableComponent recentHistory={recentHistory} />

                    {loading ?
                        <div className="first_loading_container"><MapLoadingLottieComponent /></div>
                        :
                        <RenderAfterNavermapsLoaded
                            clientId={NAVER_CLIENT_ID}
                            ncpClientId={NAVER_CLIENT_ID}
                            loading={<div className="first_loading_container"><MapLoadingLottieComponent /></div>}
                            error={<div className="error_message_container"><MapLoadingErrorComponent /></div>}
                        >
                            <NaverMapComponent
                                latitude={latitude}
                                longitude={longitude}
                            />
                        </RenderAfterNavermapsLoaded>
                    }

                </div>
                :
                loading ?
                    <div className="map_container">
                        <div style={{ marginTop: 65, marginBottom: 22, marginLeft: 7 }}>
                            <b style={{ fontSize: 21 }}>{MAIN_TITLE}</b>
                        </div>
                        <MapTableComponent recentHistory={recentHistory} />
                        <div className="first_loading_container">
                            <MapLoadingLottieComponent />
                        </div>
                    </div> :
                    <div className="map_container">
                        <div className="error_container">
                            <div style={{ marginTop: 65, marginBottom: 22, marginLeft: 7 }}>
                                <b style={{ fontSize: 21 }}>{MAIN_TITLE}</b>
                            </div>
                            <MapTableComponent recentHistory={null} />
                            <div className="error_message_container">
                                <MapLoadingErrorComponent
                                    errorMessage={errorMessage}
                                    isReportExpired={isReportExpired}
                                    currentAddress={currentAddress}
                                    hasError={hasError} />
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}