import React from 'react'
import { MENU_TABLE_HEADER_ADDRESS, MENU_TABLE_HEADER_DATE } from '../../../../assets/strings/Strings'
import { outputErrorLog } from '../../../../utils/logger/Logger'
import "./MapTable.css"

const LOG_TAG = "MapTableComponent"

/**
 * table component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
function MapTableComponent(props) {

    /**
     * props devlivered from HomeComponent.
     */
    const { recentHistory } = props

    function getCurrentDate() {
        try {
            return recentHistory != null && recentHistory !== "" && recentHistory.length >= 4 ?
                recentHistory.split("|")[3] : "--"
        } catch (_e) {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs while getting current DATE, return --")
            return "--"
        }
    }

    function getCurrentAddress() {
        try {
            return recentHistory != null && recentHistory !== "" && recentHistory.length >= 5 ?
                recentHistory.split("|")[4] : "--"
        } catch (_e) {
            outputErrorLog(LOG_TAG, "UNKNOWN ERROR occurs while getting current ADDRESS, return --")
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
                recentHistory != null && recentHistory !== "" ?
                    <table className="table_for_td">
                        <tbody>
                            <tr>
                                <td style={{ width: '20%' }}>{getCurrentAddress()}</td>
                                <td style={{ width: '80%' }}>{getCurrentDate()}</td>
                            </tr>
                        </tbody>
                    </table>
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

export default MapTableComponent
