import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    flexBasis: 560,
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4, 0),
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
    marginBottom: theme.spacing(2)
  },
  tabs: {
    marginBottom: theme.spacing(3)
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const [userType, setUserType] = useState('patient');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18);
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [allHospitals, setAllHospitals] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [success, setSuccess] = useState(null);

  React.useEffect(() => {
    axios.get('/hospital/read')
      .then((response) => setAllHospitals(response.data), (error) => console.log(error));

    axios.get('/specialty/read')
      .then((response) => setAllSpecialties(response.data), (error) => console.log(error));
  }, []);

  const postSignup = () => {
    axios.put(`/${userType}/register`, {
      userType, firstName, lastName, email, password, age, phone, city, hospitalId, specialtyId
    }).then(response => {
      setSuccess(response.status === 200);
    }).catch(() => {
      setSuccess(false);
    });
  };

  return (
    <div className={classes.page}>
      <div className={classes.visualPane}>
        <div className={classes.visualBrand}>
          <LocalHospitalIcon fontSize="large" />
          <Typography variant="h5" style={{ fontWeight: 700 }}>MEDICLICK</Typography>
        </div>
        <Typography variant="h4" style={{ fontWeight: 700, maxWidth: 420 }} gutterBottom>
          Join a network built around trust.
        </Typography>
        <Typography variant="body1" style={{ maxWidth: 380, opacity: 0.9, marginBottom: 32 }}>
          Whether you&rsquo;re booking a visit or seeing patients, Mediclick keeps
          everything in one simple place.
        </Typography>
      </div>

      <div className={classes.formPane}>
        <Container maxWidth="sm">
          <Paper elevation={0} className={classes.formCard}>
            <div className={classes.headingBlock}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ fontWeight: 700 }}>
                Create your account
              </Typography>
              <Typography variant="body2" color="textSecondary">
                It only takes a minute
              </Typography>
            </div>

            <Tabs
              value={userType}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              onChange={(event, value) => setUserType(value)}
              className={classes.tabs}
            >
              <Tab value="patient" label="I'm a Patient" />
              <Tab value="doctor" label="I'm a Doctor" />
            </Tabs>

            {success === false && (
              <Box mb={2}>
                <Alert severity="error">Something went wrong during signup. Please try again.</Alert>
              </Box>
            )}
            {success === true && (
              <Box mb={2}>
                <Alert severity="success">
                  Signup successful! Please go to{' '}
                  <Link component={RouterLink} to="/login">the Login page</Link>.
                </Alert>
              </Box>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  required
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {userType === 'patient' ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      select
                      fullWidth
                      label="Age"
                      id="age"
                    >
                      {[...Array(101).keys()].slice(1).map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      fullWidth
                      label="Phone"
                      id="phone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      fullWidth
                      label="City"
                      id="city"
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      value={hospitalId}
                      onChange={(event) => setHospitalId(event.target.value)}
                      select
                      fullWidth
                      label="Hospital"
                      id="hospital"
                    >
                      {allHospitals.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      value={specialtyId}
                      onChange={(event) => setSpecialtyId(event.target.value)}
                      select
                      fullWidth
                      label="Specialty"
                      id="specialty"
                    >
                      {allSpecialties.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      fullWidth
                      label="Phone"
                      id="phone"
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              disableElevation
              onClick={postSignup}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
