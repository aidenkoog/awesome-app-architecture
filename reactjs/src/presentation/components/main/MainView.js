import { RenderAfterNavermapsLoaded } from 'react-naver-maps'
import NaverMapComponent from "../maps/map/NaverMapComponent"
import MapTableComponent from "../maps/table/MapTableComponent"
import { MAIN_TITLE } from "../../../assets/strings/Strings"
import MapLoadingErrorComponent from "../maps/error/MapLoadingErrorComponent"
import MapLoadingLottieComponent from "../maps/loading/MapLoadingLottieComponent"
import { NAVER_CLIENT_ID } from "../../../utils/Constants"
import "./MainView.css"
import OpenLayersMap from '../maps/openlayers/OpenLayersMap'
import { logDebug } from '../../../utils/logger/Logger'

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
        recentHistory,
        domainUrl
    } = props

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

                        <OpenLayersMap
                            latitude={latitude}
                            longitude={longitude}
                            domainUrl={domainUrl}
                        ></OpenLayersMap>
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
                    </div>

                    :

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