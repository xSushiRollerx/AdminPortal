import React, {Component} from 'react';
import RestaurantService from "../services/RestaurantService";

class ViewRestaurantComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            restaurant: {}
        }
    }

    componentDidMount() {
        RestaurantService.getRestaurantById(this.state.id).then(res => {
            this.setState({restaurant: res.data});
        })
    }

    render() {
        return (
            <div>
               <div className="card col-md-6 offset-md-3">
                   <h3 className="text-center">View Restaurant Details</h3>
                   <div className="card-body">
                       <div className="row">
                           <label>  ID: </label>
                           <div> { this.state.restaurant.id }</div>
                       </div>
                       <div className="row">
                           <label>  Name: </label>
                           <div> { this.state.restaurant.name }</div>
                       </div>
                       <div className="row">
                           <label>  Average Rating: </label>
                           <div> { this.state.restaurant.averageRating }</div>
                       </div>
                       <div className="row">
                           <label>  Tags: </label>
                           <div> { this.state.restaurant.tags }</div>
                       </div>
                       <div className="row">
                           <label>  Is Active: </label>
                           <div> { this.state.restaurant.isActive }</div>
                       </div>
                       <div className="row">
                           <label>  Price Category: </label>
                           <div> { this.state.restaurant.priceCategory }</div>
                       </div>
                       <div className="row">
                           <label>  Street Address: </label>
                           <div> { this.state.restaurant.streetAddress }</div>
                       </div>
                       <div className="row">
                           <label>  City : </label>
                           <div> { this.state.restaurant.city }</div>
                       </div>
                       <div className="row">
                           <label>  State : </label>
                           <div> { this.state.restaurant.state }</div>
                       </div>
                       <div className="row">
                           <label>  Zip Code : </label>
                           <div> { this.state.restaurant.zipCode }</div>
                       </div>
                   </div>

               </div>
            </div>
        );
    }
}

export default ViewRestaurantComponent;
