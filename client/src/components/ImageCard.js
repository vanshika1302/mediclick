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
    height:'50vh',
    maxWidth: 645,
    margin: '30px',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  title: {
       fontFamily: 'roboto',
       fontWeight: 'bold',
       fontSize:'2rem', 
  },
  desc: {
    fontFamily: 'roboto',
    fontWeight: 'bold',
  },
  media: {
    height: 240,
  },

});

export default function ImageCard( { info }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);    
    }, [])

  return (
    
    <Card className={classes.root}>
        
        <CardMedia
          className={classes.media}
          image={info.imageUrl}
          
        /><CardContent>
          <Typography gutterBottom variant="h5" component="h1" className={classes.title}>
            { info.title }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
            { info.desc }
          </Typography>
          <br />
          <Typography>
            <Button
            style= {{backgroundColor:"#22c716", color:"white"}}
            size="lg"
            variant="contained"
            href={info.link}
            target="_blank"
            rel="noopener noreferrer"
            >
              click me!
            </Button>
          </Typography>
        </CardContent>
    </Card>
  );
}
