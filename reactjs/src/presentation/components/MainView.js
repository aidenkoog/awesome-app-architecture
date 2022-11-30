import { NAVER_CLIENT_ID } from "../../utils/Constants"
import MapLoadingErrorComponent from "./MapLoadingErrorComponent"
import MapLoadingLottieComponent from "./MapLoadingLottieComponent"
import { RenderAfterNavermapsLoaded } from 'react-naver-maps'
import NaverMapComponent from "../components/NaverMapComponent"

/**
 * main view component.
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
        loading
    } = props

    return (
        <div className="map_root_container">
            {!isReportExpired && !hasError ?
                <div className="map_container">
                    {!isReportExpired && !hasError ?
                        <div>
                            <text>
                                <b>[Location]</b>
                            </text>
                            <text>
                                <h2>{currentAddress}</h2>
                            </text>
                        </div>
                        :
                        <text></text>
                    }
                    <br></br>
                    <br></br>
                    <RenderAfterNavermapsLoaded
                        ncpClientId={NAVER_CLIENT_ID}
                        error={<MapLoadingErrorComponent />}
                        loading={<MapLoadingLottieComponent />}
                    >
                        <NaverMapComponent
                            latitude={latitude}
                            longitude={longitude}
                        />
                    </RenderAfterNavermapsLoaded>
                </div>
                :
                loading ? <div className="map_container"><MapLoadingLottieComponent /></div> :
                    <div className="map_container">
                        <MapLoadingErrorComponent
                            errorMessage={errorMessage}
                            isReportExpired={isReportExpired}
                            currentAddress={currentAddress}
                            hasError={hasError} />
                    </div>
            }

        </div>
    )
}