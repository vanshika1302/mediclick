import React from 'react';
import './App.css';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PatientHome from './components/patient/Home';
import DoctorHome from './components/doctor/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path='/patient'  component= {PatientHome} />
        <Route path='/doctor' component={DoctorHome} />   
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
