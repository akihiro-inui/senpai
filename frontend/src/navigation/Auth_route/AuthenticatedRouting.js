import React from 'react';
import { Switch, Route } from "react-router-dom"
import TestPage from "../../pages/TestPage"
import MyPage from "../../pages/Mypage"
import FindMentorPage from "../../pages/FindMentor"
import PrivateRoute from "../../app/PrivateAuth"

const AuthenticatedRouting = () => {
  return (
    <Switch>
      <Route path="/">
          <TestPage />
      </Route>
      <Route path="/findmentor">
          <FindMentorPage />
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