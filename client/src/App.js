import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/Signup';
import { AuthContext, useAuth } from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();
  return(
    <Route
      {...rest}
      render={(props) => (
        authTokens && authTokens.success ?
          (<Component {...{...props, ...{user: {...authTokens, type: authTokens.userType}}}} />) :
          (<Redirect to="/login" />)
      )}
    />
  );
}

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
          <PrivateRoute path='/' component={Dashboard} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
