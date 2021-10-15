import React from "react";
import { Switch, Route } from "react-router-dom"
import Login from "../../pages/Login"
import SignUp from "../../pages/SignUp"
import UnAuthRoute from "../../app/UnAuth"

const NotAuthenticatedRouting = () => {
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
      
      <Route path="/login">
          <Login />
      </Route>
      <UnAuthRoute path="/signup">
          <SignUp />
      </UnAuthRoute>
      <Route path='*'
        render={() => (
          <Redirect to="/login" />
        )}
      />
    </Switch>
  );
};

export default NotAuthenticatedRouting