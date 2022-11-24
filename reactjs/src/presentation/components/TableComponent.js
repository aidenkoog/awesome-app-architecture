import React from 'react'
import { logDebug } from '../../utils/logger/Logger'

const LOG_TAG = "TableComponent"

/**
 * table component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
function TableComponent(props) {

    /**
     * props devlivered from HomeComponent.
     */
    const { activities } = props

    /**
     * check activities information
     */
    logDebug(LOG_TAG, "<<< activities: " + activities)

    /**
     * variable for expressing item's id.
     */
    let itemId = 1

    /**
     * get activities information row ui.
     */
    const ActivitiesInfo = activities.map(
        (info) => {
            return (
                <tr>
                    <td>{itemId++}</td>
                    <td>{info.eventType}</td>
                    <td>{info.provider}</td>
                    <td>{info.lat}</td>
                    <td>{info.lng}</td>
                    <td>{info.altitude}</td>
                    <td>{info.accuracy}</td>
                    <td>{info.battery}</td>
                    <td>{info.locationType}</td>
                    <td>{info.wearing}</td>
                    <td>{info.idle}</td>
                    <td>{info.status}</td>
                    <td>{info.delay}</td>
                    <td>{info.measuredDate}</td>
                    <td>{info.createdDate}</td>
                </tr>
            )
        }
    )

    return (
        <div className='table_component_header'>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th style={thStyle}>No.</th>
                        <th style={thStyle}>Event Type</th>
                        <th style={thStyle}>Provider</th>
                        <th style={thStyle}>Latitude</th>
                        <th style={thStyle}>Longitude</th>
                        <th style={thStyle}>Altitude</th>
                        <th style={thStyle}>Accuracy</th>
                        <th style={thStyle}>Battery</th>
                        <th style={thStyle}>Location</th>
                        <th style={thStyle}>Wearing</th>
                        <th style={thStyle}>Idle</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Delay</th>
                        <th style={thStyle}>Measure Date</th>
                        <th style={thStyle}>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ActivitiesInfo}
                </tbody>
            </table>

        </div>
    )
}

/**
 * header column style.
 */
const thStyle = {
    textAlign: 'center'
}

export default TableComponent
