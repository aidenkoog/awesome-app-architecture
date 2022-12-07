import React from 'react'
import { MENU_TABLE_HEADER_ADDRESS, MENU_TABLE_HEADER_DATE } from '../../../assets/strings/Strings'
import "./MenuTable.css"

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
        return historyItem != null && historyItem !== "" && historyItem.length >= 2 ?
            historyItem.split("|")[1] : "--"
    }

    function getAddress(historyItem) {
        return historyItem != null && historyItem !== "" && historyItem.length >= 3 ?
            historyItem.split("|")[2] : "--"
    }

    return (
        <div>
            <table class="table table-striped">
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
                                <table class="table_for_td table-striped">
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
                    <table class="table_for_td table-striped">
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
