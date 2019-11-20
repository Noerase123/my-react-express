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

function Routing() {
    return (
        <Router>
            <div>

                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
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
                </Switch>
            </div>
        </Router>
    );
}


ReactDOM.render(<Routing />, document.getElementById('root'));
