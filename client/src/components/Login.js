import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useAuth } from '../auth';
import image from '../assets/img/bg7.jpg';

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'stretch'
  },
  visualPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(6),
    color: '#FFFFFF',
    backgroundImage: `linear-gradient(160deg, rgba(10,60,66,0.88) 0%, rgba(14,124,134,0.78) 100%), url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  visualBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.25),
    marginBottom: theme.spacing(3)
  },
  formPane: {
    flexBasis: 480,
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      flexBasis: 'auto',
      flexGrow: 1
    }
  },
  formCard: {
    padding: theme.spacing(5),
    width: '100%'
  },
  avatar: {
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main
  },
  headingBlock: {
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },
  field: {
    marginBottom: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  radioRow: {
    marginBottom: theme.spacing(1),
    justifyContent: 'center'
  }
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
    <div className={classes.page}>
      <div className={classes.visualPane}>
        <div className={classes.visualBrand}>
          <LocalHospitalIcon fontSize="large" />
          <Typography variant="h5" style={{ fontWeight: 700 }}>MEDICLICK</Typography>
        </div>
        <Typography variant="h4" style={{ fontWeight: 700, maxWidth: 420 }} gutterBottom>
          Your care team, one click away.
        </Typography>
        <Typography variant="body1" style={{ maxWidth: 380, opacity: 0.9, marginBottom: 32 }}>
          Sign in to book appointments, message your doctor, and manage your visits.
        </Typography>
      </div>

      <div className={classes.formPane}>
        <Container maxWidth="xs">
          <Paper elevation={0} className={classes.formCard}>
            <div className={classes.headingBlock}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ fontWeight: 700 }}>
                Welcome back
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Sign in to continue to your account
              </Typography>
            </div>

            {isError && (
              <Box mb={2}>
                <Alert severity="error">Couldn&rsquo;t sign you in. Check your details and try again.</Alert>
              </Box>
            )}

            <TextField
              className={classes.field}
              variant="outlined"
              fullWidth
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              autoFocus
            />
            <TextField
              className={classes.field}
              variant="outlined"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              autoComplete="current-password"
            />
            <RadioGroup
              row
              className={classes.radioRow}
              aria-label="usertype"
              name="usertype"
              value={userType}
              onChange={(e) => setUserType(e.currentTarget.value)}
            >
              <FormControlLabel value="patient" control={<Radio color="primary" />} label="Patient" />
              <FormControlLabel value="doctor" control={<Radio color="primary" />} label="Doctor" />
            </RadioGroup>
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              disableElevation
              onClick={postLogin}
            >
              Sign In
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Don&rsquo;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
