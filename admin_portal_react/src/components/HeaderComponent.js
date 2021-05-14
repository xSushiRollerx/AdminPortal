
import React, {Component} from 'react';
import { DropdownButton, Nav, Navbar } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state= {
        }
    }

    render() {
        return (
            <div>
                <header>
                    <title>Admin Portal Application</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href ="/" className="navbar-brand">Admin Portal App</a> </div>
                    </nav>
                </header>
                <Navbar>
                    <Nav.Link href="accounts">Manage Accounts</Nav.Link>
                    <Nav.Link href="restaurant">Restaurants</Nav.Link>
                    <Nav.Link href="food">Menu</Nav.Link>
                </Navbar>
                <DropdownButton title="Account">
                    <DropdownItem href="/profile" >Profile</DropdownItem>
                    <DropdownItem href="/login" >Log In</DropdownItem>
                    <DropdownItem onClick={this.logout} >Log Out</DropdownItem>
                </DropdownButton>
            </div>
        );
    }
}

export default HeaderComponent;