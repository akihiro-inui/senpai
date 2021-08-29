import React from "react"
import { Switch, Route, AuthRoute} from "react-router-dom"
import TestPage from "../pages/TestPage"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import MyPage from "../pages/Mypage"
import FindSenpaiPage from "../pages/FindSenpai"

const Switcher = () => (
    <Switch>
        <Route path="/findsenpai">
            <FindSenpaiPage />
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
        <AuthRoute path="/mypage">
            <MyPage />
        </AuthRoute>
    </Switch>)

export default Switcher