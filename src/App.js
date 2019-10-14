import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage.js";
import GameContainer from "./containers/GameContainer.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/gamestart" component={GameContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
