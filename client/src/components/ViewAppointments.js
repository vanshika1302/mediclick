import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardActions, CardContent, Tab, Tabs } from '@material-ui/core';

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

  _edit_appointment = (appointment_id, newStatus) => {
    axios.post('/appointment/edit', {_id: appointment_id, status: newStatus})
    .then((response) => {
      const updatedAppointments = this.state.allAppointments.map(appointment => {
        return appointment._id === appointment_id ?
          {...appointment, status: newStatus} :
          appointment;
      });
      this.setState({allAppointments: updatedAppointments});
    }, (error) => {
      console.log(error);
    });
  }

  handleCancel = (event) => {
    this._edit_appointment(event.currentTarget.value, 'cancelled');
  };

  handleClose = (event) => {
    this._edit_appointment(event.currentTarget.value, 'closed');
  };

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
                      <Button
                        color="secondary"
                        variant="outlined"
                        value={appointment._id}
                        onClick={this.handleCancel}
                      >
                        Cancel
                      </Button>
                      {this.props.user.type === 'doctor' ?
                        <Button
                          color="primary"
                          variant="outlined"
                          value={appointment._id}
                          onClick={this.handleClose}
                        >
                          Close
                        </Button> :
                        null
                      }
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
};
  