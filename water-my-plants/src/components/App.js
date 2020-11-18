import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { PlantContext } from '../contexts/PlantContext';

import Login from './Login';
import SignUp from './SignUp';
// import PlantPage from './PlantPage';
import Profile from './Profile';
import NavBar from './NavBar';
// import Footer from './Footer';

import '../App.css';
import PlantList from './PlantList';

const initialPlant = {
  id: Date.now(),
  name: '',
  species: '',
  water_schedule: '',
  last_watered: '',
  image_url: ''
};

const initialUser = {
  id: Date.now(),
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
              <h1><a href="https://watermyplantslambda.netlify.app/">Water My Plants</a></h1>
              <NavBar />
            </div>
            <Switch>
              <Route exact path ="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <PrivateRoute exact path="/plants" component={PlantList}/>
              <PrivateRoute exact path="/profile" component={Profile}/>
              {/* <PrivateRoute exact path="/profile/:id/plants" component={PlantPage}/> */}
              {/* <PrivateRoute exact path ="/profile/:id" component={Profile}/> */}
            </Switch>
            {/* <Footer /> */}
        </div>
      </Router>
    </PlantContext.Provider>
  );
}

export default App;
