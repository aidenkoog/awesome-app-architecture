import HeaderView from "../components/header/HeaderView"
import MainView from "../components/main/MainView"
import MenuView from "../components/menu/MenuView"
import "./Home.css"

/**
 * home page component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function HomeComponent(props) {

    /**
     * props delivered from home page container.
     */
    const {
        onPressCollectData,
        onClickSaveHistory,
        latitude,
        longitude,
        historyList,
        currentAddress,
        shortAddress,
        isReportExpired,
        errorMessage,
        hasError,
        loading,
        recentHistory,
        onPressRealtimeCollectData,
        domainUrl,
        onClickZoomOut,
        onClickZoomIn,
        currentZoomLevel,
        onClickHeaderArea,
    } = props

    return (
        <div className="root_container">

            {/* header. */}
            <HeaderView
                onClickSaveHistory={onClickSaveHistory}
                onPressCollectData={onPressCollectData}
                currentAddress={currentAddress}
                loading={loading}
                onClickHeaderArea={onClickHeaderArea}
                onPressRealtimeCollectData={onPressRealtimeCollectData}
            />

            {/* menu (located in left side of page.) */}
            <MenuView
                historyList={historyList}
            />

            {/* main including naver map. */}
            <MainView
                isReportExpired={isReportExpired}
                hasError={hasError}
                errorMessage={errorMessage}
                loading={loading}
                currentAddress={currentAddress}
                longitude={longitude}
                latitude={latitude}
                domainUrl={domainUrl}
                onClickZoomIn={onClickZoomIn}
                onClickZoomOut={onClickZoomOut}
                currentZoomLevel={currentZoomLevel}
                recentHistory={recentHistory}
                shortAddress={shortAddress}
            />
        </div>
    )
}