import React from "react"
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
    // Get locally stored jwt token
    const jwt_token = localStorage.getItem('jwt_token')
    const isAuthenticated = jwt_token != null // Check if user has jwt token (Logged in already)
    if (isAuthenticated) {
      return <Route {...props}/>
    }else{
      console.log(`User has not logged in. Can not access to ${props.path}`)
      return <Redirect to="/login"/>
    }
  }


export default PrivateRoute