import React from 'react'
import { MENU_TABLE_HEADER_ADDRESS, MENU_TABLE_HEADER_DATE, MENU_TABLE_HEADER_PROVIDER } from '../../assets/strings/Strings'

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

    return (
        <div className='table_component_header'>
            <table class="table table-striped">
                <thead>
                    <tr>
                        {/* <th style={{ width: '20%' }}>{MENU_TABLE_HEADER_PROVIDER}</th> */}
                        <th style={{ width: '20%' }}>{MENU_TABLE_HEADER_DATE}</th>
                        <th style={{ width: '80%' }}>{MENU_TABLE_HEADER_ADDRESS}</th>
                    </tr>
                </thead>
            </table>
            {
                recentHistory != null && recentHistory != "" ?
                    <table class="table_for_td table-striped">
                        <tbody>
                            <tr>
                                {/* <td style={{ width: '20%' }}>{recentHistory.split("|")[0].toUpperCase()}</td> */}
                                <td style={{ width: '20%' }}>{recentHistory.split("|")[3]}</td>
                                <td style={{ width: '80%' }}>{recentHistory.split("|")[2]}</td>
                            </tr>
                        </tbody>
                    </table>
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

export default MapTableComponent
