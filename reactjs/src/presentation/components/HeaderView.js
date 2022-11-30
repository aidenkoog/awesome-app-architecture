import { CopyToClipboard } from 'react-copy-to-clipboard'

/**
 * header view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function HeaderView({ onClickSaveHistory, onPressCollectData, currentAddress }) {

    return (
        <div className="header_container">
            <div className="header_title">
                <h1>System</h1>
            </div>
            <div className="header_button">
                <div>
                    <button className="header_button_item" onClick={onClickSaveHistory}>Save</button>
                </div>
                <div>
                    <CopyToClipboard text={currentAddress} onCopy={{}}>
                        <button className="header_button_item">Copy Link</button>
                    </CopyToClipboard>
                </div>
                <div>
                    <button className="header_button_item" onClick={onPressCollectData}>Search Location</button>
                </div>
            </div>
        </div>
    )
}