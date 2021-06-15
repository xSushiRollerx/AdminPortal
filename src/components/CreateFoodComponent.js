import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FoodService from "../services/FoodService";

class CreateFoodComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //Step2 To Use one Component for Add and Update
            id: this.props.match.params.id,
            restaurantID: '',
            name: '',
            cost: '',
            image: '',
            summary: '',
            special: '',
            isActive: '',
            category: ''

        }
        this.changeRestaurantIDHandler = this.changeRestaurantIDHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCostHandler = this.changeCostHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.changeSummaryHandler = this.changeSummaryHandler.bind(this);
        this.changeSpecialHandler = this.changeSpecialHandler.bind(this);
        this.changeIsActiveHandler = this.changeIsActiveHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);

        this.saveOrUpdateFood = this.saveOrUpdateFood.bind(this);
    }

    //Step 3 To Use one Component for Add and Update
    componentDidMount() {

        //Step 4 To Use one Component for Add and Update
        //if id is negative, its a request to Add a new Restaurant
        if (this.state.id === 'add') {
            return
        } else {
            FoodService.getFoodById(this.state.id).then((res) => {
                let food = res.data;
                this.setState({
                    restaurantID: food.restaurantID,
                    name: food.name,
                    cost: food.cost,
                    image: food.image,
                    summary: food.summary,
                    special: food.special,
                    isActive: food.isActive,
                    category: food.category
                });
            });
        }
    }

    saveOrUpdateFood = (e) => {
        e.preventDefault();
        let food = {
            restaurantID: this.state.restaurantID,
            name: this.state.name,
            cost: this.state.cost,
            image: this.state.image,
            summary: this.state.summary,
            special: this.state.special,
            isActive: this.state.isActive,
            category: this.state.category
        };
        console.log('food => ' + JSON.stringify(food));

        //Step 5 To Use one Component for Add and Update
        if (this.state.id === 'add') {
            FoodService.createFood(food).then(res => {
                this.props.history.push('/food');
            });
        } else {
            FoodService.updateFood(food, this.state.id).then(res => {
                this.props.history.push('/food');
            });
        }


    }

    changeRestaurantIDHandler = (event) => {
        this.setState({restaurantID: event.target.value});
    }
    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }
    changeCostHandler = (event) => {
        this.setState({cost: event.target.value});
    }
    changeImageHandler = (event) => {
        this.setState({image: event.target.value});
    }
    changeSummaryHandler = (event) => {
        this.setState({summary: event.target.value});
    }
    changeSpecialHandler = (event) => {
        this.setState({special: event.target.value});
    }
    changeIsActiveHandler = (event) => {
        this.setState({isActive: event.target.value});
    }
    changeCategoryHandler = (event) => {
        this.setState({category: event.target.value});
    }


    cancel() {
        this.props.history.push('/food');
    }

    getTitle() {
        if (this.state.id === 'add') {
            return <h3 className="text-center">Add Food</h3>
        } else {
            return <h3 className="text-center">Update Food</h3>
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
                                        <label>Restaurant ID:</label>
                                        <input placeholder="Restaurant ID" name="restaurantID"
                                               className="form-control"
                                               value={this.state.restaurantID}
                                               onChange={this.changeRestaurantIDHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Food Name:</label>
                                        <input placeholder="Food Name" name="name" className="form-control"
                                               value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Cost:</label>
                                        <input placeholder="Cost" name="cost" className="form-control"
                                               value={this.state.cost} onChange={this.changeCostHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Image:</label>
                                        <input placeholder="Image" name="image"
                                               className="form-control"
                                               value={this.state.image}
                                               onChange={this.changeImageHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Summary:</label>
                                        <input placeholder="Summary" name="summary"
                                               className="form-control"
                                               value={this.state.summary}
                                               onChange={this.changeSummaryHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Special:</label>
                                        <input placeholder="Special" name="special" className="form-control"
                                               value={this.state.special} onChange={this.changeSpecialHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Is Active:</label>
                                        <input placeholder="Is Active" name="isActive" className="form-control"
                                               value={this.state.isActive} onChange={this.changeIsActiveHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Category:</label>
                                        <input placeholder="Category" name="category" className="form-control"
                                               value={this.state.category} onChange={this.changeCategoryHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateFood}>Save
                                    </button>
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

CreateFoodComponent.propTypes = {};

export default CreateFoodComponent;
