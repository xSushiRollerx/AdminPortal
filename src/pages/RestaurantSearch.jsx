import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import SearchFilter from '../components/RestaurantSearch/SearchFilter';
import RestaurantTable from '../components/RestaurantSearch/RestaurantTable';
import TablePagination from '@material-ui/core/TablePagination';
import RestaurantTablePagination from '../components/RestaurantSearch/RestaurantTablePagination';
import RestaurantService from './../services/RestaurantService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect } from 'react';


const useStyles = makeStyles((theme) => ({

    search: {
        borderRadius: 0,
        width: '100%'
    },
    sort: {
        height: 42,
        width: "100%"
    },
    sortDisplay: {
        width: "100%"
    },
    divider: {
        marginTop: 0,
        marginBottom: 10
    },
    filter: {
        borderRightStyle: "solid",
        borderRightWidth: 1,
        borderRightColor: "gray"
    },
    pagination: {
        border: 0,
        padding: 0
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    p: {
        margin: 0,
        fontSize: 12
    }

}));

export default function RestaurantSearch(props) {
    const style = useStyles();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState(0);
    const [keywords, setKeywords] = useState("");
    const [address, updateAddress] = useState({});
    const [inActive, setInactive] = useState(0);
    const [autoComplete, setAutoComplete] = useState([]);
    

    const handleChangePage = async (newPage) => {
        try {
            let res = await RestaurantService.getAllRestaurants(newPage, pageSize, inActive, keywords);
            setStatus(res.status);
            console.log(res);
            setRows(res.data);
        } catch (error) {
            setStatus(500);
        }
        setPage(newPage);
    };
    const handleChangeRowsPerPage = async (event) => {
        try {
            let res = await RestaurantService.getAllRestaurants(0, event.target.value, inActive, keywords);
            setStatus(res.status);
            setRows(res.data);
        } catch (error) {
            setStatus(500);
        
        }
        setPage(0);
        setPageSize(event.target.value);
    };
    const handleAddressChange = () => {
        console.log("handle address change run");
        console.log(document.getElementById('dropOffSelect').value);
        if (document.getElementById('dropOffSelect').value.trim() !== "") {
            let temp = document.getElementById('dropOffSelect').value.trim().split(",");
            updateAddress({ streetAddress: temp[0], city: temp[1], state: temp[2], zipCode: null })
            localStorage.setItem('dropOffAddress', JSON.stringify({ streetAddress: temp[0], city: temp[1], state: temp[2], zipCode: null}));
        }
    }
    const handleInactiveChange = async () => {
        try {
            let res = await RestaurantService.getAllRestaurants(0, pageSize, inActive === 1 ? 0 : 1, keywords);
            console.log(res);
            setStatus(res.status);
            setRows(res.data);
        } catch {
            setStatus(500);
        }
        setInactive(inActive === 1 ? 0 : 1);
        setPage(0);
    }
    const handleSearchBarChange = async (event) => {
        try {
            console.log("handlesearchhappening")
            let res = await RestaurantService.getAllRestaurants(0, pageSize, inActive, event.target.value);
            setAutoComplete(res.data);
        } catch {
            setAutoComplete([{name: 'Something Went Wrong'}]);
        }
    }
    const clearInactive = async () => {
        try {
            let res = await RestaurantService.getAllRestaurants(0, pageSize, 1, keywords);
            setStatus(res.status);
            setRows(res.data);
        } catch {
            setStatus(500)
        }
        setInactive(1);
        setPage(0);
    }
    useEffect(async () => {
        try {
            let res = await RestaurantService.getAllRestaurants(0, 10, 1, "");
            setStatus(res.status);
            setRows(res.data);
        } catch (error) {
            setStatus(500);
        }
        
        
        //load event listener for when user hits enter
        window.addEventListener('keyup', async (event) => {
            if (event.keyCode === 13) {
                console.log("key event fired");
                event.preventDefault();
                console.log(document.getElementById("searchBar").value);
                try {
                    let res = await RestaurantService.getAllRestaurants(0, pageSize, 1, (document.getElementById("searchBar") !== null ? document.getElementById("searchBar").value : ""))
                    setStatus(res.status);
                    console.log(res);
                    setRows(res.data);
                } catch (error) {
                    setStatus(500);
                }
                setKeywords(document.getElementById("searchBar").value);
                setPage(0);
            }
        })
    }, [])

    if (status === 0) {
        return (

           <div data-testid="Waiting">
                <Backdrop className={style.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
         </div>
        );
    }
    return (
        <Grid container direction="column" inputProps={{ 'data-testid': 'SearchPage' }}>
            
            <Grid item xs={12}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="searchBar"
                            freeSolo
                            loadingText="Loading . . . "
                            options={autoComplete}
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => (
                                <Grid direction="column" alignItems="stretch" justify="flex-start" onClick={() => props.history.push('/restaurant/' + option.id)}>
                                    
                                    <h6><b><a href={'/restaurant/' + option.id}>{option.name}</a></b></h6>
                                        <p className={style.p}>{option.id}</p>
                                    
                                    </Grid>
                               
                                )}
                            renderInput={(params) => (
                                <TextField {...params} id="searchBar" inputProps={{ 'data-testid': 'searchBar' }} label="Search Restaurants" onChange={handleSearchBarChange} margin="normal" variant="outlined" placeholder="Search Restaurants" className={style.search} />
                            )}
                        />
                            
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="row" alignItems="center" justify="space-between">
                        <Grid item xs={8} >
                            <Grid direction="row" container xs={12} spacing={0} justify="center">
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={3}
                                    count={rows.length > 0 ? rows[0].resultSize : 0}
                                    rowsPerPage={pageSize}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page', 'data-testid': 'rowsSelect' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={RestaurantTablePagination}
                                    className={style.pagination}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="row" justify="flex-end">
                                 <Button variant="contained" color="primary" disableElevation>
                                    Add Restaurant
                                </Button>
                            </Grid>    
                        </Grid>
                    </Grid>
                </Grid>
                <Divider orientation="horizontal" flexItem className={style.divider} />
                <Grid item xs={12} >
                    <Grid direction="row" container xs={12} spacing={0}>
                        <Grid className={style.filter} item xs={3}>
                            <SearchFilter 
                                 address={address} addressChange={handleAddressChange}
                                inactive={inActive} showInactive={handleInactiveChange} clearInactive={clearInactive}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container direction="column" alignItems="stretch" justify="flex-start">
                                {status === 200 ? <RestaurantTable rows={rows} page={page} rowsPerPage={rows.length} /> :
                                   <Grid container item alignItems="center" justify="center"> <h5>Something Went Wrong. Please Try Again.</h5></Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
        );
}