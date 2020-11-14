import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PlantPage from './PlantPage';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';

import '../App.css';

function App() {
  return (
    <Router>
        <div className="App">
          <h1>Water My Plants</h1>
          <Switch>
            <PrivateRoute exact path="/navbar" component={NavBar}/> 
            <PrivateRoute exact path="/plantpage" component={PlantPage}/>
            <Route exact page ="/" />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
