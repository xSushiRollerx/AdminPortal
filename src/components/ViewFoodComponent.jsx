import React, {Component} from 'react';
import FoodService from "../services/FoodService";

class ViewFoodComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            food: {}
        }
    }

    componentDidMount() {
        FoodService.getFoodById(this.state.id).then(res => {
            this.setState({food: res.data});
        })
    }

    render() {
        return (
            <div>
               <div className="card col-md-6 offset-md-3">
                   <h3 className="text-center">View Food Details</h3>
                   <div className="card-body">
                       <div className="row">
                           <label>  ID: </label>
                           <div> { this.state.food.id }</div>
                       </div>
                       <div className="row">
                           <label>  Restaurant ID: </label>
                           <div> { this.state.food.restaurantID }</div>
                       </div>
                       <div className="row">
                           <label>  Name: </label>
                           <div> { this.state.food.name }</div>
                       </div>
                       <div className="row">
                           <label>  Cost: </label>
                           <div> { this.state.food.cost }</div>
                       </div>
                       <div className="row">
                           <label>  Image: </label>
                           <div> { this.state.food.image }</div>
                       </div>
                       <div className="row">
                           <label>  Price Category: </label>
                           <div> { this.state.food.summary }</div>
                       </div>
                       <div className="row">
                           <label>  Special: </label>
                           <div> { this.state.food.special }</div>
                       </div>
                       <div className="row">
                           <label>  Is Active : </label>
                           <div> { this.state.food.isActive }</div>
                       </div>
                       <div className="row">
                           <label>  Category : </label>
                           <div> { this.state.food.category }</div>
                       </div>
                   </div>

               </div>
            </div>
        );
    }
}

export default ViewFoodComponent;
