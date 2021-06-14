import React, { Component } from 'react'
import UserService from '../../services/UserService'

export default class UpdateAccountRole extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectValue: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e){
        this.setState({selectValue: e.target.value});
    }
    submit = (e) => {
        e.preventDefault();
        let username = this.props.name;
        if(this.state.selectValue===0){
            return;
        }
        UserService.updateUserRole(username,this.state.selectValue).catch((error)=>{
            console.log(error);
        });;
    };
    render() {
        return (
            <div>
                <h2>Update Account Role</h2>
                <h3>{this.props.name}</h3>
                <form>
                    <select 
                        value={this.state.selectValue} 
                        onChange={this.handleChange}>
                        <option value="0">Select Desired User Role</option>
                        <option value="2">Customer</option>
                        <option value="3">Driver</option>
                        <option value="4">Owner</option>
                    </select>
                    <button className="btn btn-success" 
                    onClick={this.submit}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
