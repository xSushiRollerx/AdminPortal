import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DeliveryAddress from './DeliveryAddress';

import { useState } from 'react';

const useStyles = makeStyles({
    tags: {
        marginTop: 8,
        marginBottom: 8
    },
    tag: {
        marginRight: 8,
        fontSize: 12
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        textAlign: 'center',
        top: '50%',
        marginTop: 0
    },
    p: {
        margin: 0,
        fontSize: 14
    },
    card: {
        paddingRight: 20,
        marginBottom: 0
    },
    clearButtons: {
        margin: 8
    },

});

export default function SearchFilter(props) {

    const style = useStyles();
    const [openAddress, setOpenAddress] = useState(false);
    let close = () => {
        setOpenAddress(false);
    }
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch" className={style.card}>
            <Grid item>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <h5>Location</h5>
                    <Checkbox color="black" icon={<EditIcon fontSize="small" style={{ margin: "0px" }} />}
                        checkedIcon={<EditIcon fontSize="small" style={{ margin: "0px" }} />} onChange={() => setOpenAddress(true)} name="clear-ratings-filter" />
                </Grid>
            </Grid>
            <p className={style.p}>{props.address.streetAddress === null | props.address.streetAddress === undefined  ? "Everywhere" : props.address.streetAddress}</p>
            <p className={style.p}>{props.address.streetAddress === null | props.address.streetAddress === undefined ? "" : props.address.city+ ", " + props.address.state}</p>
            <p className={style.p}>{props.address.zipCode}</p>
            <Divider orientation="horizontal" flexItem className={style.divider} />
            <Grid item xs={12}>
                <Grid direction="column" justify="flex-start" alignItems="stretch" container>
                    <Grid item>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <h5>Status</h5>
                            <Checkbox color="black" inputProps={{ 'data-testid': 'clearInactiveBox' }} icon={<ClearIcon fontSize="small" style={{ margin: "0px" }} />}
                                checkedIcon={<ClearIcon fontSize="small" style={{ margin: "0px" }} />} onChange={props.clearInactive} name="clear-inactive-filter" />
                        </Grid>
                    </Grid>
                    <FormControl>
                        <FormControlLabel
                            control={<Checkbox checked={props.inactive === 1 ? false : true} inputProps={{ 'data-testid': 'inactiveBox' }} color="black" icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />} onChange={props.showInactive} name="inactive" />}
                            label="Show Inactive"
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <DeliveryAddress open={openAddress} close={setOpenAddress} addressChange={props.addressChange} />      
        </Grid>
    );
}