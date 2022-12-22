import React from 'react'
import { MENU_TABLE_HEADER_ADDRESS, MENU_TABLE_HEADER_DATE } from '../../../assets/strings/Strings'
import { outputErrorLog } from '../../../utils/logger/Logger'
import "./MenuTable.css"

const LOG_TAG = "MenuTableComponent"

/**
 * table component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
function MenuTableComponent(props) {

    /**
     * props devlivered from HomeComponent.
     */
    const { historyList } = props

    function getDate(historyItem) {
        try {
            return historyItem != null && historyItem !== "" && historyItem.length >= 3 ?
                historyItem.split("|")[2] : "--"
        } catch (_e) {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs while getting DATE, return --")
            return "--"
        }
    }

    function getAddress(historyItem) {
        try {
            return historyItem != null && historyItem !== "" && historyItem.length >= 4 ?
                historyItem.split("|")[3] : "--"
        } catch (_e) {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs while getting ADDRESS, return --")
            return "--"
        }
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>{MENU_TABLE_HEADER_DATE}</th>
                        <th style={{ width: '80%' }}>{MENU_TABLE_HEADER_ADDRESS}</th>
                    </tr>
                </thead>
            </table>
            {
                historyList != null && historyList.length > 0 ?
                    historyList.map(
                        (info) => {
                            return (
                                <table className="table_for_td" key={info}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '20%' }}>{getDate(info)}</td>
                                            <td style={{ width: '80%' }}>{getAddress(info)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
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
    )
}

export default MenuTableComponent
