import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    maxHeight: 100,
    margin: '30px',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  title: {
       fontFamily: 'roboto',
  },
  desc: {
    fontFamily: 'roboto',
  }

});

export default function ImageCard( { info }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);    
    }, [])

  return (
    <Collapse in={checked} 
            {...(checked ? { timeout: 1000 } : {})}
            collapsedHeight={50}>
    <Card className={classes.root}>
        <CardContent>
            
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            { info.title }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
            { info.desc }
          </Typography>
        </CardContent>
    </Card>
    </Collapse>
  );
}
