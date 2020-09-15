import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/patient' render={props => <Dashboard {...props} userType="patient"/>} />
          <Route path='/doctor' render={props => <Dashboard {...props} userType="doctor" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
