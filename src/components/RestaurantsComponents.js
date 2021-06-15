import React, {Component} from 'react';
import RestaurantService from "../services/RestaurantService";

class RestaurantsComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: []
        }
        this.addRestaurant = this.addRestaurant.bind(this);
        this.editRestaurant = this.editRestaurant.bind(this);
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
    }

    deleteRestaurant(id) {
        RestaurantService.deleteRestaurant(id).then(res => {
            this.setState({restaurants: this.state.restaurants.filter(restaurant => restaurant.id !== id)});
        });
    }

    viewRestaurant(id){
        this.props.history.push(`/view-restaurant/${id}`);
    }

    editRestaurant(id) {
        this.props.history.push(`/add-restaurant/${id}`);
    }

    componentDidMount() {
        RestaurantService.getRestaurant().then((res) => {
            this.setState({restaurants: res.data});
        });
    }

    addRestaurant() {
        this.props.history.push('/add-restaurant/add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Restaurant List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addRestaurant}>Add Restaurant</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Average Rating</th>
                            <th>Tags</th>
                            <th>Is Active</th>
                            <th>Price Category</th>
                            <th>Street Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Restaurant Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.restaurants.map(
                                restaurant =>
                                    <tr key= {restaurant.id}>
                                        <td> {restaurant.id}</td>
                                        <td> {restaurant.name}</td>
                                        <td> {restaurant.averageRating}</td>
                                        <td> {restaurant.tags}</td>
                                        <td> {restaurant.isActive}</td>
                                        <td> {restaurant.priceCategory}</td>
                                        <td> {restaurant.streetAddress}</td>
                                        <td> {restaurant.city}</td>
                                        <td> {restaurant.state}</td>
                                        <td> {restaurant.zipCode}</td>
                                        <td>
                                            <button onClick={() => this.editRestaurant(restaurant.id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button style={{margin: "5px"}}
                                                    onClick={() => this.deleteRestaurant(restaurant.id)}
                                                    className="btn btn-danger"> Delete
                                            </button>
                                            <button style={{margin: "5px"}}
                                                    onClick={() => this.viewRestaurant(restaurant.id)}
                                                    className="btn btn-info"> View
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default RestaurantsComponents;
