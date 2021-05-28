import { Button } from 'bootstrap'
import React, { Component } from 'react'

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            user_loaded: false,
        }
    }
    render() {
        function submit(){
            
        }
        return (
            <div>
                <h1>Account Management</h1>
                <h2>Type email or username of account you would like to look up</h2>
                <form>
                    <input
                    type='text'
                    id='userid'
                    placeholder='username'
                    />
                    <button className="btn btn-success" 
                    onClick={submit}>
                        Submit
                    </button>
                </form>
                {this.state.user_loaded?(
                <div>
                <h2>Username: </h2>
                <p1 id='username'>{this.state.user.username}</p1>
                <h2>First Name:</h2>
                <p1 id='firstName'>{this.state.user.firstName}</p1>
                <h2>Last Name:</h2>
                <p1 id='lastName'>{this.state.user.lastName}</p1>
                <h2>Email:</h2>
                <p1 id='email'>{this.state.user.email}</p1>
                <h2>Phone:</h2>
                <p1 id='phone'>{this.state.user.phone}</p1>
                <div>
                    <button onClick={()=>{this.props.history.push('update');}}>Update your Account</button>
                </div>
                <div>
                    <a href="update_role">Update user role</a>
                    <a href="update_role">Update user fields</a>
                </div>
                </div>
                ):null}
            </div>
        )
    }
}
