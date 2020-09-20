import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const PATIENT = {
  email: 'archil.kumar@gmail.com',
  firstName: 'Archil',
  lastName: 'Srivastava',
  age: 24,
  city: 'Lucknow'
};

const DOCTOR = {
  email: 'vanshika.mithi@gmail.com',
  firstName: 'Vanshika',
  lastName: 'Srivastava'
};

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/patient' render={props => <Dashboard {...{...props, user: {...PATIENT, type: 'patient'}}} />} />
          <Route path='/doctor' render={props => <Dashboard {...{...props, user: {...DOCTOR, type: 'doctor'}}} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
