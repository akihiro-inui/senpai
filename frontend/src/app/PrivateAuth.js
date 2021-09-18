import React from "react"
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

const PrivateRoute = () => {
    const jwt_token = localStorage.getItem('jwt_tiken')
    const isAuthenticated = jwt_token != null // Check if user has jwt token (Logged in already)
    if (isAuthenticated) {
      return <Route {...props}/>
    }else{
      console.log(`ログインしていないユーザーは${props.path}へはアクセスできません`)
      return <Redirect to="/login"/>
    }
  }


export default PrivateRoute