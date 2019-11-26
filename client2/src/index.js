import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
}
    from 'react-router-dom'

import './css/index.css';
import App from './App';
import Dashboard from './components/Dashboard/Dashboard'
import SignUp from './components/signup'
import ProductsTab from './components/Dashboard/ProductsTab'
import UsersTab from './components/Dashboard/UsersTab'

function Routing() {

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <App />
                    </Route>
                    <Route path="/home">
                        <Dashboard />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/products">
                        <ProductsTab />
                    </Route>
                    <Route path="/users">
                        <UsersTab />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


ReactDOM.render(<Routing />, document.getElementById('root'));
