import "./FooterView.css"

/**
 * Footer view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function FooterView() {
    return (
        <div className="footer_container">
            <b>© AidenKooG.com, Inc. All rights reserved.</b><br />
            Page development and data processing were carried out by <b>AidenKooG.</b><br />
            <b>12345,</b> 99, aidenkoo-ro, Aiden-gu, Aiden-si, Aiden-do, Republic of Korea<br />
        </div>
    )
}