import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { useAuth } from '../auth';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex' ,
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Martel',
  },
}));

export default function Login() {
  const classes = useStyles();

  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');

  const { authTokens, setAuthTokens } = useAuth();

  const postLogin = () => {
    axios.post('/login', {
      email,
      password,
      userType
    }).then(response => {
      if (response.status === 200) {
        setAuthTokens(response.data);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  };

  if (authTokens && authTokens.success) {
    return <Redirect to="/" />;
  }

  return (    
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <AppBar  >
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              MEDICLICK 
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          autoComplete="current-password"
        />
        <RadioGroup aria-label="usertype" name="usertype" value={userType} onChange={(e) => setUserType(e.currentTarget.value)}>
          <FormControlLabel value="patient" control={<Radio />} label="Patient" />
          <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
        </RadioGroup>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={postLogin}
        >
          Sign In
        </Button>
        <Grid container justify="center">
          <Grid item>
            <Link href="signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}