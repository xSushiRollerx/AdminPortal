import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";

export function useForm(initialFValues, validateOnChange =false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    //e is the default event parameter in any HTML input element
    const handleInputChange = e => {
        const {name, value} = e.target;
        //converting boolean to integer for isActive
        if (name === "isActive") {
            let isActiveValue = value ? 1 : 0;
            setValues({
                ...values,
                [name]: isActiveValue
            })
        } else {


        setValues({
            ...values,
            [name]: value
        })
    }

        for (let i = 0; i < value.length; i++) {
            console.log(values[i]);
        }


        if(validateOnChange)
            validate({[name]: value})


    }

    const resetForm =() => {
        setValues(initialFValues);
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm


    }
}

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiFormControl-root": {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {
    const classes = useStyles();
    const {children, ...other} = props;

    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}

        </form>
    );
}



