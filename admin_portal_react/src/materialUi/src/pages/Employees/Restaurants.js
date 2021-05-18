import React, {useEffect, useState} from 'react';
import RestaurantForm from "./RestaurantForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from "@material-ui/core";
import useTable from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../components/controls/Controls";
import {EditOutlined, Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add"
import Popup from "../../components/Popup";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Notification from "../../components/controls/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import RestaurantService from "../../../../services/RestaurantService";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id: "name", label: "Name"},
    {id: "averageRating", label: "Average Rating"},
    {id: "tags", label: "Tags"},
    {id: "city", label: "City", /*disableSorting: true*/},
    {id: "actions", label: "Actions", disableSorting: true}
]

export default function Restaurants(props) {

    const getData = /*async*/ () => {
        return RestaurantService.getRestaurant(0).then(res => res.data)
            .then((data) => {
                setRecords(() => data);
                // setRecords((records) => data);
            });
    }

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);


    const [records, setRecords] = useState([]);
;
        // fetch( 'http://localhost:8080/restaurant/all/page/0')
        // .then(response => response.json()))
        // .then(data => console.log(data)));
        // (restaurants === undefined||restaurants === null) ? "" : restaurants);

    // console.log(records);

    useEffect(() => {
        getData()/*.then(R => {return R})*/;
        // console.log(1);
        // console.log(records.data);
    }, [  ]);


    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen :false, message:'', type:''});
    const [confirmDialog, setConfirmDialog] =
        useState({isOpen:false, title:"", subTitle:""});

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    //value toLowerCase so that it matches cases
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }


    //inserting or Updating records
    const addOrEdit = (employee, resetForm) => {
        if(employee.id === 0){
            console.log(employee);
            RestaurantService.createRestaurant(employee);}
        // employeeService.insertEmployee(employee);
        else{
        employeeService.updateEmployee(employee);}
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        // window.location.reload();
        // setRecords(getData());
        setNotify({
            isOpen : true,
            message: "Submitted Successfully",
            type: "success"
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
            employeeService.deleteEmployee(id);
            setRecords(employeeService.getData());
            setNotify({
                isOpen: true,
                message: "Deleted Successfully",
                type: "error"
            })
    }

    return (
        <React.Fragment>
            <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Restaurants"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/>
                            </InputAdornment>)

                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        className={classes.newButton}
                        onClick={() => {setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.averageRating}</TableCell>
                                    <TableCell>{item.tags}</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick = {() => {openInPopup(item)}}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you wish to delete this record?',
                                                    subTitle: "You can not undo this operation",
                                                    onConfirm: () => onDelete(item.id)
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
            <Popup
                title="New Restaurant Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <RestaurantForm
                    recordForEdit = {recordForEdit}
                addOrEdit = {addOrEdit}
                />
            </Popup>
            <Notification
                notify = {notify}
                setNotify = {setNotify}
                />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog ={setConfirmDialog}
                />
        </React.Fragment>

    );
}
