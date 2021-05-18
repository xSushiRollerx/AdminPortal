import React from 'react';
import {makeStyles,withStyles} from "@material-ui/core";

//withStyles & makeStyles

/*const useStyles = makeStyles({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: "#253053"
    }
})*/

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: "#253053"
    }
}

const SideMenu = (props) => {
    const {classes} = props;

    return(

        <div className={classes.sideMenu}>

        </div>
    )
}

export default withStyles(style)(SideMenu)



/*export default function SideMenu() {

    const classes = useStyles();


    return(

        <div className={classes.sideMenu}>
            TestText
        </div>
    )*/



