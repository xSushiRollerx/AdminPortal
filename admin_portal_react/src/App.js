import './App.css';
import HeaderComponent from "./components/HeaderComponent";
// import FooterComponent from "./components/FooterComponent";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import UpdateRestaurant from "./components/UpdateRestaurant";
import RestaurantsComponents from "./components/RestaurantsComponents";
import CreateRestaurantComponent from "./components/CreateRestaurantComponent";
import ViewRestaurantComponent from "./components/ViewRestaurantComponent";
// import FoodComponents from "./components/FoodComponents";
import CreateFoodComponent from "./components/CreateFoodComponent";
import ViewFoodComponent from "./components/ViewFoodComponent";
// import DataTable from "./reactpagination/RestaurantDataTable.js";
import Login from "./components/AccountComponents/Login";
import UserInfo from "./components/AccountComponents/UserInfo";
import Account from "./components/AdminAccountManagement/Account"
import Restaurants from "./materialUi/src/pages/Employees/Restaurants";
import FoodMenuForm from "./materialUi/src/pages/Employees/FoodMenuForm"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 100,
    marginRight: 100,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

function App() {
    const classes = useStyles();
    return (
        <div>
            
            <Router>
                    <HeaderComponent/>
                    <div className={clsx(classes.content)}>
                    <div className={classes.drawerHeader} />
                        <Switch>
                            <Route path = "/login" exact component = {Login}></Route>
                            <Route path = "/profile" exact component = {UserInfo}></Route>
                            <Route path = "/" exact component = {Restaurants}></Route>
                            <Route path = "/food" exact component = {FoodMenuForm}></Route>
                            {/*<Route path = "/" exact component = {DataTable}></Route>*/}
                            {/*<Route path = "/" exact component = {RestaurantsComponents}></Route>*/}
                            <Route path = "/restaurant" component = {RestaurantsComponents}></Route>
                            {/*Step 1 To Use one Component for Add and Update*/}
                            <Route path = "/add-restaurant/:id" component = {CreateRestaurantComponent}></Route>
                            <Route path = "/view-restaurant/:id" component = {ViewRestaurantComponent}></Route>
                            {/*<Route path = "/update-restaurant/:id" component = {UpdateRestaurant}></Route>*/}
                            {/*<Route path = "/" exact component = {FoodComponents}></Route>*/}
                            {/*<Route path = "/food" component = {FoodComponents}></Route>*/}
                            <Route path = "/add-food/:id" component = {CreateFoodComponent}></Route>
                            <Route path = "/view-food/:id" component = {ViewFoodComponent}></Route>
                            <Route path = "/account" component = {Account}></Route>
                        </Switch>
                    </div>
            </Router>
            {/*<FooterComponent/>*/}
        </div>


    );
}

export default App;
