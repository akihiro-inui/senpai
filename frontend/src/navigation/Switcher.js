import React from "react"
import { Switch, Route } from "react-router-dom"
import TestPage from "../pages/TestPage"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"

const Switcher = () => (
    <Switch>
        <Route path="/features">
            <TestPage />
        </Route>
        <Route path="/products">
            <TestPage />
        </Route>
        <Route path="/customers">
            <TestPage />
        </Route>
        <Route path="/sales">
            <TestPage />
        </Route>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/signup">
            <SignUp />
        </Route>
        <Route path="/">
            <TestPage />
        </Route>
    </Switch>)

export default Switcher