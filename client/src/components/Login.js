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
import { colors, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { useAuth } from '../auth';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import image from "../assets/img/bg7.jpg";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',   
  },
  margin: {
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "black",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#039be5",
    color:"#212121",
  },
  root: {
    display: 'flex' ,
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Martel',
    color: "white",
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
  <div className={classes.pageHeader}
    style={{
      backgroundImage: "url(" + image + ")",
      backgroundSize: "cover",
      backgroundPosition: "top center",
      height:"100%" 
    }}>
      <Container component="main" maxWidth="xs">
        <div className={classes.root} >
          <AppBar style={{ background: 'transparent' , boxShadow: 'none' }}  >
            <Toolbar>
              <Typography variant="h3" className={classes.title} >
                MEDICLICK 
              </Typography>
            </Toolbar>
          </AppBar>
        </div>        
        <div className={classes.paper} > 
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color:"white"}}>
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
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            autoComplete="current-password"
          />
          <RadioGroup aria-label="usertype" name="usertype" value={userType} onChange={(e) => setUserType(e.currentTarget.value)}>
            <FormControlLabel value="patient" control={<Radio />} label="Patient" style={{color:"white"}} />
            <FormControlLabel value="doctor" control={<Radio />} label="Doctor" style={{color:"white"}} />
          </RadioGroup>
          <Button style={{color:"white"}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={postLogin}
          >
            Sign In
          </Button>
          <Grid container justify="center" >
            <Grid item>
              <Link href="signup" variant="body2" style={{color:"black"}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br />
      </Container>
  </div>
  );
}