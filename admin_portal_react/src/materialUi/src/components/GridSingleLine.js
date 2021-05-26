import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import * as tileData from "react-bootstrap/ElementChildren";
import RestaurantService from "../../../services/RestaurantService";
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        // transform: 'translateZ(0)',
    },
    title: {
        // color: theme.palette.primary.light,
    },
    titleBar: {
        // background:
        //     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineGridList() {
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
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {records.map((restaurant) => (
                    <GridListTile key={restaurant.priceCategory}>
                        {/*<img src={tile.img} alt={tile.title} />*/}
                        <GridListTileBar
                            title={restaurant.name}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton aria-label={`star ${restaurant.name}`}>
                                    <StarBorderIcon className={classes.title} />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
