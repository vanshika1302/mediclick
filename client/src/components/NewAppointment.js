import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs, Button, Card, CardActions, CardContent, MenuItem, Radio, TextField } from '@material-ui/core';
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


const SPECIALTIES = [
  {id: 'spcl1', name: 'SPCL1'},
  {id: 'spcl2', name: 'SPCL2'}
]

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
        {SPECIALTIES.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
      </TextField>
    </Grid>
  </Grid>;
}

const DOCTORS = [
  {id: 'doc1', name: 'Dr. Vanshika Srivastava', hospital: 'Pagalkhana, Rajajipuram'},
  {id: 'doc2', name: 'Dr. Archil Srivastava', hospital: 'Ghar pe hi ilaaj karte hai'}
]

function DoctorForm(props) {
  const classes  = useStyles();
  return <Grid item container direction="column" spacing={3}>
    {
      DOCTORS.map(doctor => (
        <Grid item key={doctor.id}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                {doctor.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {doctor.hospital}
              </Typography>
            </CardContent>
            <CardActions>
              <Radio size="medium" checked={doctor.id === props.value} onChange={() => props.onChange(doctor.id)}/>
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
  return <Grid item container justify="center" alignItems="center">
    <Grid item xs={4}>
      <TextField
        id="slot-picker"
        fullWidth
        label="Pick a slot"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.value}
        onChange={event => props.onChange(event.target.value)}
      />
    </Grid>
  </Grid>
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

export default function NewAppointment() {
  const [step, setStep] = useState(0);
  const [specialty, setSpecialty] = useState('');
  const [doctor, setDoctor] = useState(undefined);
  const [symptoms, setSymptoms] = useState(undefined);
  const [slot, setSlot] = useState(undefined);

  const stepDetails = [
    {component: SpecialtyForm, params: {value: specialty, onChange: setSpecialty}},
    {component: DoctorForm, params: {value: doctor, onChange: setDoctor}},
    {component: SymptomsForm, params: {value: symptoms, onChange: setSymptoms}},
    {component: SlotForm, params: {value: slot, onChange: setSlot}},
    {component: Confirmation, params: {}}
  ];

  const handleNext = () => {
    if (stepDetails[step].params.value === null ||
      stepDetails[step].params.value === undefined ||
      stepDetails[step].params.value === '') {
      return;
    }
    setStep(step + 1);
  };
  const handleBack = () => {
    setStep(step - 1);
  };

  return <Paper elevation={4}>
          <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
            <Grid item>
              <Typography variant="h4">
                New Appointment
              </Typography>
            </Grid>
            <Grid item>
              <Breadcrumbs separator="">
                {[1, 2, 3, 4].map(item => {
                  return item <= step ? <CheckCircleIcon key={item} /> : <RadioButtonUncheckedIcon key={item} />
                })}
              </Breadcrumbs>
            </Grid>
            {stepDetails.map(item => <item.component {...item.params} />)[step]}
            {step < 4 ?
              <Grid item container justify="center" spacing={10}>
                <Grid item>
                  <Button
                    disabled={step===0}
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}>
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={[undefined, null, ''].includes(stepDetails[step].params.value)}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}>
                    Next
                  </Button>
                </Grid>
              </Grid>
              : null
            }
          </Grid>
        </Paper>;
}
  