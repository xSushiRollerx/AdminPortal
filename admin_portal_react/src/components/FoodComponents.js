import React, {Component} from 'react';
import RestaurantService from "../services/RestaurantService";
import FoodService from "../services/FoodService";

class FoodComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foods: []
        }
        this.addFood = this.addFood.bind(this);
        this.editFood = this.editFood.bind(this);
        this.deleteFood = this.deleteFood.bind(this);
    }

    deleteFood(id) {
        FoodService.deleteFood(id).then(res => {
            this.setState({foods: this.state.foods.filter(food => food.id !== id)});
        });
    }

    viewRestaurant(id){
        this.props.history.push(`/view-food/${id}`);
    }

    editFood(id) {
        this.props.history.push(`/add-food/${id}`);
    }

    componentDidMount() {
        FoodService.getFood().then((res) => {
            this.setState({foods: res.data});
        });
    }

    addFood() {
        this.props.history.push('/add-food/add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Food List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addFood}>Add Food</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Restaurant ID</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Image</th>
                            <th>Summary</th>
                            <th>Special</th>
                            <th>Is Active</th>
                            <th>Category</th>
                            <th>Restaurant Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.foods.map(
                                food =>
                                    <tr key= {food.id}>
                                        <td> {food.id}</td>
                                        <td> {food.restaurantID}</td>
                                        <td> {food.name}</td>
                                        <td> {food.cost}</td>
                                        <td> {food.image}</td>
                                        <td> {food.summary}</td>
                                        <td> {food.special}</td>
                                        <td> {food.isActive}</td>
                                        <td> {food.category}</td>
                                        <td>
                                            <button onClick={() => this.editFood(food.id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button style={{margin: "5px"}}
                                                    onClick={() => this.deleteFood(food.id)}
                                                    className="btn btn-danger"> Delete
                                            </button>
                                            <button style={{margin: "5px"}}
                                                    onClick={() => this.viewRestaurant(food.id)}
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

export default FoodComponents;
