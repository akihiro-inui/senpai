import React from "react"
import { Switch, Route } from "react-router-dom"
import Home, {
    FindMentorPage,
    ProductsPage,
    CustomersPage,
    SalesPage,
    LoginPage,
    SignUpPage,
    MyPage
} from "../../../pages"

import PrivateRoute from "../../../app/PrivateAuth"
import UnAuthRoute from "../../../app/UnAuth"

const Switcher = () => (
    <Switch>
        <Route path="/findmentor">
            <FindMentorPage />
        </Route>
        <Route path="/products">
            <ProductsPage />
        </Route>
        <Route path="/customers">
            <CustomersPage />
        </Route>
        <Route path="/sales">
            <SalesPage />
        </Route>
        <UnAuthRoute path="/login">
            <LoginPage />
        </UnAuthRoute>
        <UnAuthRoute path="/signup">
            <SignUpPage />
        </UnAuthRoute>
        <PrivateRoute path="/mypage">
            <MyPage />
        </PrivateRoute>
        <Route path="/">
            <Home />
        </Route>
    </Switch>)

export default Switcher