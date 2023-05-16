import React from 'react'
import {
    MENU_TABLE_EVENT_TYPE, MENU_TABLE_HEADER_ADDRESS,
    MENU_TABLE_HEADER_DATE, MENU_TABLE_HEADER_PROVIDER
} from '../../../assets/strings/Strings'
import "./MenuTable.css"
import Ripple from 'rippl'

/**
 * Table component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
function MenuTableComponent(props) {

    /**
     * Props devlivered from HomeComponent.
     */
    const { historyList, onClickHistoryItem, selectedHistoryIndex } = props

    function getMenuItem(info, index) {
        return <table className="table_for_td" key={index}>
            <tbody>
                <Ripple>
                    <tr onClick={() => onClickHistoryItem(info, index)}>
                        <td style={{ width: '12%' }}>{info.provider}</td>
                        <td style={{ width: '20%' }}>{info.eventType}</td>
                        <td style={{ width: '25%' }}>{info.measuredDateTime}</td>
                        <td style={{ width: '43%', paddingLeft: 7 }}>{info.fullAddress}</td>
                    </tr>
                </Ripple>
            </tbody>
        </table>
    }

    function getFocusedMenuItem(info, index) {
        return <table style={{
            backgroundColor: '#1d70ec', opacity: 0.75, color: "white"
        }} className="table_for_td" key={index}>
            <tbody>
                <Ripple>
                    <tr onClick={() => onClickHistoryItem(info, index)}>
                        <td style={{ width: '12%', fontWeight: 'bolder' }}>{info.provider}</td>
                        <td style={{ width: '20%', fontWeight: 'bolder' }}>{info.eventType}</td>
                        <td style={{ width: '25%', fontWeight: 'bolder' }}>{info.measuredDateTime}</td>
                        <td style={{ width: '43%', fontWeight: 'bolder', paddingLeft: 7 }}>{info.fullAddress}</td>
                    </tr>
                </Ripple>
            </tbody>
        </table >
    }

    return (
        <div style={{ height: "100%" }}>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: '12%' }}>{MENU_TABLE_HEADER_PROVIDER}</th>
                        <th style={{ width: '19%' }}>{MENU_TABLE_EVENT_TYPE}</th>
                        <th style={{ width: '25%' }}>{MENU_TABLE_HEADER_DATE}</th>
                        <th style={{ width: '44%' }}>{MENU_TABLE_HEADER_ADDRESS}</th>
                    </tr>
                </thead>
            </table>
            <div style={{
                width: "100%", height: "650px", overflowX: "hidden",
                overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none", WebkitScrollSnapType: "none"
            }}>
                {
                    historyList != null && historyList.length > 0 ?
                        historyList.map((info, index) => {
                            return selectedHistoryIndex == index ?
                                getFocusedMenuItem(info, index) : getMenuItem(info, index)
                        })
                        :
                        <table className="table_for_td">
                            <tbody>
                                <tr>
                                    <td>ㅤ</td>
                                </tr>
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default MenuTableComponent
