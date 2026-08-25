import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Card, Chip, Tab, Tabs } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
    padding: '20px 24px',
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E4F3F3',
    color: '#0A5B63',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
};

const STATUS_META = {
  active: { label: 'Upcoming', color: 'primary' },
  closed: { label: 'Completed', color: 'default' },
  cancelled: { label: 'Cancelled', color: 'default' }
};

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
    const filtered = this.state.allAppointments.filter(item => item.status === this.state.selectedTab);
    return <Box maxWidth={760} margin="0 auto">
      <Paper elevation={1} style={{ padding: 40 }}>
        <Grid container direction="column" alignItems="center" spacing={4}>
          <Grid item>
            <Typography variant="h4" align="center">
              Your Appointments
            </Typography>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Tabs
              value={this.state.selectedTab}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              onChange={this.setSelectedTab}
            >
              {TABS.map(tab => <Tab key={tab.value} value={tab.value} label={tab.label} />)}
            </Tabs>
          </Grid>
          <Grid item container xs={12}>
            <Grid item container direction="column" spacing={2}>
              {filtered.length === 0 ? (
                <Grid item>
                  <Typography color="textSecondary" align="center">
                    Nothing here yet.
                  </Typography>
                </Grid>
              ) : filtered.map(appointment => {
                const meta = STATUS_META[appointment.status];
                return (
                  <Grid item key={appointment._id}>
                    <Card variant="outlined" style={styles.card}>
                      <div style={styles.cardLeft}>
                        <div style={styles.icon}>
                          <EventNoteIcon />
                        </div>
                        <div>
                          {this.props.user.type === 'patient' ? (
                            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                              Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                            </Typography>
                          ) : (
                            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                              {appointment.patient.firstName} {appointment.patient.lastName}
                            </Typography>
                          )}
                          {this.props.user.type === 'patient' ? (
                            <Typography variant="body2" color="textSecondary">
                              {appointment.doctor.hospital.name}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              {appointment.symptoms}
                            </Typography>
                          )}
                          <Typography variant="body2" color="textSecondary">
                            {appointment.date} at {appointment.time}
                          </Typography>
                        </div>
                      </div>
                      <Box display="flex" alignItems="center" style={{ gap: 12 }}>
                        <Chip
                          size="small"
                          label={meta.label}
                          color={meta.color === 'primary' ? 'primary' : 'default'}
                          style={{ fontWeight: 700 }}
                        />
                        {appointment.status === 'active' && (
                          <>
                            <Button
                              color="secondary"
                              variant="outlined"
                              size="small"
                              value={appointment._id}
                              onClick={this.handleCancel}
                            >
                              Cancel
                            </Button>
                            {this.props.user.type === 'doctor' && (
                              <Button
                                color="primary"
                                variant="outlined"
                                size="small"
                                value={appointment._id}
                                onClick={this.handleClose}
                              >
                                Close
                              </Button>
                            )}
                          </>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>;
  }
};
