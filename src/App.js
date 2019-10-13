import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage.js";
import GameStart from "./components/GameStart.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/gamestart" component={GameStart}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
