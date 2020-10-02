import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Logon} exact></Route> 
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
            </Switch>
        </BrowserRouter>
    );
}
