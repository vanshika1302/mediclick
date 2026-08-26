import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/Signup';
import HomePage from './components/HomePage';
import DemoDashboard from './components/demo/DemoDashboard';
import { AuthContext, useAuth } from './auth';
import { ROUTER_BASENAME } from './config';
import theme from './theme';




const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();
  return(
    <Route
      {...rest}
      render={(props) => (
        authTokens && authTokens.success ?
          (<Component {...{...props, ...{user: {...authTokens, type: authTokens.userType}}}} />) :
          (<Redirect to="/homepage" />)
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router basename={ROUTER_BASENAME}>
          <Switch>
            <Route path='/homepage' exact component={HomePage} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={SignUp} />
            {/*
              DEMO-ONLY route. Renders the dashboard UI against hardcoded
              sample data so the product can be previewed/screenshotted
              without a live MongoDB. It does not call the real API and is
              not linked from any production auth flow — see
              components/demo/ for details.
            */}
            <Route path='/demo' exact component={DemoDashboard} />
            <PrivateRoute path='/' component={Dashboard} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
