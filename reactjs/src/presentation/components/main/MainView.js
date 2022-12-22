import MapTableComponent from "../maps/table/MapTableComponent"
import { MAIN_TITLE } from "../../../assets/strings/Strings"
import MapLoadingErrorComponent from "../maps/error/MapLoadingErrorComponent"
import MapLoadingProgressComponent from "../maps/loading/MapLoadingProgressComponent"
import "./MainView.css"
import MapImageView from '../maps/map_image/MapImageView'

/**
 * Main view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function MainView(props) {

    const {
        currentAddress,
        shortAddress,
        longitude,
        latitude,
        isReportExpired,
        errorMessage,
        hasError,
        loading,
        recentHistory,
        domainUrl,
        currentZoomLevel,
        onClickZoomIn,
        onClickZoomOut,
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
                        <div className="first_loading_container"><MapLoadingProgressComponent /></div>
                        :

                        <MapImageView
                            latitude={latitude}
                            longitude={longitude}
                            domainUrl={domainUrl}
                            currentAddress={currentAddress}
                            shortAddress={shortAddress}
                            currentZoomLevel={currentZoomLevel}
                            onClickZoomIn={onClickZoomIn}
                            onClickZoomOut={onClickZoomOut}
                        />
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
                            <MapLoadingProgressComponent />
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