import React, { Component } from 'react';
import Table from "./Table";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Table />
        <Table />
      </div>
    );
  }
}

export default App;
