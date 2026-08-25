import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Header from './Header';
import CardsInfo from './CardsInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  section: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(10)
  },
  sectionHeading: {
    textAlign: 'center',
    marginBottom: theme.spacing(5)
  },
  footer: {
    padding: theme.spacing(4, 0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderTop: `1px solid ${theme.palette.divider}`
  }
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="lg" className={classes.section}>
        <div className={classes.sectionHeading}>
          <Typography variant="h4" component="h2" gutterBottom>
            Stay informed between visits
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Practical, doctor-reviewed guidance on the topics our patients ask about most.
          </Typography>
        </div>
        <CardsInfo />
      </Container>
      <div className={classes.footer}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Mediclick &middot; Built for safer, easier access to care
        </Typography>
      </div>
    </div>
  );
}
