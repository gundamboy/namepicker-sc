import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./components/layout/Header";
import './App.css';
import './styles.scss';
import StartHere from "./components/pages/StartHere"
import Picker from "./components/pages/Picker";

class App extends Component {
  render () {
      return (
          <BrowserRouter>
              <div className="App">
                  <Header/>
                  <Route exact path="/" component={StartHere}/>
                  <Route path="/picker" component={Picker}/>
              </div>
          </BrowserRouter>
      );
  }
}

export default App;