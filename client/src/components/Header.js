import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography, Button, Chip } from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import VideocamIcon from '@material-ui/icons/Videocam';
import { Link } from 'react-router-dom';
import image from '../assets/img/bg7.jpg';

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: 'transparent',
    boxShadow: 'none'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2)
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.25),
    color: '#FFFFFF'
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)'
  },
  brandTitle: {
    fontWeight: 700,
    letterSpacing: 0.5,
    color: '#FFFFFF'
  },
  navActions: {
    display: 'flex',
    gap: theme.spacing(1.5),
    alignItems: 'center'
  },
  hero: {
    position: 'relative',
    minHeight: '92vh',
    backgroundImage: `linear-gradient(120deg, rgba(10,60,66,0.88) 0%, rgba(14,124,134,0.72) 55%, rgba(14,124,134,0.45) 100%), url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  heroContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.85)',
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    marginBottom: theme.spacing(1)
  },
  heroTitle: {
    color: '#FFFFFF',
    maxWidth: 640,
    lineHeight: 1.15,
    marginBottom: theme.spacing(2)
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.88)',
    maxWidth: 520,
    marginBottom: theme.spacing(4)
  },
  ctaRow: {
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap'
  },
  trustRow: {
    display: 'flex',
    gap: theme.spacing(5),
    marginTop: theme.spacing(5),
    flexWrap: 'wrap'
  },
  trustItem: {
    color: 'rgba(255,255,255,0.85)',
    minWidth: 130
  },
  trustNumber: {
    color: '#FFFFFF',
    fontWeight: 700
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <AppBar position="static" className={classes.appbar} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar} disableGutters>
            <div className={classes.brand}>
              <div className={classes.brandMark}>
                <LocalHospitalIcon />
              </div>
              <Typography variant="h6" className={classes.brandTitle}>
                MEDICLICK
              </Typography>
            </div>
            <div className={classes.navActions}>
              <Button component={Link} to="/login" style={{ color: '#FFFFFF' }}>
                Sign In
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                color="primary"
                disableElevation
              >
                Get Started
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" className={classes.heroContent}>
        <Box>
          <Chip
            icon={<VideocamIcon style={{ color: '#FFFFFF' }} />}
            label="Online consultations, no waiting rooms"
            style={{ backgroundColor: 'rgba(255,255,255,0.16)', color: '#FFFFFF', marginBottom: 24 }}
          />
          <Typography variant="h2" className={classes.heroTitle}>
            Healthcare that comes to you.
          </Typography>
          <Typography variant="h6" component="p" className={classes.heroSubtitle}>
            Book trusted doctors near you in minutes, manage appointments in one place,
            and get the care you need &mdash; safely, from wherever you are.
          </Typography>
          <div className={classes.ctaRow}>
            <Button
              component={Link}
              to="/signup"
              size="large"
              variant="contained"
              color="primary"
              disableElevation
            >
              Book Your First Appointment
            </Button>
            <Button
              component={Link}
              to="/login"
              size="large"
              variant="outlined"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.6)' }}
            >
              I already have an account
            </Button>
          </div>

          <div className={classes.trustRow}>
            <div className={classes.trustItem}>
              <Typography variant="h5" className={classes.trustNumber}>200+</Typography>
              <Typography variant="body2">Verified doctors</Typography>
            </div>
            <div className={classes.trustItem}>
              <Typography variant="h5" className={classes.trustNumber}>15</Typography>
              <Typography variant="body2">Specialties covered</Typography>
            </div>
            <div className={classes.trustItem}>
              <Typography variant="h5" className={classes.trustNumber}>24/7</Typography>
              <Typography variant="body2">Appointment booking</Typography>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
}
