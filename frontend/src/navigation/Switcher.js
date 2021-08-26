import React from "react"
import { Switch, Route } from "react-router-dom"
import TestPage from "../pages/TestPage"

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
            <TestPage />
        </Route>
        <Route path="/">
            <TestPage />
        </Route>
    </Switch>)

export default Switcher