import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RestaurantService from "../services/RestaurantService";

class CreateRestaurantComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //Step2 To Use one Component for Add and Update
            id: this.props.match.params.id,
            name: '',
            priceCategory: '',
            averageRating: '',
            tags: '',
            isActive: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: ''

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAverageRatingHandler = this.changeAverageRatingHandler.bind(this);
        this.changeTagsHandler = this.changeTagsHandler.bind(this);
        this.changeIsActiveHandler = this.changeIsActiveHandler.bind(this);
        this.changePriceCategoryHandler = this.changePriceCategoryHandler.bind(this);
        this.changeStreetAddressHandler = this.changeStreetAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeZipCodeHandler = this.changeZipCodeHandler.bind(this);

        this.saveOrUpdateRestaurant = this.saveOrUpdateRestaurant.bind(this);
    }

    //Step 3 To Use one Component for Add and Update
    componentDidMount() {

        //Step 4 To Use one Component for Add and Update
        //if id is negative, its a request to Add a new Restaurant
        if (this.state.id === 'add') {
            return
        } else {
            RestaurantService.getRestaurantById(this.state.id).then((res) => {
                let restaurant = res.data;
                this.setState({
                    name: restaurant.name,
                    averageRating: restaurant.averageRating,
                    tags: restaurant.tags,
                    isActive: restaurant.isActive,
                    priceCategory: restaurant.priceCategory,
                    streetAddress: restaurant.streetAddress,
                    city: restaurant.city,
                    state: restaurant.state,
                    zipCode: restaurant.zipCode
                });
            });
        }
    }

    saveOrUpdateRestaurant = (e) => {
        e.preventDefault();
        let restaurant = {
            name: this.state.name,
            averageRating: this.state.averageRating,
            tags: this.state.tags,
            isActive: this.state.isActive,
            priceCategory: this.state.priceCategory,
            streetAddress: this.state.streetAddress,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode
        };
        console.log('restaurant => ' + JSON.stringify(restaurant));

        //Step 5 To Use one Component for Add and Update
        if (this.state.id === 'add') {
            RestaurantService.createRestaurant(restaurant).then(res => {
                this.props.history.push('/');
            });
        } else {
            RestaurantService.updateRestaurant(restaurant, this.state.id).then(res => {
                this.props.history.push('/');
            });
        }


    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }
    changeAverageRatingHandler = (event) => {
        this.setState({averageRating: event.target.value});
    }
    changeTagsHandler = (event) => {
        this.setState({tags: event.target.value});
    }
    changeIsActiveHandler = (event) => {
        this.setState({isActive: event.target.value});
    }
    changePriceCategoryHandler = (event) => {
        this.setState({priceCategory: event.target.value});
    }
    changeStreetAddressHandler = (event) => {
        this.setState({streetAddress: event.target.value});
    }
    changeCityHandler = (event) => {
        this.setState({city: event.target.value});
    }
    changeStateHandler = (event) => {
        this.setState({state: event.target.value});
    }
    changeZipCodeHandler = (event) => {
        this.setState({zipCode: event.target.value});
    }


    cancel() {
        this.props.history.push('/');
    }

    getTitle() {
        if (this.state.id === 'add') {
            return <h3 className="text-center">Add Restaurant</h3>
        } else {
            return <h3 className="text-center">Update Restaurant</h3>
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Restaurant Name:</label>
                                        <input placeholder="Restaurant Name" name="name" className="form-control"
                                               value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Average Rating:</label>
                                        <input placeholder="Average Rating" name="averageRating"
                                               className="form-control"
                                               value={this.state.averageRating}
                                               onChange={this.changeAverageRatingHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Tags:</label>
                                        <input placeholder="Tags" name="tags" className="form-control"
                                               value={this.state.tags} onChange={this.changeTagsHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Is Active:</label>
                                        <input placeholder="Is Active" name="isActive" className="form-control"
                                               value={this.state.isActive} onChange={this.changeIsActiveHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Price Category:</label>
                                        <input placeholder="Price Category" name="priceCategory"
                                               className="form-control"
                                               value={this.state.priceCategory}
                                               onChange={this.changePriceCategoryHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Street Address:</label>
                                        <input placeholder="Street Address" name="streetAddress"
                                               className="form-control"
                                               value={this.state.streetAddress}
                                               onChange={this.changeStreetAddressHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>City:</label>
                                        <input placeholder="City" name="city" className="form-control"
                                               value={this.state.city} onChange={this.changeCityHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>State:</label>
                                        <input placeholder="State" name="state" className="form-control"
                                               value={this.state.state} onChange={this.changeStateHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Zip Code:</label>
                                        <input placeholder="Zip Code" name="zipCode" className="form-control"
                                               value={this.state.zipCode} onChange={this.changeZipCodeHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateRestaurant}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Cancel
                                    </button>


                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }

}

CreateRestaurantComponent.propTypes = {};

export default CreateRestaurantComponent;
