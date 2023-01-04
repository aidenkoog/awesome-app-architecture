import HeaderView from "../components/header/HeaderView"
import MainView from "../components/main/MainView"
import MenuView from "../components/menu/MenuView"
import "./Home.css"

/**
 * Home page component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function HomeComponent(props) {

    /**
     * Props delivered from home page container.
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
        isZoomTriggered,
        isZoomUpdated,
        updateZoomLevel,
        onClickHistoryItem,
        selectedHistoryIndex
    } = props

    return (
        <div className="root_container">

            {/* Header. */}
            <HeaderView
                onClickSaveHistory={onClickSaveHistory}
                onPressCollectData={onPressCollectData}
                currentAddress={currentAddress}
                loading={loading}
                onClickHeaderArea={onClickHeaderArea}
                onPressRealtimeCollectData={onPressRealtimeCollectData}
            />

            {/* Menu (located in left side of page.) */}
            <MenuView
                historyList={historyList}
                onClickHistoryItem={onClickHistoryItem}
                selectedHistoryIndex={selectedHistoryIndex}
            />

            {/* Main including naver map. */}
            <MainView
                isReportExpired={isReportExpired}
                hasError={hasError}
                errorMessage={errorMessage}
                loading={loading}
                currentAddress={currentAddress}
                longitude={longitude}
                latitude={latitude}
                isZoomTriggered={isZoomTriggered}
                isZoomUpdated={isZoomUpdated}
                updateZoomLevel={updateZoomLevel}
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