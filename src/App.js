import React, { Component } from "react";
import "./App.css";
import Hangman from "./Hangman";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hangman</h1>
        <Hangman />
      </div>
    );
  }
}

export default App;
