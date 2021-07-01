import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantSearch from './pages/RestaurantSearch'

function App() {
    return (
        <div>
            
            <Router>
                    <div className="container">
                        <Switch>
                        <Route path="/restaurants" exact component={RestaurantSearch}></Route>
                        </Switch>
                    </div>
            </Router>
        </div>


    );
}

export default App;
