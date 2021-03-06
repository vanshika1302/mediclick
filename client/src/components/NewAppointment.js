import React from 'react';
import { uniq } from 'underscore';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs, Button, Card, CardActions, CardContent, MenuItem, Radio, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    marginLeft: 25,
    marginRight: 25,
    alignContent: 'center'
  }
});

function CityForm(props) {
  return <Grid item container alignItems="center" justify="center">
    <Grid item xs={5}>
      <TextField
        value={props.value}
        onChange={event => props.onChange(event.target.value)}
        fullWidth
        required
        id="select"
        name="Select City"
        label="Select City"
        select
      >
        {props.allCities.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </TextField>
    </Grid>
  </Grid>;
}

function SpecialtyForm(props) {
  return <Grid item container alignItems="center" justify="center">
    <Grid item xs={5}>
      <TextField
        value={props.value}
        onChange={event => props.onChange(event.target.value)}
        fullWidth
        required
        id="select"
        name="Select Specialty"
        label="Select Specialty"
        select
      >
        {props.allSpecialties.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
      </TextField>
    </Grid>
  </Grid>;
}

function DoctorForm(props) {
  const classes  = useStyles();
  return <Grid item container direction="column" spacing={3}>
    {
      props.allDoctors.map(doctor => (
        <Grid item key={doctor.email}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                {doctor.firstName} {doctor.lastName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {doctor.hospital.name}
              </Typography>
              <Typography>
                {doctor.hospital.address}
              </Typography>
            </CardContent>
            <CardActions>
              <Radio size="medium" checked={doctor.email === props.value} onChange={() => props.onChange(doctor.email)}/>
            </CardActions>
          </Card>
        </Grid>
      ))
    }
  </Grid>;
}

function SymptomsForm(props) {
  return <Grid item container justify="center" alignItems="center">
    <Grid item xs={8}>
      <TextField
        onChange={event => props.onChange(event.target.value)}
        value={props.value}
        id="symptoms"
        label="Briefly describe your symptoms"
        required
        fullWidth
        multiline
        rows={2}
        variant="outlined"
      />
    </Grid>
  </Grid>;
}

function SlotForm(props) {
  var minDate = new Date();
  var tomorrow = minDate.getDate() + 1;
  minDate.setDate(tomorrow);
  const ALL_SLOTS = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "19:00", "19:30", "20:00", "20:30", "21:00"
  ];
  const freeSlots = ALL_SLOTS.filter(slot => !props.bookedSlots.includes(slot));
  return <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid item container justify="center" alignItems="center">
      <Grid item xs={3}>
        <KeyboardDatePicker
          value={props.date || minDate}
          onChange={props.onDateChange}
          minDate={minDate}
          placeholder="Select Date"
          format="MM/dd/yyyy"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          value={props.value}
          onChange={event => props.onTimeChange(event.target.value)}
          fullWidth
          required
          id="select"
          name="Select Time"
          label="Select Time"
          select
        >
          {freeSlots.map(slot => <MenuItem key={slot} value={slot}>{slot}</MenuItem>)}
        </TextField>
      </Grid>
    </Grid>
  </MuiPickersUtilsProvider> 
}

function Confirmation() {
  return <Grid item container justify="center" alignItems="center">
    <Grid item xs={8}>
      <Typography variant="body1">
        Appointment Confirmed!
      </Typography>
    </Grid>
  </Grid>
}

export default class NewAppointment extends React.Component {
  constructor(props) {
    super(props);
    var minDate = new Date();
    var tomorrow = minDate.getDate() + 1;
    minDate.setDate(tomorrow);
    this.state = {
      step: 0,
      city: '',
      specialty: '',
      doctor: undefined,
      symptoms: undefined,
      slotDate: `${minDate.getMonth() + 1}-${minDate.getDate()}-${minDate.getFullYear()}`,
      slotTime: undefined,
      allDoctors: [],
      allAppointments: []
    };
  }

  componentDidMount() {
    axios.get('/doctor/read').then((response) => {
      console.log(response.data);
      this.setState({allDoctors: response.data});
    }, (error) => {
      console.log(error);
    });
    axios.get('/appointment/read').then((response) => {
      console.log(response.data);
      this.setState({allAppointments: response.data});
    }, (error) => {
      console.log(error);
    });
  }

  setCity = (value) => this.setState({city: value});
  setSpecialty = (value) => this.setState({specialty: value});
  setDoctor = (value) => this.setState({doctor: value});
  setSymptoms = (value) => this.setState({symptoms: value});
  setSlotDate = (value) => this.setState({slotDate: `${value.getMonth() + 1}-${value.getDate()}-${value.getFullYear()}`});
  setSlotTime = (value) => this.setState({slotTime: value});

  handleNext = (stepDetails) => {
    const step = this.state.step;
    if (stepDetails[step].params.value === null ||
      stepDetails[step].params.value === undefined ||
      stepDetails[step].params.value === '') {
      return;
    }
    if (this.state.step === 4) {
      const booking = {
        date: this.state.slotDate,
        time: this.state.slotTime,
        doctorEmail: this.state.doctor,
        symptoms: this.state.symptoms,
        patientEmail: this.props.user.email,
        status: 'active'
      };
      axios.put('/appointment/create', booking).then((response) => {
        console.log(response.data);
        this.setState({step: this.state.step + 1});
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.setState({step: this.state.step + 1});
    }
  };
  handleBack = () => {
    this.setState({step: this.state.step - 1});
  };

  render() {
    const { step, city, specialty, doctor, symptoms, slotDate, slotTime, allDoctors, allAppointments } = this.state;
    const stepDetails = [
      {
        component: CityForm,
        params: {
          allCities: uniq(allDoctors.map(item => item.hospital.city), false, item => item),
          value: city,
          onChange: this.setCity
        }
      },
      {
        component: SpecialtyForm,
        params: {
          allSpecialties: uniq(allDoctors.filter(item => item.hospital.city === city).map(item => item.specialty), false, item => item.id),
          value: specialty,
          onChange: this.setSpecialty
        }
      },
      {
        component: DoctorForm,
        params: {
          allDoctors: allDoctors.filter(item => item.specialty.id === specialty && item.hospital.city === city),
          value: doctor,
          onChange: this.setDoctor
        }
      },
      {
        component: SymptomsForm,
        params: {
          value: symptoms,
          onChange: this.setSymptoms
        }
      },
      {
        component: SlotForm,
        params: {
          date: slotDate,
          value: slotTime,
          bookedSlots: allAppointments.filter(item => item.doctorEmail === doctor && item.date === slotDate).map(item => item.time),
          onDateChange: this.setSlotDate,
          onTimeChange: this.setSlotTime
        }
      },
      {
        component: Confirmation,
        params: {
        }
      }
    ];

    return <Paper elevation={4}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h4">
            New Appointment
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs separator="">
            {[1, 2, 3, 4, 5].map(item => {
              return item <= step ? <CheckCircleIcon key={item} /> : <RadioButtonUncheckedIcon key={item} />
            })}
          </Breadcrumbs>
        </Grid>
        {stepDetails.map(item => <item.component {...item.params} />)[step]}
        {step < 5 ?
          <Grid item container justify="center" spacing={10}>
            <Grid item>
              <Button
                disabled={step===0}
                variant="contained"
                color="secondary"
                onClick={this.handleBack}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={[undefined, null, ''].includes(stepDetails[step].params.value)}
                variant="contained"
                color="primary"
                onClick={() => this.handleNext(stepDetails)}
              >
                {step < 4 ? 'Next' : 'Book'}
              </Button>
            </Grid>
          </Grid>
          : null
        }
      </Grid>
    </Paper>;
  }
};

