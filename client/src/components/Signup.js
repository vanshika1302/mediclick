import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MenuItem, Tab, Tabs } from '@material-ui/core';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 'patient',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      age: 18,
      phone: '',
      city: '',
      hospital: '',
      specialty: '',
      allHospitals: [],
      allSpecialties: []
    }
  }

  componentDidMount() {
    axios.get('/hospital/read')
    .then((response) => this.setState({allHospitals: response.data}), (error) => console.log(error));

    axios.get('/specialty/read')
    .then((response) => this.setState({allSpecialties: response.data}), (error) => console.log(error));
  }

  render() {
    const {userType, firstName, lastName, email, password, age, phone, city, hospital, specialty,
      allHospitals, allSpecialties} = this.state;
    const {classes} = this.props;
    return (<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Tabs
          value={userType}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, value) => this.setState({userType: value})}
        >
          <Tab value="patient" label="Patient" />
          <Tab value="doctor" label="Doctor" />
        </Tabs>
        <br />
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                value={firstName}
                onChange={event => this.setState({firstName: event.target.value})}
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
                onChange={event => this.setState({lastName: event.target.value})}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={email}
                onChange={event => this.setState({email: event.target.value})}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={password}
                onChange={event => this.setState({password: event.target.value})}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {userType === 'patient' ? <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    value={age}
                    onChange={event => this.setState({age: event.target.value})}
                    select
                    fullWidth
                    name="age"
                    label="Age"
                    id="age"
                  >
                    {[...Array(101).keys()].slice(1).map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required value={phone}
                    onChange={event => this.setState({phone: event.target.value})}
                    fullWidth
                    name="phone"
                    label="Phone"
                    id="phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    value={city}
                    onChange={event => this.setState({city: event.target.value})}
                    fullWidth
                    name="city"
                    label="City"
                    id="city"
                  />
                </Grid>
              </> : <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    value={hospital}
                    onChange={event => this.setState({hospital: event.target.value})}
                    select
                    fullWidth
                    name="hospital"
                    label="Hospital"
                    id="hospital"
                  >
                    {allHospitals.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    value={specialty}
                    onChange={event => this.setState({specialty: event.target.value})}
                    select
                    fullWidth
                    name="specialty"
                    label="Specialty"
                    id="specialty"
                  >
                    {allSpecialties.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                  </TextField>
                </Grid>
              </>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
    </Container>);
  }
}

export default withStyles(styles)(SignUp);
