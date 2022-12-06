import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
    COPY_ADDRESS, HEADER_TITLE, HISTORY_SAVE, QUERY_CURRENT_LOCATION, QUERY_REALTIME_LOCATION
} from '../../../assets/strings/Strings'
import "./HeaderView.css"

/**
 * Header view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function HeaderView({
    onClickSaveHistory, onPressCollectData, currentAddress, historySaveSupport, onPressRealtimeCollectData }) {

    return (
        <div className="header_container">
            <div className="header_title">
                <h1>{HEADER_TITLE}</h1>
            </div>
            <div className="header_button">
                {historySaveSupport ?
                    <div>
                        <button className="header_button_item" onClick={onClickSaveHistory}>{HISTORY_SAVE}</button>
                    </div>
                    :
                    <div></div>
                }

                <div>
                    <CopyToClipboard text={currentAddress} onCopy={{}}>
                        <button className="header_button_item">{COPY_ADDRESS}</button>
                    </CopyToClipboard>
                </div>
                <div>
                    <button className="header_button_item" onClick={onPressCollectData}>{QUERY_CURRENT_LOCATION}</button>
                </div>
                <div>
                    <button className="header_button_item" onClick={onPressRealtimeCollectData}>{QUERY_REALTIME_LOCATION}</button>
                </div>
            </div>
        </div>
    )
}