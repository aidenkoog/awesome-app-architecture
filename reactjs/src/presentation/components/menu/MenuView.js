import { MENU_TITLE } from '../../../assets/strings/Strings'
import MenuTableComponent from './MenuTableComponent'
import "./MenuView.css"

/**
 * Manu view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function MenuView({ historyList }) {

    return (
        <div className="menu_container">
            <h3 style={{ fontSize: 21, marginTop: 65, marginLeft: 7, marginBottom: 22 }}>{MENU_TITLE}</h3>
            <MenuTableComponent historyList={historyList} />
        </div>
    )
}