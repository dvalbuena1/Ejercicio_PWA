import React from "react";
import "./App.css";
import Joke from "./components/Joke";
import Characters from "./components/Characters";

function App() {
  return (
    <div className="App">
      <h1>Marvel Characters</h1>
      <header className="App-header">
        <Characters />
      </header>
    </div>
  );
}

export default App;
