import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import image from '../assets/img/bg7.jpg';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
root: {
    minHeight: '100vh',
    backgroundImage: "url(" + image + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

},

}));
export default function HomePage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header />
            <CssBaseline />
            
        </div>
    )
}

