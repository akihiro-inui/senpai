import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import FindMentorPage from '../../../../pages/FindMentor'
import Products from "../../../../pages/Products";
import Customers from "../../../../pages/Customers";
import Sales from "../../../../pages/Sales";
import PrivateRoute from "../../../../app/PrivateAuth";

const NotAuthenticatedRouting = () => {
  return (
    <Switch>
      <PrivateRoute path="/findmentor">
          <FindMentorPage />
      </PrivateRoute>
      <Route path="/products">
          <Products />
      </Route>
      <Route path="/customers">
          <Customers />
      </Route>
      <Route path="/sales">
          <Sales />
      </Route>
      
      <Route path='*'
        render={() => (
              <Redirect to="/login" />
              )}
      />

    </Switch>
  );
};

export default NotAuthenticatedRouting