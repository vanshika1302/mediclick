import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ImageCard from './ImageCard';
import infos from './static/infos';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'stretch'
  }
}));

export default function CardsInfo() {
  const classes = useStyles();
  return (
    <Grid container spacing={4} className={classes.root}>
      {infos.map((info) => (
        <Grid item xs={12} sm={6} md={3} key={info.title}>
          <ImageCard info={info} />
        </Grid>
      ))}
    </Grid>
  );
}
