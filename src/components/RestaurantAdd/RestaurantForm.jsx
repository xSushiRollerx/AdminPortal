import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'



const useStyles = makeStyles((theme) => ({
    field: {
        marginBottom: 8,
        width: "100%"
    },
    paper: {
        padding: 30
    }
}));

const states = [
    { state: 'Alabama', code: 'AL' },
    { state: 'Alaska', code: 'AK' },
    { state: 'Arizona', code: 'AZ' },
    { state: 'Arkansas', code: 'AR' },
    { state: 'California', code: 'CA' },
    { state: 'Colorado', code: 'CO' },
    { state: 'Connecticut', code: 'CT' },
    { state: 'Delaware', code: 'DE' },
    { state: 'Florida', code: 'FL' },
    { state: 'Georgia', code: 'GA' },
    { state: 'Hawaii', code: 'HI' },
    { state: 'Idaho', code: 'ID' },
    { state: 'Illinois', code: 'IL' },
    { state: 'Indiana', code: 'IN' },
    { state: 'Iowa', code: 'IA' },
    { state: 'Kansas', code: 'KS' },
    { state: 'Kentucky', code: 'KY' },
    { state: 'Louisianna', code: 'LA' },
    { state: 'Maine', code: 'ME' },
    { state: 'Maryland', code: 'MD' },
    { state: 'Massachusetts', code: 'MA' },
    { state: 'Michigan', code: 'MI' },
    { state: 'Minnesota', code: 'MN' },
    { state: 'Mississippi', code: 'MS' },
    { state: 'Missouri', code: 'MO' },
    { state: 'Montana', code: 'MT' },
    { state: 'Nebraska', code: 'NE' },
    { state: 'Nevada', code: 'NV' },
    { state: 'New Hampshire', code: 'NH' },
    { state: 'New Jersey', code: 'NJ' },
    { state: 'New Mexico', code: 'NM' },
    { state: 'New York', code: 'NY' },
    { state: 'North Carolina', code: 'NC' },
    { state: 'North Dakota', code: 'ND' },
    { state: 'Ohio', code: 'OH' },
    { state: 'Oklahoma', code: 'OK' },
    { state: 'Oregon', code: 'OR' },
    { state: 'Pennslyvania', code: 'PA' },
    { state: 'Rhode Island', code: 'RI' },
    { state: 'South Carolina', code: 'SC' },
    { state: 'South Dakota', code: 'SD' },
    { state: 'Tennessee', code: 'TN' },
    { state: 'Texas', code: 'TX' },
    { state: 'Utah', code: 'UT' },
    { state: 'Vermont', code: 'VT' },
    { state: 'Virginia', code: 'VA' },
    { state: 'Washington', code: 'WA' },
    { state: 'West Virginia', code: 'WV' },
    { state: 'Wisconsim', code: 'WI' },
    { state: 'Wyoming', code: 'WY' },
]

export default function RestaurantForm(props) {
    const style = useStyles();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["Label 1", "Label 2", "Label 3"];
    const stateProps = {
        options: states,
        getOptionLabel: (state) => state.code,
    };

    return (
        <Paper className={style.paper}>
            <Grid container justify="center" alignItems="stretch" direction="column" spacing={3}>
                <Grid item>
                    <Stepper activeStep={currentStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                    </Stepper>
                </Grid>
                <Grid item>
                    <h5>Restaurant Name</h5>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="Restaurant Name" fullWidth/>
                </Grid>
                <Grid item>
                    <h5>Location</h5>
                    <TextField id="outlined-basic" label="Street" fullWidth/>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={6}>
                            <TextField className={style.field} label="City"  size="small"/>
                        </Grid>
                        <Grid item xs={3}>
                                <Autocomplete
                                    {...stateProps}
                                    autoSelect
                                    size="small" 
                                    name="state"
                                    renderInput={(params) => <TextField  className={style.field} {...params}  label="State" margin="normal"/>}
                                />
                        </Grid>
                        <Grid item xs={3}>
                                <TextField label="Zip Code" className={style.field} size="small" name="zipCode"  
                                    onChange={(event) => {
                                        const regex = /^([0-9]){0,5}$/i;
                                    }}
                                />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <h5>Price Range</h5>
                </Grid>
                <Grid item>
                    <RadioGroup>
                        <FormControlLabel value="1" control={<Radio />} label="Cheap Eat" />
                        <FormControlLabel value="2" control={<Radio />} label="Mid Range" />
                        <FormControlLabel value="3" control={<Radio />} label="Fine Dining" />
                        <FormControlLabel value="4" control={<Radio />} label="High End Luxury" />
                    </RadioGroup>
                </Grid>
                <Grid item>
                    <h5>Tags</h5>
                </Grid>
                <Grid item>
                    <Autocomplete
                        multiple
                        options={[]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                        }
                        renderInput={(params) => (
                        <TextField {...params}  placeholder="Tags" />
                        )}
                    />
                </Grid>
                <Grid item alignItems="center" justify="center">
                    <Grid container direction="row" justify="center" alignItems="stretch">
                        <Button variant="outlined">Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
