import HeaderView from "../components/header/HeaderView"
import MainView from "../components/main/MainView"
import MenuView from "../components/menu/MenuView"
import FooterView from "../components/footer/FooterView"
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
        isReportExpired,
        errorMessage,
        hasError,
        loading,
        historySaveSupport,
        footerSupport,
        recentHistory,
        onPressRealtimeCollectData
    } = props

    return (
        <div className="root_container">

            {/* header. */}
            <HeaderView
                onClickSaveHistory={onClickSaveHistory}
                onPressCollectData={onPressCollectData}
                currentAddress={currentAddress}
                historySaveSupport={historySaveSupport}
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
                recentHistory={recentHistory}
            />

            {/* footer. */}
            {footerSupport ? <FooterView /> : <div />}
        </div>
    )
}