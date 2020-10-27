import React, { useEffect, useState } from 'react';
import { makeStyles, AppBar, IconButton, Toolbar, Collapse, CssBaseline } from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import CallIcon from '@material-ui/icons/Call';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Login from './Login';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '82vh',
        
    },
    appbar: {
        background: 'none' ,
    },
    icon: {
        color: '#212121',
        fontSize: '2rem',
        padding:'24dp',
    },
    appbarTitle: {
        flexGrow: '1',
        fontSize: '4em',
        color: '#212121',
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
    },
    title: {
        color: '#212121',
        fontSize: '3.5rem',

    },
    container: {
        textAlign: 'center',
    },
    description: {
        color: '#212121',
        fontSize: '2em',
    },

}));
export default function Header(){
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);    
    }, [])
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className={classes.appbarTitle}>MEDICLICK</h1>
                    <IconButton>   
                        <CallIcon  className={classes.icon} />                    
                        <FacebookIcon className={classes.icon}/>
                        <InstagramIcon className={classes.icon} />
                        <TwitterIcon className={classes.icon} />
                        <SortIcon className={classes.icon} />
                    </IconButton>
                </Toolbar>               
            </AppBar>
            <Collapse in={checked} 
            {...(checked ? { timeout: 1000 } : {})}
            collapsedHeight={50}>
            <div className={classes.container}>
                <h1 className={classes.title}>We Care for Your Health <br />
                 Every Moment 
                </h1>
                <Typography className={classes.description} >
            GET STARTED           
            <br /> 
            <Button                        
            style= {{backgroundColor:"#d90202", color:"white"}}
            size="lg"
            variant="contained"
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Link to="/login" style= {{color:"white"}}>
                CLICK HERE!
            </Link>
                </Button>                    
        
          </Typography>
            </div>
                </Collapse>
            </div>
        
    )
}