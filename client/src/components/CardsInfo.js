import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import infos from '../components/static/infos';


const useStyles = makeStyles((theme) => ({
    root: {
        minheight:'20vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

}));
export default function () {
    const classes = useStyles();
    return <div className={classes.root}>
        <ImageCard  info={infos[0]}/>
        <ImageCard  info={infos[1]}/>
        <ImageCard  info={infos[2]}/>
        
    </div>
}