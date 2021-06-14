import React from 'react';
import {Grid, TextField} from "@material-ui/core";

export default function Input(props) {

    const {name, label, value,error=null, onChange, ...other} = props;

    return (
        <TextField
            variant = {"outlined"}
            label = {label}
            name = {name}
            value = {value}
            onChange = {onChange}
            {...other}
/*            error
            helperText="Some Validation Error."*/
            // need to ask about this syntax below
            {...(error && {error:true, helperText:error})}

        />

    );
}


