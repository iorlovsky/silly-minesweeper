import React, { Component } from 'react';
import './App.css';
import Minefield from "./app/components/Minefield";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Minefield/>
      </div>
    );
  }
}

export default App;
