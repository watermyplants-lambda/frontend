import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { PlantContext } from '../contexts/PlantContext';

import Login from './Login';
import SignUp from './SignUp';
import PlantPage from './PlantPage';
import Profile from './Profile';
import NavBar from './NavBar';
import Footer from './Footer';
import Logout from './logout'

import '../App.css';

function App() {
  const[plantList, setPlantList] = useState([])
  const [userValues, setUserValues] = useState([])
  // const { id } = useParams();

  const fetchUsers = () => {
    axiosWithAuth()
      .get('/api/users')
      // .get(`/api/users/${id}`)
      .then(res => {
        setUserValues(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  };

  const fetchPlants = () => {
    axiosWithAuth()
        .get('/api/plants')
        // .get(`/api/users/${id}/plants`)
        .then(res => {
            setPlantList(res.data)
        })
        .catch(err => {
            console.log(err)
        });
  };

  return (
    <PlantContext.Provider value={{ plantList, setPlantList, fetchPlants, userValues, setUserValues, fetchUsers }}>
      <Router>
          <div className="App">
            <div className="header">
              <h1><a href="https://watermyplantslambda.netlify.app/">Water My Plants</a></h1>
              <NavBar />
            </div>
            <Switch>
              <Route exact path ="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <PrivateRoute exact path="/plants/:id" component={PlantPage}/>
              <PrivateRoute exact path ="/profile/:id" component={Profile}/>
              <PrivateRoute exact path="/logout" component={Logout}/>
            </Switch>
            <Footer />
        </div>
      </Router>
    </PlantContext.Provider>
  );
}

export default App;
