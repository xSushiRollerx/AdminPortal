
import React, {Component} from 'react';
import NavigationDrawer from '../components/Navigation/NavigationDrawer'

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
                </header>
                <NavigationDrawer/>
                {/* <Navbar>
                    <Nav.Link href="accounts">Manage Accounts</Nav.Link>
                    <Nav.Link href="restaurant">Restaurants</Nav.Link>
                    <Nav.Link href="food">Menu</Nav.Link>
                </Navbar> */}
            </div>
        );
    }
}

export default HeaderComponent;