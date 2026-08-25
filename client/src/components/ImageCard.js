import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  actionArea: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  media: {
    height: 160
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(0.5)
  },
  desc: {
    flexGrow: 1
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginTop: theme.spacing(2)
  }
}));

export default function ImageCard({ info }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea
        className={classes.actionArea}
        href={info.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia className={classes.media} image={info.imageUrl} title={info.title} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subtitle1" component="h3" className={classes.title}>
            {info.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.desc}>
            {info.desc}
          </Typography>
          <span className={classes.link}>
            Read more <ArrowForwardIcon fontSize="small" />
          </span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
