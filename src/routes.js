import React from 'react';
//import { BrowserRouter, Route, Redirect, Switch } from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Welcome from "./components/Welcome/Welcome";
import Home from "./components/Home/Home";
import Traductions from "./components/Traductions/Traductions";
import FormTraduction from "./components/FormTraduction/FormTraduction";
import Login from './components/Login/Login';
import Signup from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFound";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/home" 
            render={(props) => <Traductions {...props} />} 
            />
            <Route path="/traductionForm" component={FormTraduction} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;