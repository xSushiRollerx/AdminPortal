import React, {useState, useEffect} from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import {useForm, Form} from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import * as employeeService from "../../services/employeeService";


const priceCategoryItems = [
    {id: "1", title: "1"},
    {id: "2", title: "2"},
    {id: "3", title: "3"},
    {id: "4", title: "4"},
    {id: "5", title: "5"}

]

const initialFValues = {
    id: 0,
    name: '',
    averageRating: '',
    tags: '',
    isActive: false,
    priceCategory: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode:''
}


export default function RestaurantForm(props) {
/*    //destructured Array declaration
        const [x, setx] = useState(5);
        setx(6);

        let y = x +3;

    /!*    the first param the func, will run when
        ever the value of one of the 2nd param
        array memebers changes*!/
        useEffect(() => {
        }
        ,[x,y]);*/

    const { addOrEdit, recordForEdit } = props
    // console.log(recordForEdit);
    // console.log(props.recordForEdit);

    // const validate = (fieldValues = (values.id !== 0 ? recordForEdit : values)) => {
// console.log(typeof values);
// console.log("values: " + values);
// console.log(fieldValues);
// console.log(fieldValues.zipCode.length);

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ("name" in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        // if ("email" in fieldValues)
        //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ("streetAddress" in fieldValues)
            temp.streetAddress = fieldValues.streetAddress ? "" : "This field is required."
        if ("zipCode" in fieldValues)
            temp.zipCode = fieldValues.zipCode.length > 4 ? "" : "Minimum 5 numbers required."
        // console.log("temp.zipCode: " + temp.zipCode);
        // console.log("fieldValues.zipCode.length " + fieldValues.zipCode.length);
        if ("departmentId" in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm((/*recordForEdit !== undefined ? recordForEdit :*/ initialFValues), true, validate);
    // } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            //insert data call to backend simulation
            addOrEdit(values, resetForm);
            // employeeService.insertEmployee(values);
            // resetForm();
        }
        // window.alert("testing...");
    }

    useEffect(() => {
        if(recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
        console.log(recordForEdit);
    }, [recordForEdit]);
    


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        label={"Average Rating"}
                        name="averageRating"
                        value={values.averageRating}
                        onChange={handleInputChange}
                        error={errors.averageRating}
                    />
                    <Controls.Input
                        label={"Tags"}
                        name="tags"
                        value={values.tags}
                        onChange={handleInputChange}
                        error={errors.tags}
                    />
                    <Controls.Input
                        label={"Street Address"}
                        name="streetAddress"
                        value={values.streetAddress}
                        onChange={handleInputChange}
                        error={errors.streetAddress}
                    />
                    <Controls.Input
                        label={"City"}
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}

                    />
                    <Controls.Input
                        label={"State"}
                        name="state"
                        value={values.state}
                        onChange={handleInputChange}
                        error={errors.state}

                    />
                    <Controls.Input
                        label={"Zip Code"}
                        name="zipCode"
                        value={values.zipCode}
                        onChange={handleInputChange}
                        error={errors.zipCode}

                    />
                </Grid>
                <Grid item xs={6}>
{/*                    <Controls.RadioGroup
                        name="priceCategory"
                        value={values.priceCategory}
                        label="Price Cat"
                        onChange={handleInputChange}
                        items={priceCategoryItems}
                    />*/}
                    <Controls.Select
                        name="priceCategory"
                        label="Price Category"
                        value={values.priceCategory}
                        onChange={handleInputChange}
                        options={priceCategoryItems}
                        // options={employeeService.getDepartmentCollection()}
                        error={errors.priceCategory}
                    />
{/*                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />*/}
                    <Controls.Checkbox
                        name="isActive"
                        label="Is Active"
                        value={values.isActive ? 1 : 0}
                        onChange={handleInputChange}
                        error={errors.isActive}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"/>
                        <Controls.Button
                            color="default"
                            text="Reset"
                            onClick={resetForm}
                        />
                    </div>


                </Grid>
            </Grid>
        </Form>


    );
}

