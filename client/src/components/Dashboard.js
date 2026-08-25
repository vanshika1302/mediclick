import NewAppointment from './NewAppointment';
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ViewAppointments from './ViewAppointments';
import { useAuth } from '../auth';
import { Button, Box } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    flexGrow: 1,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flexGrow: 1,
  },
  userChip: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    marginRight: theme.spacing(2),
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: theme.palette.primary.dark,
    fontSize: '0.9rem',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const {setAuthTokens} = useAuth();

  const MENU_ITEMS = [
    {id: 'book_appointment', label: 'New Appointment', icon: EventAvailableIcon, patient: true, doctor: false},
    {id: 'view_appointments', label: 'View Appointments', icon: EventNoteIcon, patient: true, doctor: true}
  ];

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setAuthTokens({});
  };

  const [selectedMenu, setSelectedMenu] = useState(props.user.type === 'patient' ? 'book_appointment' : 'view_appointments');

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color="primary"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.brand}>
            <div className={classes.brandMark}>
              <LocalHospitalIcon fontSize="small" />
            </div>
            <Typography variant="h6" noWrap>
              Welcome, {props.user.firstName} {props.user.lastName}
            </Typography>
          </div>
          <Box className={classes.userChip}>
            <Avatar className={classes.userAvatar}>
              {props.user.firstName ? props.user.firstName[0] : ''}
              {props.user.lastName ? props.user.lastName[0] : ''}
            </Avatar>
            <Typography variant="body2" style={{ textTransform: 'capitalize' }}>
              {props.user.type}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            style={{ borderColor: 'rgba(255,255,255,0.5)' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {MENU_ITEMS.filter(item => item[props.user.type]).map(item => {
            const ItemIcon = item.icon;
            return (
              <ListItem
                button
                key={item.id}
                selected={selectedMenu === item.id}
                onClick={() => setSelectedMenu(item.id)}
              >
                <ListItemIcon><ItemIcon color={selectedMenu === item.id ? 'primary' : 'inherit'} /></ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          {
            book_appointment: <NewAppointment user={props.user} />,
            view_appointments: <ViewAppointments user={props.user} />
          }[selectedMenu]
        }
      </main>
    </div>
  );
}