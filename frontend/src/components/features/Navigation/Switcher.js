import React from "react"
import { Switch, Route } from "react-router-dom"
import Home, {
    FeaturesPage,
    ProductsPage,
    CustomersPage,
    SalesPage,
    LoginPage,
    SignUpPage
} from "../../../pages"

const Switcher = () => (
    <Switch>
        <Route path="/features">
            <FeaturesPage />
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
        <Route path="/">
            <Home />
        </Route>
    </Switch>)

export default Switcher