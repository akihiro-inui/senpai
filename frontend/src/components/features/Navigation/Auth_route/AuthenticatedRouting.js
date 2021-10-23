import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom"
// import TestPage from "../../pages/TestPage"
import MyPage from "../../../../pages/Mypage"
import FindMentorPage from "../../../../pages/FindMentor"
import PrivateRoute from "../../../../app/PrivateAuth"
import Products from '../../../../pages/Products';
import Customers from '../../../../pages/Customers';
import Sales from '../../../../pages/Sales';
import Home from '../../../../pages/Home';

const AuthenticatedRouting = () => {
  return (
    <Switch>
      <Route path="/findmentor">
          <FindMentorPage />
      </Route>
      <Route path="/products">
          <Products />
      </Route>
      <Route path="/customers">
          <Customers />
      </Route>
      <Route path="/sales">
          <Sales />
      </Route>

      <PrivateRoute path="/mypage">
          <MyPage />
      </PrivateRoute>
      
      <Route path='*'
        render={() => (
          <Redirect to="/" />
        )}
      />
    </Switch>
  );
};

export default AuthenticatedRouting