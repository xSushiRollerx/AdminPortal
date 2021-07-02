import HeaderComponent from './components/Navigation/HeaderComponent';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import clsx from 'clsx';
import './App.css';
import RestaurantSearch from './pages/RestaurantSearch';
import RestaurantProfile from './pages/RestaurantProfile';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 100,
        marginRight: 100,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

function App() {
    const classes = useStyles();
    return (
        <div>
            
            <Router>
                <div className="container">
                    <div className={clsx(classes.content)}>
                        <div className={classes.drawerHeader} />
                        <HeaderComponent />
                        <Switch>
                            <Route path="/restaurants" exact component={RestaurantSearch}></Route>
                            <Route path="/restaurant/:id" exact component={RestaurantProfile}></Route>
                        </Switch>
                        </div>
                    </div>
            </Router>
        </div>


    );
}

export default App;
