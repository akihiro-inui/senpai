import React from "react"
import { Redirect, Route } from 'react-router-dom';

const UnAuthRoute = (props) => {
        // Get locally stored jwt token
    const jwt_token = localStorage.getItem('jwt_token')
    const isAuthenticated = jwt_token != null // Check if user has jwt token (Logged in already)
    if (isAuthenticated) {
        console.log(`User already logged in. Can not access to ${props.path}`)
        return <Redirect to="/" />
    } else {
        return <Route {...props} />
    }
}


export default UnAuthRoute