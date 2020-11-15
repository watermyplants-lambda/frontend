import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PlantPage from './PlantPage';
import Profile from './Profile';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';

import '../App.css';

function App() {
  return (
    <Router>
        <div className="App">
          <div className="header">
            <h1><a href="https://watermyplantslambda.netlify.app/">Water My Plants</a></h1>
            <NavBar />
          </div>
          <Switch>
            <PrivateRoute exact path="/plants" component={PlantPage}/>
            <PrivateRoute exact path ="/profile" component={Profile}/>
            <Route exact page ="/" />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
