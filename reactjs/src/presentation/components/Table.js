import React, { Component } from 'react';
import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'


class Table extends Component {
    render() {
        return (
            <div>
                <BootstrapTable data={this.props.data}>

                    <TableHeaderColumn
                        isKey
                        dataField='id'
                        dataAlign='center'
                        width='30'
                        tdStyle={{ backgroundColor: 'green' }}
                        headerAlign='left'>
                        ID
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField='name'
                        dataAlign='center'
                        width='20%'
                        thStyle={
                            {
                                fontWeight: 'bold',
                                color: 'red'
                            }}
                        headerAlign='center'>
                        Name
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField='value'
                        dataAlign='center'
                        headerAlign="right">
                        Value
                    </TableHeaderColumn>

                </BootstrapTable>
            </div >
        );
    }
}

export default Table;