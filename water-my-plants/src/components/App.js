import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { PlantContext } from '../contexts/PlantContext';

import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import PlantList from './PlantList';
import NavBar from './NavBar';
import Footer from './Footer';
import Logout from './logout';
import Home from './Home';

import '../App.css';

const initialPlant = {
  id: Date.now(),
  name: '',
  species: '',
  water_schedule: '',
  last_watered: '',
  image_url: ''
};

const initialUser = {
  firstName: '',
  lastName: '',
  email:'',
  password: ''
};

function App() {

  return (
    <PlantContext.Provider value={{ initialPlant, initialUser }}>
      <Router>
          <div className="App">
            <div className="header">
              <h1><a href="https://watermyplantslambda.netlify.app/">WATER MY PLANTS</a></h1>
              <NavBar />
            </div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path ="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <PrivateRoute exact path="/plants" component={PlantList}/>
              <PrivateRoute exact path ="/profile" component={Profile}/>
              <PrivateRoute exact path="/logout" component={Logout}/>
            </Switch>
            <Footer />
        </div>
      </Router>
     </PlantContext.Provider>
  );
};

export default App;