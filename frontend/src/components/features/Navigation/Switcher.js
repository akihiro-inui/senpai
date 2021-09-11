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
        <Route path="/login">
            <LoginPage />
        </Route>
        <Route path="/signup">
            <SignUpPage />
        </Route>
        <Route path="/mypage">
            <MyPage />
        </Route>
        <Route path="/">
            <Home />
        </Route>
    </Switch>)

export default Switcher