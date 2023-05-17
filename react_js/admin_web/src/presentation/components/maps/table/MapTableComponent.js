import React from 'react'
import {
    MENU_TABLE_ERROR_RADIUS, MENU_TABLE_EVENT_TYPE, MENU_TABLE_HEADER_ADDRESS,
    MENU_TABLE_HEADER_DATE, MENU_TABLE_HEADER_PROVIDER
} from '../../../../assets/strings/Strings'
import "./MapTable.css"

/**
 * Table component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
function MapTableComponent(props) {

    /**
     * Props devlivered from HomeComponent.
     */
    const { recentHistory } = props

    /**
     * Get accuracy with validation check.
     * @param {Number} accuracy 
     * @returns {String}
     */
    function getAccuracy(accuracy) {
        return !isNaN(accuracy) ?
            Number.isInteger(accuracy) ? (accuracy + "m") : (accuracy.toFixed(1) + "m") : "--"
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: '15%' }}>{MENU_TABLE_HEADER_PROVIDER}</th>
                        <th style={{ width: '20%' }}>{MENU_TABLE_EVENT_TYPE}</th>
                        <th style={{ width: '8%' }}>{MENU_TABLE_ERROR_RADIUS}</th>
                        <th style={{ width: '20%' }}>{MENU_TABLE_HEADER_DATE}</th>
                        <th style={{ width: '37%' }}>{MENU_TABLE_HEADER_ADDRESS}</th>
                    </tr>
                </thead>
            </table>
            {
                recentHistory != null && recentHistory !== "" ?
                    <table className="table_for_td">
                        <tbody>
                            <tr>
                                <td style={{ width: '15%' }}>{recentHistory.provider}</td>
                                <td style={{ width: '20%' }}>{recentHistory.eventType}</td>
                                <td style={{ width: '8%' }}>{getAccuracy(recentHistory.accuracy)}</td>
                                <td style={{ width: '20%' }}>{recentHistory.measuredDateTime}</td>
                                <td style={{ width: '37%' }}>{recentHistory.fullAddress}</td>
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

        </div >
    )
}

export default MapTableComponent
