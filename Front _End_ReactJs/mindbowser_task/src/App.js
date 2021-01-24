import React, {useState} from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm.js';
import Dashboard from './components/Dashboard/Dashboard.js';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
return (
    <Router>
    <div className="App">
      <div id="add_header">
              <Header/>
              </div>
      
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm />
            </Route>
            <Route path="/login" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/dashboard" exact={true}>
              <Dashboard />
            </Route>

            
          </Switch>
       </div>
   </div>
  </Router>
  )  
}

export default App;