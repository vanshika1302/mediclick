import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs, Button, Card, CardActions, CardContent, MenuItem, Radio, Tab, Tabs, TextField } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    marginLeft: 25,
    marginRight: 25,
    alignContent: 'center'
  }
});

const APPOINTMENTS = [
  {
    appointment_id: 'APP1',
    doctor_id: 'doc1',
    doctor_name: 'Vanshika Srivastava',
    slot: 'Monday 1PM', // Change this
    hospital: 'pagalkhana',
    status: 'active'
  },
  {
    appointment_id: 'APP2',
    doctor_id: 'doc2',
    doctor_name: 'Vanshika Srivastava2',
    slot: 'Monday 2PM', // Change this
    hospital: 'pagalkhana2',
    status: 'active'
  },
  {
    appointment_id: 'APP3',
    doctor_id: 'doc3',
    doctor_name: 'Vanshika Srivastava3',
    slot: 'Monday 3PM', // Change this
    hospital: 'pagalkhana3',
    status: 'active'
  },
  {
    appointment_id: 'APP4',
    doctor_id: 'doc4',
    doctor_name: 'Vanshika Srivastava4',
    slot: 'Monday 4PM', // Change this
    hospital: 'pagalkhana4',
    status: 'closed'
  },
  {
    appointment_id: 'APP5',
    doctor_id: 'doc5',
    doctor_name: 'Vanshika Srivastava4',
    slot: 'Monday 5PM', // Change this
    hospital: 'pagalkhana5',
    status: 'closed'
  },
  {
    appointment_id: 'APP6',
    doctor_id: 'doc6',
    doctor_name: 'Vanshika Srivastava6',
    slot: 'Monday 6PM', // Change this
    hospital: 'pagalkhana6',
    status: 'closed'
  },
  {
    appointment_id: 'APP7',
    doctor_id: 'doc7',
    doctor_name: 'Vanshika Srivastava7',
    slot: 'Monday 7PM', // Change this
    hospital: 'pagalkhana7',
    status: 'cancelled'
  }
];

const TABS = [
  {value: 'active', label: 'Upcoming'},
  {value: 'closed', label: 'Finished'},
  {value: 'cancelled', label: 'Cancelled'}
];

export default class ViewAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'active',
      allAppointments: []
    }
  }

  componentDidMount() {
    const filter = this.props.user.type === 'doctor' ?
      {doctorEmail: this.props.user.email} : {patientEmail: this.props.user.email};
    axios.get('/appointment/read', filter).then((response) => {
      console.log(response.data);
      this.setState({allAppointments: response.data});
    }, (error) => {
      console.log(error);
    });
  }

  setSelectedTab = (event, value) => this.setState({selectedTab: value});

  render() {
    return <Paper elevation={4}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h4">
            View Appointments
          </Typography>
        </Grid>
        <Grid item>
          <Tabs
            value={this.state.selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.setSelectedTab}
          >
            {TABS.map(tab => <Tab key={tab.value} value={tab.value} label={tab.label} />)}
          </Tabs>
        </Grid>
        <Grid item container xs={10}>
          <Grid item container direction="column" spacing={4}>
            {this.state.allAppointments.filter(item => item.status === this.state.selectedTab)
            .map(appointment => (
              <Grid item key={appointment._id}>
                <Card>
                  <CardContent>
                    <Typography>
                      {appointment.doctor.firstName} {appointment.doctor.lastName}
                    </Typography>
                    <Typography>
                      {appointment.doctor.hospital.name}
                    </Typography>
                    <Typography>
                      {appointment.slot}
                    </Typography>
                  </CardContent>
                  {appointment.status === 'active' ?
                    (<CardActions>
                      <Button color="secondary" variant='outlined'>Cancel</Button>
                    </CardActions>) : null
                  }
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>;
  }
}
  