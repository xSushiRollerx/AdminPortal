import logo from './logo.svg';
import './App.css';
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UpdateRestaurant from "./components/UpdateRestaurant";
import RestaurantsComponents from "./components/RestaurantsComponents";
import CreateRestaurantComponent from "./components/CreateRestaurantComponent";
import ViewRestaurantComponent from "./components/ViewRestaurantComponent";
import FoodComponents from "./components/FoodComponents";
import CreateFoodComponent from "./components/CreateFoodComponent";
import ViewFoodComponent from "./components/ViewFoodComponent";
import DataTable from "./reactpagination/RestaurantDataTable.js";
import Login from "./components/AccountComponents/Login";
import UserInfo from "./components/AccountComponents/UserInfo";
import UpdateAccount from "./components/AccountComponents/UpdateAccount";
import Account from "./components/AccountComponents/Account"
import Restaurants from "./materialUi/src/pages/Employees/Restaurants";
import FoodMenuForm from "./materialUi/src/pages/Employees/FoodMenuForm"

function App() {
    return (
        <div>
            
            <Router>
                    <HeaderComponent/>
                    <div className="container">
                        <Switch>
                            <Route path = "/login" exact component = {Login}></Route>
                            <Route path = "/profile" exact component = {UserInfo}></Route>
                            <Route path = "/update" exact component = {UpdateAccount}></Route>

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
