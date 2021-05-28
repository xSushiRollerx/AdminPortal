import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import RestaurantService from "../../../services/RestaurantService";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup, TableCell,
    TextField
} from "@material-ui/core";
import Controls from "./controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default function AlignItemsList() {
    const classes = useStyles();

    //intial Restaurant List holder
    const [records, setRecords] = useState([]);

    const getData = /*async*/ () => {
        return RestaurantService.getRestaurant(0).then(res => res.data)
            .then((data) => {
                setRecords(() => data);
                // setRecords((records) => data);
            });
    }

    //intial load of Page******
    useEffect(() => {
        getData()/*.then(R => {return R})*/;
        // console.log(1);
        // console.log(records.data);
    }, []);


    return (
        <div>
            {records.map((restaurant) => (
                <div>
                    <h3>{restaurant.name}</h3>
                    <hr/>
                    <Grid>
                    {restaurant.menu.map((item) => (
                        <div>
                    <p>{item.category}</p>
                        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={restaurant.name}
                    secondary={
                        <React.Fragment>
                            {/*{restaurant.menu.map((item) => (*/}
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >


                                {item.name}
                                {item.summary}
                            </Typography>
                                    {/*// ))}*/}
                        </React.Fragment>
                    }
                />


                <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                        // openInPopup(item)
                    }}>
                    <EditOutlinedIcon fontSize="small"/>
                </Controls.ActionButton>
                <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                        // setConfirmDialog({
                        //     isOpen: true,
                        //     title: 'Are you wish to delete this record?',
                        //     subTitle: "You can not undo this operation",
                        //     onConfirm: () => onDelete(item.id)
                        // })
                    }}>
                    <CloseIcon fontSize="small"/>
                </Controls.ActionButton>



            </ListItem>
            {/*<Divider variant="inset" component="li" />*/}
{/*            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Summer BBQ"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                to Scott, Alex, Jennifer
                            </Typography>
                            {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Oui Oui"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Sandra Adams
                            </Typography>
                            {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                    }
                />
            </ListItem>*/}
        </List>
                        </div>
                    ))}
                    </Grid>

                </div>
            ))}

        </div>
    );
}
