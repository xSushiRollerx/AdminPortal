import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import RestaurantService from './../../services/RestaurantService';




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
    const stateProps = {
        options: states,
        getOptionLabel: (state) => state.code,
    };

    const history = useHistory();
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [tags, setTags] = useState([]);
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({
        street: {error: false, text: ''},
        city: { error: false, text: '' },
        state: { error: false, text: '' },
        zipCode: { error: false, text: '' },
        name: { error: false, text: '' },
        price: { error: false, text: '' }
    });

    const valid = () => {
        let nameError = { error: false, text: ''};
        let streetError = { error: false, text: ''};
        let cityError = { error: false, text: ''};
        let stateError = { error: false, text: ''};
        let zipCodeError = { error: false, text: ''};
        let priceError = { error: false, text: ''};
        let tagsError = { error: false, text: ''};

        if (name === null | name === undefined | name.trim() === '') {
            nameError.error = true;
            nameError.text = "This Field Cannot Be Blank"
        }

        if (street === "null" | street === undefined | street.trim() === '') {
            streetError.error = true;
            streetError.text = "This Field Cannot Be Blank"
        }

        if (city === "null" | city === undefined | city.trim() === '') {
            cityError.error = true;
            cityError.text = "This Field Cannot Be Blank"
        }

        if (state === "null" | state === undefined | state.trim() === '') {
            stateError.error = true;
            stateError.text = "This Field Cannot Be Blank"
        }

        if (zipCode === "null" | zipCode === undefined | zipCode.trim() === '') {
            zipCodeError.error = true;
            zipCodeError.text = "This Field Cannot Be Blank"
        } else if (zipCode.length < 5) {
            zipCodeError.error = true;
            zipCodeError.text = "This zip code is incomplete. It does not have five digits."
        }

        if (price === "null" | price === undefined | price === 0) {
            priceError.error = true;
            priceError.text = "Please select a price range"
        }

        setErrors({
            street: streetError,
            city: cityError,
            state: stateError,
            zipCode: zipCodeError,
            name: nameError,
            price: priceError,
            tags: tagsError
        });

        if (nameError | streetError | cityError | stateError | zipCodeError | priceError) {
            console.log("invalid")
            return false;
        } else {
            console.log("valid");
            return true;
        };
    };

    const submit = async () => {
        console.log()
        if (!valid()) return; 

        try {
            let response  = await RestaurantService.addRestaurant(name, street, city, state, parseInt(zipCode), tags.toString(), parseInt(price));
            
            if (response.status === 201) {
                console.log("got response");
                console.log(response)
                history.push("/restaurant/" + response.data.id);
            }
        } catch (error) {
            console.log("haha");
        }
    }
    return (
        <Paper className={style.paper}>
            <Grid container justify="center" alignItems="stretch" direction="column" spacing={3}>
                <Grid item>
                    <h5>Restaurant Name</h5>
                </Grid>
                <Grid item>
                    <TextField error={errors.name.error} id="outlined-basic" label="Restaurant Name" onChange={(event) => {
                            setName(event.target.value);
                        }
                    } fullWidth/>
                </Grid>
                <Grid item>
                            <FormHelperText error={true}>{errors.name.text}</FormHelperText>
                        </Grid>
                <Grid item>
                    <h5>Location</h5>
                    <TextField error={errors.street.error} id="outlined-basic" label="Street" onChange={(event) => {
                            setStreet(event.target.value);
                        }
                    } fullWidth/>
                    <FormHelperText error={true}>{errors.street.text}</FormHelperText>
                    <Grid container direction="row" justify="center" alignItems="flex-end">
                        <Grid item xs={6}>
                            <TextField error={errors.city.error} className={style.field} label="City" size="small" onChange={(event) => {
                            setCity(event.target.value);
                        }}/>
                        </Grid>
                        <Grid item xs={3}>
                                <Autocomplete
                                    options={states.map(value => value.code)}
                                    autoSelect
                                    size="small" 
                                    name="state"
                                    onChange={(event, value) => {setState(value);}}
                                    renderInput={(params) => <TextField  error={errors.state.error} {...params}  label="State" margin="normal"/>}
                                />
                        </Grid>
                        <Grid item xs={3}>
                                <TextField label="Zip Code" error={errors.zipCode.error} value={zipCode} className={style.field} size="small" name="zipCode"  
                                    onChange={(event) => {
                                        const regex = /^([0-9]){0,5}$/i;
                                        if (event.target.value === '' || regex.test(event.target.value)) {
                                            setZipCode( event.target.value );
                                        }
                                    }}
                                />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="flex-start">
                        <Grid item xs={6}>
                            <FormHelperText error={true}>{errors.city.text}</FormHelperText>
                        </Grid>
                        <Grid item xs={3}>
                            <FormHelperText error={true}>{errors.state.text}</FormHelperText>
                        </Grid>
                        <Grid item xs={3}>
                            <FormHelperText error={true}>{errors.zipCode.text}</FormHelperText>
                        </Grid>


                    </Grid>
                </Grid>
                <Grid item>
                    <h5>Price Range</h5>
                </Grid>
                <Grid item>
                    <RadioGroup onChange={(event) => {
                            setPrice(event.target.value);
                        }}>
                        <FormControlLabel value="1" control={<Radio />} label="Cheap Eat" />
                        <FormControlLabel value="2" control={<Radio />} label="Mid Range" />
                        <FormControlLabel value="3" control={<Radio />} label="Fine Dining" />
                        <FormControlLabel value="4" control={<Radio />} label="High End Luxury" />
                    </RadioGroup>
                </Grid>
                <Grid item >
                    <FormHelperText error={true}>{errors.price.text}</FormHelperText>
                </Grid>
                <Grid item>
                    <h5>Tags</h5>
                </Grid>
                <Grid item>
                    <Autocomplete
                        multiple
                        options={[]}
                        freeSolo
                        renderTags={(value, getTagProps) => {
                            setTags(value);
                            return value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }}
                        renderInput={(params) => (
                        <TextField {...params}  placeholder="Tags" />
                        )}
                    />
                </Grid>
                <Grid item alignItems="center" justify="center">
                    <Grid container direction="row" justify="center" alignItems="stretch">
                        <Button onClick={submit}variant="outlined">Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
