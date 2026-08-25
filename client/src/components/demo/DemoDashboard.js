import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RoomIcon from '@material-ui/icons/Room';
import StarIcon from '@material-ui/icons/Star';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { DEMO_USER, DEMO_DOCTORS, DEMO_APPOINTMENTS } from './demoData';

// DEMO_MODE: this whole screen is a self-contained preview surface.
// It renders the same visual language as the real Dashboard/NewAppointment/
// ViewAppointments screens against DEMO_DOCTORS / DEMO_APPOINTMENTS
// (hardcoded in ./demoData.js) so the product can be screenshotted without a
// live MongoDB. It never imports axios and is not reachable from the real
// login/signup flow — see the "/demo" route comment in App.js.
const DEMO_MODE = true;

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2)
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5)
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  demoBadge: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
    fontWeight: 700,
    letterSpacing: 0.4
  },
  userChip: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
  },
  page: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    paddingBottom: theme.spacing(8)
  },
  heroText: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  },
  tabs: {
    marginBottom: theme.spacing(3)
  },
  doctorCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1)
  },
  doctorHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
  },
  avatar: {
    width: 56,
    height: 56,
    backgroundColor: theme.palette.primary.lighter,
    color: theme.palette.primary.dark,
    fontWeight: 700,
    fontSize: '1.1rem'
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1)
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1.5)
  },
  cardActions: {
    marginTop: 'auto',
    paddingTop: theme.spacing(2)
  },
  apptCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2.5),
    gap: theme.spacing(2)
  },
  apptLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
  },
  apptIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: theme.palette.primary.lighter,
    color: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }
}));

const STATUS_META = {
  active: { label: 'Upcoming', color: 'primary' },
  closed: { label: 'Completed', color: 'default' },
  cancelled: { label: 'Cancelled', color: 'default' }
};

function initials(doctor) {
  return `${doctor.firstName[0]}${doctor.lastName[0]}`;
}

function DoctorCard({ doctor }) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.doctorCard}>
      <CardContent className={classes.doctorCard}>
        <div className={classes.doctorHeader}>
          <Avatar className={classes.avatar}>{initials(doctor)}</Avatar>
          <div>
            <Typography variant="h6" component="h3">
              Dr. {doctor.firstName} {doctor.lastName}
            </Typography>
            <Chip size="small" label={doctor.specialty.name} color="primary" variant="outlined" />
          </div>
        </div>
        <div className={classes.metaRow}>
          <LocalHospitalIcon fontSize="small" />
          <Typography variant="body2">{doctor.hospital.name}</Typography>
        </div>
        <div className={classes.metaRow}>
          <RoomIcon fontSize="small" />
          <Typography variant="body2">{doctor.hospital.city}</Typography>
        </div>
        <div className={classes.ratingRow}>
          <StarIcon fontSize="small" style={{ color: '#E2A63B' }} />
          <Typography variant="body2" style={{ fontWeight: 600 }}>
            {doctor.rating.toFixed(1)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ({doctor.reviews} reviews) &middot; {doctor.experience} yrs experience
          </Typography>
        </div>
        <div className={classes.cardActions}>
          <Button fullWidth variant="contained" color="primary" disableElevation>
            Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentRow({ appointment }) {
  const classes = useStyles();
  const meta = STATUS_META[appointment.status];
  return (
    <Card variant="outlined" className={classes.apptCard}>
      <div className={classes.apptLeft}>
        <div className={classes.apptIcon}>
          <EventNoteIcon />
        </div>
        <div>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {appointment.doctor.specialty.name} &middot; {appointment.date} at {appointment.time}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {appointment.symptoms}
          </Typography>
        </div>
      </div>
      <Chip
        size="small"
        label={meta.label}
        color={meta.color === 'primary' ? 'primary' : 'default'}
        style={{ fontWeight: 700 }}
      />
    </Card>
  );
}

export default function DemoDashboard() {
  const classes = useStyles();
  const [tab, setTab] = useState('doctors');

  if (!DEMO_MODE) {
    // Guard clause kept intentionally: this component must never render
    // without the demo flag, since it bypasses real authentication.
    return null;
  }

  return (
    <div className={classes.page}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.brand}>
            <div className={classes.brandMark}>
              <LocalHospitalIcon fontSize="small" />
            </div>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              Mediclick
            </Typography>
            <Chip size="small" label="DEMO DATA" className={classes.demoBadge} />
          </div>
          <Box className={classes.userChip}>
            <Avatar style={{ width: 32, height: 32 }}>
              {DEMO_USER.firstName[0]}
              {DEMO_USER.lastName[0]}
            </Avatar>
            <Typography variant="body2">
              {DEMO_USER.firstName} {DEMO_USER.lastName}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <div className={classes.heroText}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {DEMO_USER.firstName}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Find a doctor near you or check on your upcoming visits.
            <Box component="span" fontWeight={600} ml={1}>
              This screen shows sample data for illustration only.
            </Box>
          </Typography>
        </div>

        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
        >
          <Tab value="doctors" label="Find a Doctor" />
          <Tab value="appointments" label="My Appointments" />
        </Tabs>

        {tab === 'doctors' ? (
          <Grid container spacing={3}>
            {DEMO_DOCTORS.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor.email}>
                <DoctorCard doctor={doctor} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container direction="column" spacing={2}>
            {DEMO_APPOINTMENTS.map((appointment) => (
              <Grid item key={appointment._id}>
                <AppointmentRow appointment={appointment} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}
