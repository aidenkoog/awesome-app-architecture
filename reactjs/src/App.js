import React, { Component } from 'react';
import './App.css';
import Table from './presentation/components/Table'

var data = [
  { id: 1, name: 'Per1', value: '2' },
  { id: 2, name: 'Per2', value: '5' },
  { id: 3, name: 'Per3', value: '4' }
];


class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="Table-header">Table UI Test</p>
        <Table data={data} />
      </div>
    );
  }
}

export default App;