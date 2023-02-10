import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from "./components/counter/Counter";
import ClassCounter from "./components/counter/ClassCounter";
import FitnessApp from "./components/FitnessApp";

class App extends Component {
    render() {
        return (
            <div className="App">
              <FitnessApp/>
            </div>
        );
    }
}
export default App;