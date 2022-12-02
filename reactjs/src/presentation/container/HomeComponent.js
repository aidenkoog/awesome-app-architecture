import HeaderView from '../components/HeaderView'
import MenuView from '../components/MenuView'
import MainView from '../components/MainView'
import FooterView from '../components/FooterView'
import { logDebug } from '../../utils/logger/Logger'

const LOG_TAG = "HomeComponent"

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

    logDebug(LOG_TAG, "<<< latitude: " + latitude + ", longitude: " + longitude + ", loading: " + loading)

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