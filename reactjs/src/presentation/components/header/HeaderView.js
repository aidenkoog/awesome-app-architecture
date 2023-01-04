import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
    COPY_ADDRESS, ERROR_MSG_NO_FOUND_ADDRESS, HEADER_TITLE,
    HISTORY_SAVE, QUERY_CURRENT_LOCATION, QUERY_REALTIME_LOCATION
} from '../../../assets/strings/Strings'
import "./HeaderView.css"
import copyAddressImage from "../../../assets/images/copy_address.png"
import locationImage from "../../../assets/images/location.png"
import { DEBUGGING_MODE } from '../../../configs/Configs'

/**
 * Header view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function HeaderView({
    onClickSaveHistory, onPressCollectData, currentAddress, onPressRealtimeCollectData, loading, onClickHeaderArea }) {

    let currentAddressToCopy = currentAddress
    if (currentAddress == null || currentAddress === undefined || currentAddress === "") {
        currentAddressToCopy = ERROR_MSG_NO_FOUND_ADDRESS
    }

    return (
        <div className="header_container">
            <div className="header_title" onClick={onClickHeaderArea}>
                <h1>{HEADER_TITLE}</h1>
            </div>
            <div className="header_button">
                {/* Save history. */}
                {DEBUGGING_MODE ?
                    <div>
                        <button className="header_button_item" onClick={onClickSaveHistory}>{HISTORY_SAVE}</button>
                    </div>
                    :
                    <div></div>
                }

                {/* Location collect. */}
                <div>
                    <button className="header_button_item" onClick={onPressCollectData} disabled={loading}>
                        <img src={locationImage} alt="locationImage" /> {QUERY_CURRENT_LOCATION}
                    </button>
                </div>

                {/* Copy address. */}
                <div>
                    <CopyToClipboard text={currentAddressToCopy}>
                        <button className="header_button_item">
                            <img src={copyAddressImage} alt="copyAddressImage" /> {COPY_ADDRESS}
                        </button>
                    </CopyToClipboard>
                </div>

                {/* Real-time location collect. */}
                {DEBUGGING_MODE ?
                    <div>
                        <button className="header_button_item" onClick={onPressRealtimeCollectData}>
                            <img src={locationImage} alt="locationImage" /> {QUERY_REALTIME_LOCATION}
                        </button>
                    </div>
                    :
                    <div />
                }
            </div>
        </div>
    )
}